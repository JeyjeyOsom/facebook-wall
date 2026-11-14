-- Facebook Wall schema — run this in the Supabase SQL Editor.
-- Extends the challenge's SQL with: author_name, NOT NULL + min-length on body,
-- RLS policies (without them the anon key can't read or write anything),
-- and the realtime publication (the "enable Realtime" pitfall, done in SQL).

create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  author_name text check (char_length(author_name) <= 40),
  body text not null check (char_length(body) between 1 and 280),
  created_at timestamptz default now()
);

alter table posts enable row level security;

create policy "Anyone can read the wall"
  on posts for select
  using (true);

create policy "Anyone can write on the wall"
  on posts for insert
  with check (true);

alter publication supabase_realtime add table posts;
