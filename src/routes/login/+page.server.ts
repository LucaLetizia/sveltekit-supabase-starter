import { AuthApiError, type Session } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { ZodError, z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { checkForProvider } from '$lib/server/auth';

const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z.string({ required_error: 'Password is required' }).trim()
});

export const load = (async ({ locals }) => {
	const session: Session | null = await locals.getSession();
	if (session) {
		throw redirect(303, '/');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, locals, url }) => {
		const res = await checkForProvider(url, locals.supabase);
		if (res?.authError) return { authError: res?.authError };

		const formData = Object.fromEntries(await request.formData());
		try {
			loginSchema.parse(formData);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password, ...data } = formData;
				return {
					data,
					errors
				};
			}
		}

		const { data: loginData, error: err } =
			await locals.supabase.auth.signInWithPassword({
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

		await locals.supabase
			.from('profiles')
			.update({ last_seen: new Date() })
			.eq('id', loginData?.user?.id);

		throw redirect(303, '/');
	}
} satisfies Actions;
