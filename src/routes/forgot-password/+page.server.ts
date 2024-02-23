import type { Session } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

const forgotPasswordSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email()
});

export const load = (async ({ locals }) => {
	const session: Session | null = await locals.getSession();
	if (session) {
		throw redirect(303, '/');
	}
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			forgotPasswordSchema.parse(formData);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				const { ...data } = formData;
				return {
					data,
					errors
				};
			}
		}
		const { error } = await locals.supabase.auth.resetPasswordForEmail(
			(formData?.email as string) ?? '',
			{
				redirectTo: `http://${publicEnv.PUBLIC_APP_HOST}/${privateEnv.PRIVATE_AUTH_CALLBACK_REDIRECT_ROUTE}?next=/${publicEnv.PUBLIC_UPDATE_PASSWORD_ROUTE}`
			}
		);
		if (error) {
			return {
				error: 'Something went wrong, please try again'
			};
		}
		return {
			message: 'Please check your inbox'
		};
	}
} satisfies Actions;
