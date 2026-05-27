-- =============================================================================
-- Pigskin.pro CMS — initial schema
-- =============================================================================
-- Conventions:
--   * Every editable table includes: season, status, created_at, updated_at,
--     last_edited_by.
--   * Public reads are restricted to status = 'published' via RLS.
--   * All writes require an authenticated admin (see is_admin()).
--   * Audit log is written by trigger on every UPDATE of editable tables.
-- =============================================================================

-- Extensions ------------------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "citext";

-- Enums -----------------------------------------------------------------------
create type content_status as enum ('draft', 'published', 'archived');

create type conference_name as enum ('AFC', 'NFC');

create type division_region as enum ('East', 'West', 'North', 'South');

create type source_tier as enum (
  'tier_1_primary',     -- beat writers, official team/league, primary docs
  'tier_2_reputable',   -- established national outlets, vetted analysts
  'tier_3_aggregator',  -- aggregators, secondary reporting
  'tier_4_social'       -- social media, unconfirmed
);

create type residual_status as enum ('open', 'in_progress', 'resolved', 'wont_fix');

create type residual_priority as enum ('low', 'medium', 'high', 'critical');

-- Admin allowlist -------------------------------------------------------------
-- A user is admin iff their auth.uid() appears in admin_users. This is the
-- single source of truth for write authorization. Add yourself by inserting a
-- row after first magic-link sign-in (see seed script).
create table admin_users (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  email       citext not null unique,
  created_at  timestamptz not null default now()
);

create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from admin_users where user_id = auth.uid()
  );
$$;

-- Divisions -------------------------------------------------------------------
create table divisions (
  id           uuid primary key default uuid_generate_v4(),
  conference   conference_name not null,
  region       division_region not null,
  slug         text not null unique,
  name         text not null,                 -- e.g. "AFC East"
  summary      text,
  season       integer not null,
  status       content_status not null default 'draft',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  last_edited_by uuid references auth.users(id) on delete set null,
  unique (conference, region, season)
);

-- Teams -----------------------------------------------------------------------
-- The teams table holds *identity* fields that rarely change (name, slug,
-- division, colors). Narrative content that changes during the season lives in
-- team_snapshots. Projections live in their own table for the same reason.
create table teams (
  id            uuid primary key default uuid_generate_v4(),
  division_id   uuid not null references divisions(id) on delete restrict,
  slug          text not null unique,         -- e.g. "buffalo-bills"
  name          text not null,                -- "Buffalo Bills"
  short_name    text not null,                -- "Bills"
  abbreviation  text not null,                -- "BUF"
  city          text not null,
  primary_color text,                         -- hex
  secondary_color text,
  logo_url      text,
  season        integer not null,
  status        content_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  last_edited_by uuid references auth.users(id) on delete set null,
  unique (abbreviation, season)
);

create index teams_division_idx on teams(division_id);
create index teams_season_status_idx on teams(season, status);

-- Team snapshots --------------------------------------------------------------
-- Time-series narrative state. Each save creates (or updates) a snapshot for a
-- given team + as_of_date. To preserve history, the edit form *inserts* a new
-- snapshot rather than updating the previous one, then the team page reads the
-- latest published snapshot.
create table team_snapshots (
  id                   uuid primary key default uuid_generate_v4(),
  team_id              uuid not null references teams(id) on delete cascade,
  as_of_date           date not null default current_date,

  -- Narrative fields (free text; markdown allowed)
  team_thesis          text,                  -- overall analytical thesis
  qb_summary           text,
  ol_grade             text,                  -- letter grade or short tag
  ol_summary           text,
  coaching_summary     text,
  defensive_summary    text,
  injury_status        text,
  fantasy_notes        text,
  betting_notes        text,
  key_additions        text,
  key_losses           text,
  archetype            text,                  -- e.g. "run-heavy / bend-don't-break"

  season               integer not null,
  status               content_status not null default 'draft',
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  last_edited_by       uuid references auth.users(id) on delete set null
);

create index team_snapshots_team_idx on team_snapshots(team_id, as_of_date desc);
create index team_snapshots_published_idx
  on team_snapshots(team_id, status, as_of_date desc)
  where status = 'published';

