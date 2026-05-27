# Pigskin.pro CMS

Supabase-backed CMS for `pigskin.pro`. Editors sign in with a magic link at
`/admin`, edit team narrative and projections through a form, and the public
pages (`/teams/[slug]`, `/divisions/[slug]`) read straight from Postgres.

## What's in here

```
supabase/
  config.toml
  migrations/
    20260526000000_initial_schema.sql   # all tables, enums, RLS, triggers
  seed/
    seed.sql                            # AFC East + AFC West placeholders
src/
  middleware.ts                         # auth gate for /admin
  types/database.ts                     # generated-style Supabase types
  lib/
    supabase-server.ts                  # server client + requireAdmin()
    supabase-browser.ts                 # browser client
  app/
    layout.tsx
    admin/
      admin.css
      layout.tsx                        # nav + sign-out
      page.tsx                          # dashboard
      login/page.tsx                    # magic-link form
      teams/
        page.tsx                        # team list
        [slug]/
          edit/
            page.tsx                    # server: loads team + draft rows
            EditForm.tsx                # client: optimistic save, debounced
            actions.ts                  # server actions
          history/page.tsx              # audit_log view per team
      _components/SignOutButton.tsx
    auth/callback/route.ts              # magic-link callback
    teams/[slug]/page.tsx               # PUBLIC team page
    divisions/[slug]/page.tsx           # PUBLIC division page
```

## Local setup

Prereqs: Node 20+, Docker (for Supabase local), [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started).

```bash
# 1. Install deps
npm install

# 2. Start local Supabase (Postgres + Auth + Studio on port 54323)
supabase start

# 3. Apply the migration + seed
supabase db reset           # runs migrations/, then seed/seed.sql

# 4. Copy local URL + anon key from `supabase status` into .env.local
cp .env.example .env.local
# edit with values from `supabase status`

# 5. Run the app
npm run dev
```

### Add yourself as an admin

The first time, the `admin_users` table is empty so nobody can write. Two
options:

**A. From Supabase Studio (`http://localhost:54323`):**

1. Go to Authentication → Users → "Add user" → invite by email. Use your real
   email; you'll get a confirmation link in the local mail catcher
   (`http://localhost:54324`).
2. After confirming, copy the user's UUID.
3. SQL editor: `insert into admin_users (user_id, email) values ('<uuid>', '<email>');`

**B. Via psql:**

```bash
supabase db connect
# inside psql:
insert into auth.users (id, email, email_confirmed_at, ...)
  -- easier: use the dashboard. Inserting raw auth.users requires a few
  -- additional fields and is fragile across Supabase versions.
```

Then visit `http://localhost:3000/admin/login`, request a magic link, and
you're in.

### Regenerating types after schema changes

```bash
npm run db:types        # writes src/types/database.ts
```

(The committed `database.ts` is a hand-written equivalent so the project type-
checks before you've run the CLI; overwrite it once you generate.)

## Deploy

### Supabase (cloud)

1. Create a new project at https://supabase.com.
2. From the project root: `supabase link --project-ref <ref>`.
3. Push the migration: `supabase db push`.
4. Apply the seed manually from the SQL editor (it's idempotent), or run
   `psql "$(supabase db remote get-uri)" -f supabase/seed/seed.sql`.
5. **Authentication → URL Configuration:**
   - Site URL: `https://pigskin.pro`
   - Redirect URLs: add `https://pigskin.pro/auth/callback`
6. **Authentication → Email templates → Magic Link:** customize as you like.
7. **Authentication → Providers → Email:** disable "Enable email signup"
   (we only want allowlisted admins).
8. Add your admin row in the SQL editor:
   ```sql
   insert into admin_users (user_id, email)
   values ('<your-auth-uid>', 'you@pigskin.pro');
   ```

### Vercel

1. Push this repo to GitHub.
2. Import in Vercel.
3. Set environment variables (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.
5. In Supabase dashboard, add the Vercel preview URLs as additional redirect
   URLs if you want magic links to work in previews.

## How the edit flow works

1. Editor visits `/admin/teams` → clicks Edit on a team.
2. Server loads the team + the latest snapshot/projection for the current
   season.
3. Client form binds to local state. Every field change marks the form dirty
   and schedules an autosave (1.2s debounce).
4. Save calls a Server Action that updates (or inserts) the snapshot and
   projection rows.
5. The DB trigger writes a row into `audit_log` with the field-level diff.
6. The form's "last saved" timestamp re-renders every 30 seconds.
7. Hitting **Publish** flips `status` to `published`. Public pages
   immediately see the new content (Next.js `revalidatePath` is called on
   the public route from the server action).

## Why this shape

- **Snapshots and projections are separate from teams.** Team identity (name,
  slug, division) rarely changes. Narrative and numbers change weekly.
  Keeping them in their own tables means you don't lose history when you
  re-grade a QB.
- **Audit log via trigger, not application code.** The trigger captures
  every UPDATE no matter where it came from — admin form, psql, Studio.
  Application-level audit logging silently drops anything that bypasses the
  app.
- **RLS is the real authorization boundary.** Middleware redirects are nice
  UX. The actual guarantee is the `is_admin()` policy on every table.
- **`status` enum, not a `published` boolean.** Adding `archived` later for
  "team relocated" or "season ended" is one new enum value; adding a third
  state to a boolean is a migration.
