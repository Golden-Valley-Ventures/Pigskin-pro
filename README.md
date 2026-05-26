# Pigskin.pro — Foundation Build (v1.1)

The first production-quality foundation site for **Pigskin Professionals**, using the public brand identity **Pigskin.pro**.

> Pigskin Professionals provides football research and fantasy analysis for informational and entertainment purposes only.

---

## Current State

| Surface                                     | Status                  |
|---------------------------------------------|-------------------------|
| Pigskin Professionals / Pigskin.pro brand   | **Live**                |
| Core site architecture                      | **Live**                |
| AFC West division & team page structure     | **Pending Verification**|
| All other divisions and team pages          | **Coming Soon**         |
| Fantasy / DFS / Dynasty / Waiver Watch / Draft War Room / Market Lab | **Coming Soon** |
| Premium tier (paywall, auth, Stripe)        | **Future Phase**        |
| Live API ingestion / agent automation       | **Future Phase**        |

AFC West is **not** marked Live. The page structure is published; section content is intentionally withheld until verified research files are received and approved.

---

## Stack

- **Next.js 14** (App Router) · TypeScript · Tailwind CSS
- Static local data files (no DB, no API calls, no auth)
- Google Fonts: Bebas Neue (display) · Inter (body) · JetBrains Mono (data labels)
- Deploys clean to Vercel

---

## Run Locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Type-check and lint:

```bash
npm run typecheck
npm run lint
```

Production build:

```bash
npm run build
npm run start
```

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel, **Add New Project** → select the repo.
3. Framework preset: **Next.js**. No env vars needed for this build.
4. Deploy. The app is statically rendered for all current routes (`generateStaticParams` is used for `/teams/[slug]` and `/divisions/[slug]`).

---

## Project Structure

```
src/
  app/
    layout.tsx                    # Root layout — fonts, header, footer
    page.tsx                      # Homepage
    globals.css                   # Tailwind base + utility classes
    brand-tokens.css              # ← SINGLE SOURCE OF TRUTH for brand colors
    not-found.tsx                 # 404
    icon.svg                      # Favicon (The Hash)
    teams/page.tsx                # Teams index (all 32)
    teams/[slug]/page.tsx         # Team detail (dynamic)
    divisions/page.tsx            # Divisions index
    divisions/[slug]/page.tsx     # Division detail (dynamic)
    nfl-intel/page.tsx
    fantasy/page.tsx
    dfs/page.tsx
    dynasty/page.tsx
    waiver-watch/page.tsx
    draft-war-room/page.tsx
    market-lab/page.tsx
    premium/page.tsx              # UI-only email capture, no real wiring
    about/page.tsx

  components/
    Header.tsx                    # Sticky nav with mobile drawer
    Footer.tsx                    # Manifesto + nav + disclaimer
    Logo.tsx                      # The Hash mark + wordmark
    CTAButton.tsx
    StatusBadge.tsx               # live / pending-verification / coming-soon
    TeamCard.tsx
    DivisionCard.tsx
    IntelSection.tsx              # Renders a research block with governance UI
    ComingSoonPanel.tsx
    PageHero.tsx
    PremiumTeaser.tsx
    MetricCard.tsx
    SourceNote.tsx                # Page-level source attribution
    ResearchStatus.tsx            # Header strip on team/division pages
    ResearchIntegrityNote.tsx     # Visible governance note

  lib/
    types.ts                      # All TypeScript types
    nav.ts                        # Navigation config

  data/
    nfl/
      teams.ts                    # All 32 teams (status flags)
      divisions.ts                # 8 divisions (status flags)
    research/
      afc-west.ts                 # ← UPDATE THIS WHEN RESEARCH ARRIVES
    site/
      roadmap.ts                  # Future platform roadmap items
```

---

## Updating Team / Division Research

All research content lives in `src/data/research/afc-west.ts`.

### To publish a verified block:
1. Receive an approved research file from the research team.
2. In `afc-west.ts`, change the block's `status` from `'pending-verification'` to `'verified'`.
3. Fill `body` and/or `bullets`.
4. Set `sourceNote` (which file / who approved).
5. Set `lastVerified` (ISO date like `'2026-09-15'`).

### To promote the **AFC West division** to Live:
- All eight division-level blocks in `afc-west.ts` must be `'verified'`.
- Edit `src/data/nfl/divisions.ts` and change the `afc-west` entry's `status` from `'pending-verification'` to `'live'`.

### To promote an **AFC West team** to Live:
- All eight team page sections in `afcWestTeamResearch[<id>]` must be `'verified'`.
- Edit `src/data/nfl/teams.ts` and change that team's `status` from `'pending-verification'` to `'live'`. Set `lastVerified` and `shortSummary`.

