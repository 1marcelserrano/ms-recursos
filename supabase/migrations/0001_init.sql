-- Schema inicial do funil /recursos (MS Creative Keys)
-- Aplicar no projeto Supabase (SQL Editor ou supabase db push).

create extension if not exists "pgcrypto";

-- Leads capturados (opt-in da Home, cards gated, survey)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null check (source in ('home', 'card', 'survey')),
  created_at timestamptz not null default now()
);

-- Tags por lead (lm-*, funil-*, int-*) — esquema em Scripts §2.1
create table if not exists public.lead_tags (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default now(),
  unique (lead_id, tag)
);

-- Respostas do survey (Q1 texto, Q2 multiseleção)
create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  q1 text not null,
  q2 text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_lead_tags_lead_id on public.lead_tags(lead_id);
create index if not exists idx_lead_tags_tag on public.lead_tags(tag);

-- RLS: ativado, sem policies públicas. O acesso é só via service_role
-- (server-side nos Route Handlers), que ignora RLS.
alter table public.leads enable row level security;
alter table public.lead_tags enable row level security;
alter table public.survey_responses enable row level security;
