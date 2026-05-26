import type { Team } from '@/lib/types';

/**
 * All 32 NFL teams. Conference/division assignments are publicly known
 * structural facts (not "NFL content" in the sense the brief restricts).
 *
 * STATUS GOVERNANCE:
 *   - AFC West teams: 'pending-verification' until research files are
 *     attached and approved. The page structure is live; content is withheld.
 *   - All others: 'coming-soon'.
 *
 * To promote an AFC West team to 'live', the workflow is:
 *   1. Populate verified content blocks in /data/research/afc-west.ts
 *   2. Change `status` here from 'pending-verification' to 'live'
 *   3. Set `lastVerified` and `shortSummary`
 */
export const teams: Team[] = [
  // ---------- AFC EAST ----------
  { id: 'buf', slug: 'buffalo-bills', name: 'Buffalo Bills', shortName: 'Bills', abbreviation: 'BUF', city: 'Buffalo', conference: 'AFC', division: 'East', status: 'coming-soon' },
  { id: 'mia', slug: 'miami-dolphins', name: 'Miami Dolphins', shortName: 'Dolphins', abbreviation: 'MIA', city: 'Miami', conference: 'AFC', division: 'East', status: 'coming-soon' },
  { id: 'nyj', slug: 'new-york-jets', name: 'New York Jets', shortName: 'Jets', abbreviation: 'NYJ', city: 'New York', conference: 'AFC', division: 'East', status: 'coming-soon' },
  { id: 'ne',  slug: 'new-england-patriots', name: 'New England Patriots', shortName: 'Patriots', abbreviation: 'NE',  city: 'New England', conference: 'AFC', division: 'East', status: 'coming-soon' },

  // ---------- AFC NORTH ----------
  { id: 'bal', slug: 'baltimore-ravens', name: 'Baltimore Ravens', shortName: 'Ravens', abbreviation: 'BAL', city: 'Baltimore', conference: 'AFC', division: 'North', status: 'coming-soon' },
  { id: 'cin', slug: 'cincinnati-bengals', name: 'Cincinnati Bengals', shortName: 'Bengals', abbreviation: 'CIN', city: 'Cincinnati', conference: 'AFC', division: 'North', status: 'coming-soon' },
  { id: 'cle', slug: 'cleveland-browns', name: 'Cleveland Browns', shortName: 'Browns', abbreviation: 'CLE', city: 'Cleveland', conference: 'AFC', division: 'North', status: 'coming-soon' },
  { id: 'pit', slug: 'pittsburgh-steelers', name: 'Pittsburgh Steelers', shortName: 'Steelers', abbreviation: 'PIT', city: 'Pittsburgh', conference: 'AFC', division: 'North', status: 'coming-soon' },

  // ---------- AFC SOUTH ----------
  { id: 'hou', slug: 'houston-texans', name: 'Houston Texans', shortName: 'Texans', abbreviation: 'HOU', city: 'Houston', conference: 'AFC', division: 'South', status: 'coming-soon' },
  { id: 'ind', slug: 'indianapolis-colts', name: 'Indianapolis Colts', shortName: 'Colts', abbreviation: 'IND', city: 'Indianapolis', conference: 'AFC', division: 'South', status: 'coming-soon' },
  { id: 'jax', slug: 'jacksonville-jaguars', name: 'Jacksonville Jaguars', shortName: 'Jaguars', abbreviation: 'JAX', city: 'Jacksonville', conference: 'AFC', division: 'South', status: 'coming-soon' },
  { id: 'ten', slug: 'tennessee-titans', name: 'Tennessee Titans', shortName: 'Titans', abbreviation: 'TEN', city: 'Tennessee', conference: 'AFC', division: 'South', status: 'coming-soon' },

  // ---------- AFC WEST (PENDING VERIFICATION) ----------
  {
    id: 'kc',
    slug: 'kansas-city-chiefs',
    name: 'Kansas City Chiefs',
    shortName: 'Chiefs',
    abbreviation: 'KC',
    city: 'Kansas City',
    conference: 'AFC',
    division: 'West',
    status: 'pending-verification',
    futureApiFields: {},
  },
  {
    id: 'den',
    slug: 'denver-broncos',
    name: 'Denver Broncos',
    shortName: 'Broncos',
    abbreviation: 'DEN',
    city: 'Denver',
    conference: 'AFC',
    division: 'West',
    status: 'pending-verification',
    futureApiFields: {},
  },
  {
    id: 'lac',
    slug: 'los-angeles-chargers',
    name: 'Los Angeles Chargers',
    shortName: 'Chargers',
    abbreviation: 'LAC',
    city: 'Los Angeles',
    conference: 'AFC',
    division: 'West',
    status: 'pending-verification',
    futureApiFields: {},
  },
  {
    id: 'lv',
    slug: 'las-vegas-raiders',
    name: 'Las Vegas Raiders',
    shortName: 'Raiders',
    abbreviation: 'LV',
    city: 'Las Vegas',
    conference: 'AFC',
    division: 'West',
    status: 'pending-verification',
    futureApiFields: {},
  },

  // ---------- NFC EAST ----------
  { id: 'dal', slug: 'dallas-cowboys', name: 'Dallas Cowboys', shortName: 'Cowboys', abbreviation: 'DAL', city: 'Dallas', conference: 'NFC', division: 'East', status: 'coming-soon' },
  { id: 'nyg', slug: 'new-york-giants', name: 'New York Giants', shortName: 'Giants', abbreviation: 'NYG', city: 'New York', conference: 'NFC', division: 'East', status: 'coming-soon' },
  { id: 'phi', slug: 'philadelphia-eagles', name: 'Philadelphia Eagles', shortName: 'Eagles', abbreviation: 'PHI', city: 'Philadelphia', conference: 'NFC', division: 'East', status: 'coming-soon' },
  { id: 'was', slug: 'washington-commanders', name: 'Washington Commanders', shortName: 'Commanders', abbreviation: 'WAS', city: 'Washington', conference: 'NFC', division: 'East', status: 'coming-soon' },

  // ---------- NFC NORTH ----------
  { id: 'chi', slug: 'chicago-bears', name: 'Chicago Bears', shortName: 'Bears', abbreviation: 'CHI', city: 'Chicago', conference: 'NFC', division: 'North', status: 'coming-soon' },
  { id: 'det', slug: 'detroit-lions', name: 'Detroit Lions', shortName: 'Lions', abbreviation: 'DET', city: 'Detroit', conference: 'NFC', division: 'North', status: 'coming-soon' },
  { id: 'gb',  slug: 'green-bay-packers', name: 'Green Bay Packers', shortName: 'Packers', abbreviation: 'GB',  city: 'Green Bay', conference: 'NFC', division: 'North', status: 'coming-soon' },
  { id: 'min', slug: 'minnesota-vikings', name: 'Minnesota Vikings', shortName: 'Vikings', abbreviation: 'MIN', city: 'Minnesota', conference: 'NFC', division: 'North', status: 'coming-soon' },

  // ---------- NFC SOUTH ----------
  { id: 'atl', slug: 'atlanta-falcons', name: 'Atlanta Falcons', shortName: 'Falcons', abbreviation: 'ATL', city: 'Atlanta', conference: 'NFC', division: 'South', status: 'coming-soon' },
  { id: 'car', slug: 'carolina-panthers', name: 'Carolina Panthers', shortName: 'Panthers', abbreviation: 'CAR', city: 'Carolina', conference: 'NFC', division: 'South', status: 'coming-soon' },
  { id: 'no',  slug: 'new-orleans-saints', name: 'New Orleans Saints', shortName: 'Saints', abbreviation: 'NO',  city: 'New Orleans', conference: 'NFC', division: 'South', status: 'coming-soon' },
  { id: 'tb',  slug: 'tampa-bay-buccaneers', name: 'Tampa Bay Buccaneers', shortName: 'Buccaneers', abbreviation: 'TB',  city: 'Tampa Bay', conference: 'NFC', division: 'South', status: 'coming-soon' },

  // ---------- NFC WEST ----------
  { id: 'ari', slug: 'arizona-cardinals', name: 'Arizona Cardinals', shortName: 'Cardinals', abbreviation: 'ARI', city: 'Arizona', conference: 'NFC', division: 'West', status: 'coming-soon' },
  { id: 'lar', slug: 'los-angeles-rams', name: 'Los Angeles Rams', shortName: 'Rams', abbreviation: 'LAR', city: 'Los Angeles', conference: 'NFC', division: 'West', status: 'coming-soon' },
  { id: 'sf',  slug: 'san-francisco-49ers', name: 'San Francisco 49ers', shortName: '49ers', abbreviation: 'SF',  city: 'San Francisco', conference: 'NFC', division: 'West', status: 'coming-soon' },
  { id: 'sea', slug: 'seattle-seahawks', name: 'Seattle Seahawks', shortName: 'Seahawks', abbreviation: 'SEA', city: 'Seattle', conference: 'NFC', division: 'West', status: 'coming-soon' },
];

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

export function getTeamsByDivision(
  conference: 'AFC' | 'NFC',
  division: 'East' | 'North' | 'South' | 'West'
): Team[] {
  return teams.filter((t) => t.conference === conference && t.division === division);
}

export function getPublishableTeams(): Team[] {
  // Teams whose pages should render (live or pending-verification structure).
  return teams.filter((t) => t.status !== 'coming-soon');
}
