// Core types for the Pigskin.pro data model.
// Static for v1; designed to be swapped for API/DB responses in v2.

export type Conference = 'AFC' | 'NFC';
export type Division = 'East' | 'North' | 'South' | 'West';

/**
 * Three-state lifecycle for any publishable surface (team, division, page).
 *   - 'live'                  : fully verified content is published
 *   - 'pending-verification'  : page structure exists; content withheld until
 *                               source material is verified and approved
 *   - 'coming-soon'           : not yet in the research pipeline
 */
export type Status = 'live' | 'pending-verification' | 'coming-soon';

/**
 * Block-level research state — must match the parent surface lifecycle.
 *   - 'verified'              : sourced from approved research
 *   - 'pending-verification'  : structurally present, content withheld
 *   - 'coming-soon'           : not yet researched
 */
export type ResearchStatus = 'verified' | 'pending-verification' | 'coming-soon';

export interface FutureApiFields {
  // Reserved for the v2 ingestion layer. Intentionally optional and additive.
  rosterEndpoint?: string;
  depthChartEndpoint?: string;
  injuryFeedEndpoint?: string;
  scheduleEndpoint?: string;
  marketEndpoint?: string;
}

export interface ResearchBlock {
  title: string;
  status: ResearchStatus;
  body?: string;
  bullets?: string[];
  sourceNote?: string;
  lastVerified?: string; // ISO date
}

export interface TeamPageSections {
  snapshot?: ResearchBlock;
  quarterback?: ResearchBlock;
  runningBack?: ResearchBlock;
  passCatchers?: ResearchBlock;
  offensiveLine?: ResearchBlock;
  coaching?: ResearchBlock;
  fantasyTakeaways?: ResearchBlock;
  watchList?: ResearchBlock;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  abbreviation: string;
  city: string;
  conference: Conference;
  division: Division;
  status: Status;
  lastVerified?: string;
  shortSummary?: string;
  pageSections?: TeamPageSections;
  sourceNotes?: string[];
  futureApiFields?: FutureApiFields;
}

export interface DivisionInfo {
  id: string;
  slug: string;
  name: string;            // e.g. "AFC West"
  conference: Conference;
  division: Division;
  status: Status;
  lastVerified?: string;
  overview?: ResearchBlock;
  themes?: ResearchBlock;
  offensiveEnvironments?: ResearchBlock;
  coachingNotes?: ResearchBlock;
  quarterbackStability?: ResearchBlock;
  backfieldClarity?: ResearchBlock;
  passCatcherHierarchy?: ResearchBlock;
  scoringEnvironment?: ResearchBlock;
  teamIds: string[];
}

export interface RoadmapItem {
  label: string;
  status: Status | 'in-progress';
  description: string;
}