-- Projections -----------------------------------------------------------------
create table projections (
  id                    uuid primary key default uuid_generate_v4(),
  team_id               uuid not null references teams(id) on delete cascade,
  as_of_date            date not null default current_date,

  projected_wins        numeric(4,2),         -- e.g. 9.50
  floor_wins            numeric(4,2),
  ceiling_wins          numeric(4,2),
  confidence            integer check (confidence between 1 and 10),
  playoff_probability   numeric(4,3) check (playoff_probability between 0 and 1),
  division_probability  numeric(4,3) check (division_probability between 0 and 1),
  notes                 text,

  season                integer not null,
  status                content_status not null default 'draft',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  last_edited_by        uuid references auth.users(id) on delete set null
);

create index projections_team_idx on projections(team_id, as_of_date desc);
create index projections_published_idx
  on projections(team_id, status, as_of_date desc)
  where status = 'published';

-- Residuals -------------------------------------------------------------------
-- Open analytical questions / unresolved items per team. Many-to-one.
create table residuals (
  id              uuid primary key default uuid_generate_v4(),
  team_id         uuid not null references teams(id) on delete cascade,
  item            text not null,
  status          residual_status not null default 'open',
  priority        residual_priority not null default 'medium',
  notes           text,
  resolved_at     timestamptz,
  season          integer not null,
  -- Residuals are an internal workflow concept. We still include status for
  -- consistency, but they will rarely render publicly.
  content_status  content_status not null default 'draft',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  last_edited_by  uuid references auth.users(id) on delete set null
);

create index residuals_team_idx on residuals(team_id, status, priority);

-- Source notes ----------------------------------------------------------------
create table source_notes (
  id                uuid primary key default uuid_generate_v4(),
  team_id           uuid not null references teams(id) on delete cascade,
  source_name       text not null,
  url               text,
  source_date       date,
  tier              source_tier not null,
  confidence        integer not null check (confidence between 1 and 10),
  excerpt           text,
  claim_supported   text not null,            -- what claim this source backs
  season            integer not null,
  status            content_status not null default 'draft',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  last_edited_by    uuid references auth.users(id) on delete set null
);

create index source_notes_team_idx on source_notes(team_id, source_date desc);

-- Audit log -------------------------------------------------------------------
create table audit_log (
  id           bigserial primary key,
  table_name   text not null,
  row_id       uuid not null,
  action       text not null check (action in ('insert', 'update', 'delete')),
  actor        uuid references auth.users(id) on delete set null,
  diff         jsonb,                         -- {field: {from, to}}
  occurred_at  timestamptz not null default now()
);

create index audit_log_row_idx on audit_log(table_name, row_id, occurred_at desc);
create index audit_log_actor_idx on audit_log(actor, occurred_at desc);

-- updated_at trigger ----------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Audit trigger ---------------------------------------------------------------
create or replace function write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row_id uuid;
  v_diff   jsonb := '{}'::jsonb;
  v_key    text;
  v_old    jsonb;
  v_new    jsonb;
begin
  if tg_op = 'DELETE' then
    v_row_id := (to_jsonb(old) ->> 'id')::uuid;
    insert into audit_log(table_name, row_id, action, actor, diff)
    values (tg_table_name, v_row_id, 'delete', auth.uid(), to_jsonb(old));
    return old;
  end if;

  v_row_id := (to_jsonb(new) ->> 'id')::uuid;

  if tg_op = 'INSERT' then
    insert into audit_log(table_name, row_id, action, actor, diff)
    values (tg_table_name, v_row_id, 'insert', auth.uid(), to_jsonb(new));
    return new;
  end if;

  -- UPDATE: build a sparse diff of changed fields only
  v_old := to_jsonb(old);
  v_new := to_jsonb(new);
  for v_key in select jsonb_object_keys(v_new) loop
    if v_key in ('updated_at', 'last_edited_by') then
      continue;
    end if;
    if (v_old -> v_key) is distinct from (v_new -> v_key) then
      v_diff := v_diff || jsonb_build_object(
        v_key,
        jsonb_build_object('from', v_old -> v_key, 'to', v_new -> v_key)
      );
    end if;
  end loop;

  -- Skip writing an audit row if nothing material changed
  if v_diff = '{}'::jsonb then
    return new;
  end if;

  insert into audit_log(table_name, row_id, action, actor, diff)
  values (tg_table_name, v_row_id, 'update', auth.uid(), v_diff);
  return new;
end;
$$;

-- Attach triggers to every editable table
do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'divisions',
      'teams',
      'team_snapshots',
      'projections',
      'residuals',
      'source_notes'
    ])
  loop
    execute format(
      'create trigger %I_set_updated_at
         before update on %I
         for each row execute function set_updated_at()',
      t, t
    );
    execute format(
      'create trigger %I_audit
         after insert or update or delete on %I
         for each row execute function write_audit_log()',
      t, t
    );
  end loop;
