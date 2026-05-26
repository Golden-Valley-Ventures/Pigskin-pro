import type { DivisionInfo } from '@/lib/types';

/**
 * Divisions list. AFC West is 'pending-verification' until research files
 * arrive — its page renders structure but withholds analysis.
 * All other divisions are 'coming-soon'.
 */
export const divisions: DivisionInfo[] = [
  // AFC
  {
    id: 'afc-east', slug: 'afc-east', name: 'AFC East',
    conference: 'AFC', division: 'East', status: 'coming-soon',
    teamIds: ['buf', 'mia', 'nyj', 'ne'],
  },
  {
    id: 'afc-north', slug: 'afc-north', name: 'AFC North',
    conference: 'AFC', division: 'North', status: 'coming-soon',
    teamIds: ['bal', 'cin', 'cle', 'pit'],
  },
  {
    id: 'afc-south', slug: 'afc-south', name: 'AFC South',
    conference: 'AFC', division: 'South', status: 'coming-soon',
    teamIds: ['hou', 'ind', 'jax', 'ten'],
  },
  {
    id: 'afc-west', slug: 'afc-west', name: 'AFC West',
    conference: 'AFC', division: 'West', status: 'pending-verification',
    teamIds: ['kc', 'den', 'lac', 'lv'],
    // Section content lives in /data/research/afc-west.ts.
    // Page renders structure; blocks display as Pending Verification until verified.
  },
  // NFC
  {
    id: 'nfc-east', slug: 'nfc-east', name: 'NFC East',
    conference: 'NFC', division: 'East', status: 'coming-soon',
    teamIds: ['dal', 'nyg', 'phi', 'was'],
  },
  {
    id: 'nfc-north', slug: 'nfc-north', name: 'NFC North',
    conference: 'NFC', division: 'North', status: 'coming-soon',
    teamIds: ['chi', 'det', 'gb', 'min'],
  },
  {
    id: 'nfc-south', slug: 'nfc-south', name: 'NFC South',
    conference: 'NFC', division: 'South', status: 'coming-soon',
    teamIds: ['atl', 'car', 'no', 'tb'],
  },
  {
    id: 'nfc-west', slug: 'nfc-west', name: 'NFC West',
    conference: 'NFC', division: 'West', status: 'coming-soon',
    teamIds: ['ari', 'lar', 'sf', 'sea'],
  },
];

export function getDivisionBySlug(slug: string): DivisionInfo | undefined {
  return divisions.find((d) => d.slug === slug);
}
