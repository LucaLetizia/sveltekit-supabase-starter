import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Session } from '@supabase/supabase-js';
import { logout } from '$lib/server/auth';

export const load = (async ({ locals }) => {
	const session: Session | null = await locals.getSession();
	if (!session) {
		throw redirect(303, '/');
	}
	await logout(locals);
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals }) => {
		await logout(locals);
	}
} satisfies Actions;
