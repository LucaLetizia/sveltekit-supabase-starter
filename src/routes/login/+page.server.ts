import { AuthApiError, type Session } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import { checkForProvider } from '$lib/server/auth';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password is required' }).trim(),
});

export const load = (async ({ locals }) => {
  const session: Session | null = await locals.getSession();
  if (session) {
    throw redirect(303, '/');
  }
  const form = await superValidate(zod(loginSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  login: async ({ request, locals, url }) => {
    const formData = Object.fromEntries(await request.formData());
    const form = await superValidate(formData, zod(loginSchema));

    const res = await checkForProvider(url, locals.supabase);
    if (res?.authError) {
      return message(form, res?.authError, { status: 400 });
    }

    if (!form?.valid) {
      return { form };
    }

    const { data: loginData, error: err } =
      await locals.supabase.auth.signInWithPassword({
        email: formData?.email as string,
        password: formData?.password as string,
      });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return message(form, 'Invalid email or password', { status: 400 });
      }
      return message(form, 'Something went wrong. Please try again later', {
        status: 500,
      });
    }

    await locals.supabase
      .from('profiles')
      .update({ last_seen: new Date() })
      .eq('id', loginData?.user?.id);

    throw redirect(303, '/');
  },
} satisfies Actions;
