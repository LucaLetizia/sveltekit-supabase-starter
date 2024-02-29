import { AuthApiError, type Session } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { checkForProvider } from '$lib/server/auth';

const registerSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(6, { message: 'Email must be at least 6 characters' })
			.max(100, { message: 'Email must be less than 100 characters' })
			.email(),
		username: z
			.string({ required_error: 'Username is required' })
			.min(1, { message: 'Username is required' })
			.max(64, { message: 'Username must be less than 64 characters' })
			.trim(),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(64, { message: 'Password must be less than 64 characters' })
			.trim(),
		repeatPassword: z
			.string({ required_error: 'Password repeat is required' })
			.trim()
	})
	.superRefine(({ repeatPassword, password }, ctx) => {
		if (repeatPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and repeat password must match',
				path: ['repeatPassword']
			});
		}
	});

export const load = (async ({ locals }) => {
	const session: Session | null = await locals.getSession();
	if (session) {
		throw redirect(303, '/');
	}
	const form = await superValidate(zod(registerSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request, locals, url }) => {
		const formData = Object.fromEntries(await request.formData());
		const form = await superValidate(formData, zod(registerSchema));
		const res = await checkForProvider(url, locals.supabase);

		if (res?.authError) {
			return message(form, res?.authError, { status: 400 });
		}
		if (!form.valid) {
			console.log('INVALID');
			return { form };
		}

		const { data: signupData, error: err } = await locals.supabase.auth.signUp({
			email: formData?.email as string,
			password: formData?.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, 'Invalid email or password', { status: 400 });
			}

			return message(form, 'Something went wrong. Please try again later', {
				status: 500
			});
		}

		const { error: profileError } = await locals.supabase
			.from('profiles')
			.insert({
				id: signupData?.user?.id,
				username: formData?.username,
				created_at: signupData?.user?.created_at,
				updated_at: signupData?.user?.updated_at
			});

		if (profileError) {
			return message(form, 'Something went wrong. Please try again later', {
				status: 500
			});
		}

		await locals.supabase
			.from('profiles')
			.update({ last_seen: new Date() })
			.eq('id', signupData?.user?.id);

		throw redirect(303, '/');
	}
} satisfies Actions;