end$$;

-- =============================================================================
-- Row Level Security
-- =============================================================================
alter table admin_users     enable row level security;
alter table divisions       enable row level security;
alter table teams           enable row level security;
alter table team_snapshots  enable row level security;
alter table projections     enable row level security;
alter table residuals       enable row level security;
alter table source_notes    enable row level security;
alter table audit_log       enable row level security;

-- admin_users: only admins can see the list (prevents enumeration). Inserts
-- must be done with the service role from the seed/bootstrap script.
create policy admin_users_select_admin
  on admin_users for select
  using (is_admin());

-- Helper macro: each editable table gets four policies.
-- 1. Public can SELECT only published rows.
-- 2. Admins can SELECT all rows.
-- 3. Admins can INSERT.
-- 4. Admins can UPDATE.
-- 5. Admins can DELETE.
-- (We use anon + authenticated as the public role; published = anyone.)

-- divisions
create policy divisions_public_read
  on divisions for select
  using (status = 'published');
create policy divisions_admin_read
  on divisions for select to authenticated
  using (is_admin());
create policy divisions_admin_write
  on divisions for insert to authenticated
  with check (is_admin());
create policy divisions_admin_update
  on divisions for update to authenticated
  using (is_admin())
  with check (is_admin());
create policy divisions_admin_delete
  on divisions for delete to authenticated
  using (is_admin());

-- teams
create policy teams_public_read
  on teams for select
  using (status = 'published');
create policy teams_admin_read
  on teams for select to authenticated
  using (is_admin());
create policy teams_admin_write
  on teams for insert to authenticated
  with check (is_admin());
create policy teams_admin_update
  on teams for update to authenticated
  using (is_admin())
  with check (is_admin());
create policy teams_admin_delete
  on teams for delete to authenticated
  using (is_admin());

-- team_snapshots
create policy team_snapshots_public_read
  on team_snapshots for select
  using (status = 'published');
create policy team_snapshots_admin_read
  on team_snapshots for select to authenticated
  using (is_admin());
create policy team_snapshots_admin_write
  on team_snapshots for insert to authenticated
  with check (is_admin());
create policy team_snapshots_admin_update
  on team_snapshots for update to authenticated
  using (is_admin())
  with check (is_admin());
create policy team_snapshots_admin_delete
  on team_snapshots for delete to authenticated
  using (is_admin());

-- projections
create policy projections_public_read
  on projections for select
  using (status = 'published');
create policy projections_admin_read
  on projections for select to authenticated
  using (is_admin());
create policy projections_admin_write
  on projections for insert to authenticated
  with check (is_admin());
create policy projections_admin_update
  on projections for update to authenticated
  using (is_admin())
  with check (is_admin());
create policy projections_admin_delete
  on projections for delete to authenticated
  using (is_admin());

-- residuals (admin-only; never rendered publicly)
create policy residuals_admin_read
  on residuals for select to authenticated
  using (is_admin());
create policy residuals_admin_write
  on residuals for insert to authenticated
  with check (is_admin());
create policy residuals_admin_update
  on residuals for update to authenticated
  using (is_admin())
  with check (is_admin());
create policy residuals_admin_delete
  on residuals for delete to authenticated
  using (is_admin());

-- source_notes
create policy source_notes_public_read
  on source_notes for select
  using (status = 'published');
create policy source_notes_admin_read
  on source_notes for select to authenticated
  using (is_admin());
create policy source_notes_admin_write
  on source_notes for insert to authenticated
  with check (is_admin());
create policy source_notes_admin_update
  on source_notes for update to authenticated
  using (is_admin())
  with check (is_admin());
create policy source_notes_admin_delete
  on source_notes for delete to authenticated
  using (is_admin());

-- audit_log: admin read-only; writes only via trigger (security definer).
create policy audit_log_admin_read
  on audit_log for select to authenticated
  using (is_admin());

-- =============================================================================
-- Convenience views for public pages
-- =============================================================================
-- Latest *published* snapshot per team.
create or replace view team_latest_snapshot as
select distinct on (team_id) *
from team_snapshots
where status = 'published'
order by team_id, as_of_date desc, updated_at desc;

-- Latest *published* projection per team.
create or replace view team_latest_projection as
select distinct on (team_id) *
from projections
where status = 'published'
order by team_id, as_of_date desc, updated_at desc;

grant select on team_latest_snapshot to anon, authenticated;
grant select on team_latest_projection to anon, authenticated;
