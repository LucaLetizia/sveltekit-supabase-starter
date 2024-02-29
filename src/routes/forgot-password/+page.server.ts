import type { Session } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const forgotPasswordSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email()
});

export const load = (async ({ locals }) => {
	const session: Session | null = await locals.getSession();
	if (session) {
		throw redirect(303, '/');
	}
	const form = await superValidate(zod(forgotPasswordSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const form = await superValidate(formData, zod(forgotPasswordSchema));
		if (!form?.valid) {
			return { form };
		}
		const { error } = await locals.supabase.auth.resetPasswordForEmail(
			(formData?.email as string) ?? '',
			{
				redirectTo: `http://${publicEnv.PUBLIC_APP_HOST}/${privateEnv.PRIVATE_AUTH_CALLBACK_REDIRECT_ROUTE}?next=/${publicEnv.PUBLIC_UPDATE_PASSWORD_ROUTE}`
			}
		);
		if (error) {
			return message(form, 'Something went wrong, please try again', {
				status: 400
			});
		}
		return message(form, 'Please check your inbox');
	}
} satisfies Actions;
