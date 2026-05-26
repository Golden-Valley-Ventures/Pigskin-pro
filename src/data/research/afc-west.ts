import type { ResearchBlock, TeamPageSections } from '@/lib/types';

/**
 * AFC WEST RESEARCH — SOURCE OF TRUTH
 * ====================================================================
 *
 * Per Pigskin.pro content governance: do NOT add `body` or `bullets`
 * unless the source material supports it. Leave status as
 * 'pending-verification' and the UI will render a clearly-marked
 * placeholder. NO fabricated analysis under any circumstance.
 *
 * Block lifecycle:
 *   - 'pending-verification' : structurally present, content withheld
 *   - 'verified'             : sourced from approved research files
 *   - 'coming-soon'          : not yet in the research pipeline
 *
 * To publish a verified block:
 *   1. Receive approved research file from research team
 *   2. Change `status` to 'verified'
 *   3. Fill `body` and/or `bullets`
 *   4. Set `sourceNote` (which file / who approved)
 *   5. Set `lastVerified` (ISO date)
 *
 * To promote the AFC West DIVISION to 'live':
 *   - All eight division-level blocks below must be 'verified'
 *   - Edit /data/nfl/divisions.ts and set AFC West status to 'live'
 *
 * To promote an AFC West TEAM to 'live':
 *   - All eight team page sections must be 'verified'
 *   - Edit /data/nfl/teams.ts and set team status to 'live'
 * ====================================================================
 */

// ---------------------------------------------------------------------------
// DIVISION-LEVEL CONTENT
// ---------------------------------------------------------------------------

export const afcWestOverview: ResearchBlock = {
  title: 'Division Overview',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

export const afcWestThemes: ResearchBlock = {
  title: 'Key Fantasy Themes',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

export const afcWestOffensiveEnvironments: ResearchBlock = {
  title: 'Offensive Environments',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

export const afcWestCoachingNotes: ResearchBlock = {
  title: 'Coaching / Scheme Notes',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

export const afcWestQuarterbackStability: ResearchBlock = {
  title: 'Quarterback Stability',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

export const afcWestBackfieldClarity: ResearchBlock = {
  title: 'Backfield Clarity',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

export const afcWestPassCatcherHierarchy: ResearchBlock = {
  title: 'Pass Catcher Hierarchy',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

export const afcWestScoringEnvironment: ResearchBlock = {
  title: 'Scoring Environment Signals',
  status: 'pending-verification',
  sourceNote: 'Awaiting verified AFC West research file.',
};

// ---------------------------------------------------------------------------
// TEAM-LEVEL CONTENT
// ---------------------------------------------------------------------------

const blankTeamSections = (): TeamPageSections => ({
  snapshot:        { title: 'Team Snapshot',                 status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
  quarterback:     { title: 'Quarterback Room',              status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
  runningBack:     { title: 'Running Back Room',             status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
  passCatchers:    { title: 'Pass Catchers',                 status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
  offensiveLine:   { title: 'Offensive Line / Environment',  status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
  coaching:        { title: 'Coaching / Play Calling',       status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
  fantasyTakeaways:{ title: 'Key Fantasy Takeaways',         status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
  watchList:       { title: 'Watch List',                    status: 'pending-verification', sourceNote: 'Awaiting verified team research file.' },
});

export const afcWestTeamResearch: Record<string, TeamPageSections> = {
  kc:  blankTeamSections(),
  den: blankTeamSections(),
  lac: blankTeamSections(),
  lv:  blankTeamSections(),
};
