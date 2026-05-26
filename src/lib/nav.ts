export interface NavItem {
  label: string;
  href: string;
  status?: 'live' | 'coming-soon';
}

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/', status: 'live' },
  { label: 'NFL Intel', href: '/nfl-intel', status: 'live' },
  { label: 'Teams', href: '/teams', status: 'live' },
  { label: 'Divisions', href: '/divisions', status: 'live' },
  { label: 'Fantasy', href: '/fantasy', status: 'coming-soon' },
  { label: 'DFS', href: '/dfs', status: 'coming-soon' },
  { label: 'Dynasty', href: '/dynasty', status: 'coming-soon' },
  { label: 'Waiver Watch', href: '/waiver-watch', status: 'coming-soon' },
  { label: 'Draft War Room', href: '/draft-war-room', status: 'coming-soon' },
  { label: 'Market Lab', href: '/market-lab', status: 'coming-soon' },
  { label: 'Premium', href: '/premium', status: 'coming-soon' },
  { label: 'About', href: '/about', status: 'live' },
];
