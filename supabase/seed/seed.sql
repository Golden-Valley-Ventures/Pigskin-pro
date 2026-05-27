-- =============================================================================
-- Seed: AFC East + AFC West (placeholders only — fill in via /admin)
-- =============================================================================
-- This seed creates the division and team identity rows so the admin panel has
-- something to edit. All narrative, projection, and source fields are left
-- blank or marked TODO. Do not invent content here.
--
-- After running: sign in via magic link at /admin/login, then insert your
-- admin user with the service role:
--   insert into admin_users (user_id, email)
--   values ('<your-auth-uid>', 'you@example.com');
--
-- NOTE: This file uses psql `\set` variable syntax. Run it via:
--   supabase db reset                    (locally)
--   psql "<connection-string>" -f seed.sql
-- Do NOT paste it into the Supabase SQL editor directly — the editor does not
-- expand psql meta-commands. For the SQL editor, hard-code 2026 in place of
-- :season.
-- =============================================================================

set local session_replication_role = 'replica';  -- skip audit triggers for seed
-- NOTE: superuser-only. If running under the supabase shell, you can omit the
-- line above; the audit log will just record the seed inserts.

-- Constants
\set season 2026

-- Divisions -------------------------------------------------------------------
insert into divisions (conference, region, slug, name, summary, season, status)
values
  ('AFC', 'East', 'afc-east', 'AFC East', null, :season, 'draft'),
  ('AFC', 'West', 'afc-west', 'AFC West', null, :season, 'draft')
on conflict (conference, region, season) do nothing;

-- Teams: AFC East -------------------------------------------------------------
with d as (
  select id from divisions where slug = 'afc-east' and season = :season
)
insert into teams (division_id, slug, name, short_name, abbreviation, city, season, status)
select d.id, t.slug, t.name, t.short_name, t.abbr, t.city, :season, 'draft'
from d, (values
  ('buffalo-bills',     'Buffalo Bills',      'Bills',    'BUF', 'Buffalo'),
  ('miami-dolphins',    'Miami Dolphins',     'Dolphins', 'MIA', 'Miami'),
  ('new-england-patriots','New England Patriots','Patriots','NE','Foxborough'),
  ('new-york-jets',     'New York Jets',      'Jets',     'NYJ', 'East Rutherford')
) as t(slug, name, short_name, abbr, city)
on conflict (abbreviation, season) do nothing;

-- Teams: AFC West -------------------------------------------------------------
with d as (
  select id from divisions where slug = 'afc-west' and season = :season
)
insert into teams (division_id, slug, name, short_name, abbreviation, city, season, status)
select d.id, t.slug, t.name, t.short_name, t.abbr, t.city, :season, 'draft'
from d, (values
  ('kansas-city-chiefs','Kansas City Chiefs', 'Chiefs',   'KC',  'Kansas City'),
  ('denver-broncos',    'Denver Broncos',     'Broncos',  'DEN', 'Denver'),
  ('los-angeles-chargers','Los Angeles Chargers','Chargers','LAC','Los Angeles'),
  ('las-vegas-raiders', 'Las Vegas Raiders',  'Raiders',  'LV',  'Las Vegas')
) as t(slug, name, short_name, abbr, city)
on conflict (abbreviation, season) do nothing;

-- Placeholder snapshot + projection per team (all TODO) -----------------------
insert into team_snapshots (
  team_id, season, status,
  team_thesis, qb_summary, ol_grade, ol_summary, coaching_summary,
  defensive_summary, injury_status, fantasy_notes, betting_notes,
  key_additions, key_losses, archetype
)
select
  t.id, :season, 'draft',
  'TODO: team thesis',
  'TODO: QB summary',
  null,
  'TODO: OL summary',
  'TODO: coaching summary',
  'TODO: defensive summary',
  'TODO: injury status',
  'TODO: fantasy notes',
  'TODO: betting notes',
  'TODO: key additions',
  'TODO: key losses',
  'TODO: archetype'
from teams t
where t.season = :season
  and not exists (
    select 1 from team_snapshots s
    where s.team_id = t.id and s.season = :season
  );

insert into projections (team_id, season, status, notes)
select t.id, :season, 'draft', 'TODO: projection rationale'
from teams t
where t.season = :season
  and not exists (
    select 1 from projections p
    where p.team_id = t.id and p.season = :season
  );

set local session_replication_role = 'origin';
