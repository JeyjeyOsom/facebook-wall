# facebook-wall

A 2008-style Facebook Wall — built for the [capm.us](https://apply.capm.us) challenge (Test 2).

Write a message (280 characters max), hit **Share**, and watch it appear on Juan's Wall in real time — in every open browser, no refresh.

**Stack:** Next.js (App Router) · React 19 · Supabase (Postgres + Realtime) · Tailwind CSS · shadcn/ui · Vercel

## Running locally

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor.
2. Copy `.env.example` to `.env.local` and fill in your project URL and anon key (Supabase → Settings → API).
3. `npm install && npm run dev`, then open http://localhost:3000.

## Notable choices

- **No auth.** Posts carry a self-declared display name (remembered in localStorage); blank means "Anonymous". `user_id` stays null, per the challenge schema.
- **RLS on, with open read/insert policies** — "anyone can write on the wall" is the product, and without policies the anon key can do nothing.
- **Realtime hardening:** posts merge by id (your own post never appears twice: insert response + realtime echo are deduped), and the feed refetches whenever the channel re-reaches `SUBSCRIBED`, so a dropped websocket can't leave the wall frozen.
- **Feed capped at the latest 50 posts**, newest first.
- The 280-char limit is enforced in the UI (maxLength + counter) and in the database (`check` constraint).

See [`CONTEXT.md`](CONTEXT.md) for the domain glossary.
