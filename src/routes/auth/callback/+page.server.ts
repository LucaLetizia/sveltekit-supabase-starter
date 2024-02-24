import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { AuthApiError, type Session } from '@supabase/supabase-js';

export const load = (async ({ locals, url }) => {
	const code = url?.searchParams?.get('code') ?? '';
	if (!code) throw redirect(303, '/');
	const next = url?.searchParams?.get('next') ?? '';
	const authResult: Record<string, Session> = {};
	try {
		const { data } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (data?.session) authResult['session'] = data?.session;
	} catch (sessionError) {
		if (sessionError instanceof AuthApiError && sessionError.status === 400) {
			error(403, {
				message: 'Something went wrong, please try again later.'
			});
		}
		error(403, {
			message: 'Something went wrong,  please try again later.'
		});
	}

	const { data: userRecord, error: userError } = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', authResult?.session?.user?.id);

	if (userError) {
		error(400, {
			message: 'Something went wrong, please try again later.'
		});
	}

	if (userRecord?.length === 0) {
		const { error: profileError } = await locals.supabase
			.from('profiles')
			.insert({
				id: authResult?.session?.user?.id,
				username: '',
				created_at: authResult?.session?.user?.created_at,
				updated_at: authResult?.session?.user?.updated_at,
				last_seen: new Date()
			});

		if (profileError) {
			error(400, {
				message: 'Something went wrong, please try again later.'
			});
		}
	} else {
		const { error: profileError } = await locals.supabase
			.from('profiles')
			.update({
				last_seen: new Date()
			})
			.eq('id', authResult?.session?.user?.id);

		if (profileError) {
			error(400, {
				message: 'Something went wrong, please try again later.'
			});
		}
	}
	if (next === `/${env.PUBLIC_UPDATE_PASSWORD_ROUTE}`)
		throw redirect(303, `/${env.PUBLIC_UPDATE_PASSWORD_ROUTE}`);
	throw redirect(303, '/');
}) satisfies PageServerLoad;
