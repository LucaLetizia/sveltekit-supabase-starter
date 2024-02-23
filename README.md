# Sveltekit Auth Starter Project with Supabase Backend

SvelteKit Supabase starter project using the new [@supabase/ssr](https://www.npmjs.com/package/@supabase/ssr) package.

## Features

- Register
- Login
- Social Login (GitHub)
- Logout
- Forgot / Update password

## Prerequisites

The project assumes the existence of a Supabase project that includes a table called "profiles" part of the public schema, with the following structure:

```sql
CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" uuid NOT NULL,
    "username" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "last_seen" timestamp with time zone
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
```

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Copy .env.example to .env
4. Update PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY with the values found in your Supabase Project Settings -> API
5. Run npm install to install dependencies.
6. Run npm run dev to start the development server.

## Stack

- [SvelteKit](https://github.com/sveltejs/kit)
- [Supabase](https://github.com/supabase/supabase)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte)
- [unplugin-icons](https://github.com/unplugin/unplugin-icons)
- [Zod](https://github.com/colinhacks/zod)
