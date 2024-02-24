// See https://kit.svelte.dev/docs/types#app

import type { SupabaseClient } from '@supabase/supabase-js';
import 'unplugin-icons/types/svelte';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
		}
		interface LayoutData {
			supabase: SupabaseClient;
			session: import('@supabase/supabase-js').Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
