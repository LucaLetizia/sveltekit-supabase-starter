import { type Session } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const updatePasswordSchema = z
	.object({
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
	if (!session) {
		throw redirect(303, '/');
	}
	const form = await superValidate(zod(updatePasswordSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const form = await superValidate(formData, zod(updatePasswordSchema));
		if (!form?.valid) {
			return { form };
		}

		const { error } = await locals.supabase.auth.updateUser({
			password: formData?.password as string
		});

		if (error) {
			return message(form, 'Something went wrong, please try again later', {
				status: 400
			});
		}

		return message(form, 'Password updated successfully');
	}
} satisfies Actions;