The UI updates automatically — no component changes required.

---

## Brand Color Palette

Provisional palette is defined in **one file**: `src/app/brand-tokens.css`. When the official brand kit hex codes are received, edit only that file. Nothing else needs to change.

Provisional values (derived from the V1.1 logo evolution PDF visuals):

| Token         | Hex       | Use                                    |
|---------------|-----------|----------------------------------------|
| Midnight Turf | `#0E1320` | Primary dark canvas                    |
| Slate-2       | `#1A1F2E` | UI surface                             |
| Slate-3       | `#262B3A` | Borders / dividers                     |
| Ice White     | `#F4F2EC` | Primary text on dark                   |
| Ice Dim       | `#A8ADB8` | Secondary text on dark                 |
| Signal Gold   | `#E0A93A` | Primary accent                         |
| Gold Soft     | `#C49230` | Headlines on green only                |
| Turf Green    | `#1F3A2E` | Never carries body text                |
| Leather       | `#8B5A2B` | Print accent / pending-verification    |
| Chalk         | `#E8E4D9` | Off-white accent                       |

**Contrast rule** (from the brand book, locked): minimum WCAG AA, default AAA. No body text below 4.5:1. No headlines below 3:1. Gold is locked to Midnight Turf or Ice White backgrounds only — never on low-contrast slate.

---

## Files Needed Before AFC West Can Go Live

The foundation build is complete. To promote AFC West from **Pending Verification** to **Live**, the following must be attached:

1. **Official brand kit hex values** — to replace the provisional palette in `src/app/brand-tokens.css`. Specifically the canonical hex for: Midnight Turf, Slate-2, Slate-3, Ice White, Ice Dim, Signal Gold, Gold Soft, Turf Green, Leather, Chalk.
2. **Official typography specification** — confirm Bebas Neue / Inter / JetBrains Mono are the approved fonts, or substitute the official brand fonts.
3. **AFC West division research file** with verified content for the eight division-level blocks:
   - Division Overview
   - Key Fantasy Themes
   - Offensive Environments
   - Coaching / Scheme Notes
   - Quarterback Stability
   - Backfield Clarity
   - Pass Catcher Hierarchy
   - Scoring Environment Signals
4. **Per-team research files** for each AFC West team (Kansas City Chiefs, Denver Broncos, Los Angeles Chargers, Las Vegas Raiders), each covering:
   - Team Snapshot
   - Quarterback Room
   - Running Back Room
   - Pass Catchers
   - Offensive Line / Environment
   - Coaching / Play Calling
   - Key Fantasy Takeaways (3–7 concise bullets)
   - Watch List
5. **Source attribution per file** — who approved it, when, and what underlying material it was built from. This populates the `sourceNote` and `lastVerified` fields.
6. **Logo file confirmation** — confirm that the in-code SVG implementation of "The Hash" mark in `src/components/Logo.tsx` and `src/app/icon.svg` matches the official vector files, or replace with the official SVG.

Until these arrive, every AFC West surface stays in **Pending Verification** state and displays the governance placeholder. No analysis is invented.

---

## Next Build Phase

After AFC West goes live, the planned progression is:

1. **Conference research expansion** — AFC East, AFC North, AFC South, then NFC.
2. **Authentication** — likely NextAuth or Clerk. Add `(auth)` route group.
3. **Stripe subscriptions** — wire `Premium` page email capture to a real list; add `/premium/upgrade` and webhook handlers.
4. **Database** — Postgres (Neon/Supabase) for users, subscriptions, saved teams, draft sessions.
5. **API ingestion layer** — depth charts, rosters, schedules, injury feeds. Use `futureApiFields` on each team object as the wiring point.
6. **Agent workflows** — per-player news / injury / usage agents that produce verified summary cards. Output reviewed via admin dashboard before publication.
7. **Admin / Research Approval Dashboard** — internal-only route. Analysts draft research, editor approves, status flips from `pending-verification` → `verified` automatically.
8. **DFS / Waiver / Dynasty / Draft / Market** — built in that order, each gated by the same governance: nothing ships until research backs it.

---

## Voice & Content Discipline

Per the V1.1 brand book:

- **75% institutional, 25% gridiron edge.** Visuals stay measured. Words pick a fight.
- **Manifesto line:** *"We don't have takes. We have reads."*
- **Institutional lock-up:** *"Fantasy Football. Professionally."*
- Avoid: "Crush your league," "guaranteed edge," "lock of the week," generic hype, "AI magic" language.
- Prefer: "Verified signals," "decision-grade football intelligence," "research-backed fantasy context."

---

© 2026 Pigskin Professionals, Inc. — All rights reserved. — pigskin.pro
