import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { Provider, Session, SupabaseClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

export const checkForProvider = async (
  url: URL,
  supabaseClient: SupabaseClient,
) => {
  const provider = url?.searchParams?.get('provider') as Provider;

  if (provider) {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `http://${publicEnv.PUBLIC_APP_HOST}/${privateEnv.PRIVATE_AUTH_CALLBACK_REDIRECT_ROUTE}`,
      },
    });

    if (error) {
      return {
        authError: 'Something went wrong, please try again later.',
      };
    }
    throw redirect(303, data?.url);
  }
};

export const logout = async (locals: App.Locals) => {
  const session: Session | null = await locals?.getSession();
  if (!session) throw redirect(303, '/');
  await locals.supabase
    .from('profiles')
    .update({ last_seen: new Date() })
    .eq('id', session?.user?.id);

  const { error: err } = await locals.supabase.auth.signOut();
  if (err) {
    throw error(500, 'Something went wrong logging you out.');
  }
  throw redirect(303, '/');
};
