import { AuthApiError, type Session } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { ZodError, z } from 'zod';
import { redirect } from '@sveltejs/kit';
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
	return {};
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request, locals, url }) => {
		await checkForProvider(url, locals.supabase);
		const formData = Object.fromEntries(await request.formData());
		try {
			registerSchema.parse(formData);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password, repeatPassword, ...data } = formData;
				return {
					data,
					errors
				};
			}
		}

		const { data: signupData, error: err } = await locals.supabase.auth.signUp({
			email: formData?.email as string,
			password: formData?.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return {
					authError: 'Invalid email or password'
				};
			}
			return {
				authError: 'Something went wrong. Please try again later'
			};
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
			return {
				authError: 'Something went wrong. Please try again later'
			};
		}

		await locals.supabase
			.from('profiles')
			.update({ last_seen: new Date() })
			.eq('id', signupData?.user?.id);

		throw redirect(303, '/');
	}
} satisfies Actions;
