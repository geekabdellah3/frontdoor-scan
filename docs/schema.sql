-- ==========================================
-- FRONTDOOR FAX - SUPABASE DATABASE SCHEMA --
-- ==========================================
-- Paste this script directly into your Supabase SQL Editor to create tables.

-- Disable Row Level Security (RLS) or configure permissive access for public front-end queries.
-- For simple SaaS setups, we allow public reads & writes, but you can secure these further.

-- 1. PROMOS TABLE
create table if not exists promos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  code text not null unique,
  discount numeric not null default 10, -- discount amount in USD (e.g. 10 for $10 off)
  is_active boolean not null default true
);

-- Seed default promo code
insert into promos (code, discount, is_active)
values ('WELCOME10', 10, true)
on conflict (code) do update set discount = 10, is_active = true;

-- 2. LEADS TABLE
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null unique,
  status text not null default 'new', -- 'new', 'contacted', 'converted'
  source_address text
);

-- 3. REPORTS TABLE
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  address text not null,
  email text not null,
  package_tier text not null default 'single', -- 'single' or 'bundle'
  final_price numeric not null,
  discount_applied numeric not null default 0,
  promo_code text,
  payment_status text not null default 'success', -- 'pending', 'success', 'failed'
  delivery_status text not null default 'ready', -- 'pending' or 'ready' (indicates if compiled)
  report_data jsonb -- detailed EPA / soil metrics JSON payload
);

-- Enable Row Level Security (RLS)
alter table promos enable row level security;
alter table leads enable row level security;
alter table reports enable row level security;

-- Create basic public policies (Allows public client CRUD since this is a public client demo)
create policy "Allow public read access to promos" on promos for select using (true);
create policy "Allow public write access to promos" on promos for insert with check (true);
create policy "Allow admin write/update to promos" on promos for all using (true);

create policy "Allow public write access to leads" on leads for insert with check (true);
create policy "Allow public read/write access to leads" on leads for all using (true);

create policy "Allow public write access to reports" on reports for insert with check (true);
create policy "Allow public read access to reports" on reports for select using (true);
create policy "Allow public update access to reports" on reports for update using (true);
create policy "Allow admin all access to reports" on reports for all using (true);
