import { type Session } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { ZodError, z } from 'zod';
import { redirect } from '@sveltejs/kit';

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
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			updatePasswordSchema.parse(formData);
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				return {
					errors
				};
			}
		}
		const { error } = await locals.supabase.auth.updateUser({
			password: formData?.password as string
		});

		if (error) {
			return {
				error: 'Something went wrong, please try again later'
			};
		}
		return {
			message: 'Password updated successfully'
		};
	}
} satisfies Actions;
