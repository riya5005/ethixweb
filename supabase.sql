-- Run once in Supabase > SQL Editor
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
-- RLS on with no policies = the public key can't read anything.
-- Only our server (service role key) can touch this table.
alter table leads enable row level security;
