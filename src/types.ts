export interface AssetMap {
  logo: string;
  heroTraining: string;
  trainingWide: string;
  coachPhoto: string;
  oncaWide: string;
  historyHero: string;
  nicolasCustomPhoto: string;
  ronaldoCustomPhoto: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
  mark?: string;
  featured?: boolean;
}

export interface HonorItem {
  id: string;
  count: string;
  title: string;
  subtitle: string;
  years: string;
  image: string;
  tone: string;
}

export interface SquadPlayer {
  id: string;
  name: string;
  fullName: string;
  position: string;
  number: number;
  foot: string;
  birth: string;
  nationality: string;
  birthplace: string;
  height: string;
  lastClub: string;
  history: string;
  image: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  priority: string;
  benefits: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  tag: string;
  image: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  text: string;
}

export interface NewsArticle {
  title?: string;
  heroImage: string;
  inlineImage: string;
  lead: string;
  paragraphs: string[];
  quote: string;
  quoteSource: string;
  stats: StatItem[];
  nextSteps: string[];
}

export interface NewsItem {
  id: string;
  path: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  article: NewsArticle;
}

export interface RouteMeta {
  title: string;
  description: string;
  type?: "website" | "article";
}

export interface CompetitionSource {
  scrapedAt: string;
  fixturesUrl: string;
  resultsUrl: string;
  topScorersUrl: string;
  fullResultsFeedName: string;
  teamId: string;
  parsedFixtures: number;
  parsedSimulationFixtures: number;
  parsedResults: number;
  parsedTopScorers: number;
  expectedResults: number;
  fullResultsFetched: boolean;
  parsedAmazonasResults: number;
  downloadedLogos: number;
  sofascoreNextEventsUrl: string;
  resolvedSofascoreVenues: number;
  resolvedFixtureVenues: number;
}

export interface CompetitionStatus {
  updatedAt: string;
  position: string;
  points: number;
  record: string;
  goals?: string;
  goalDiff: string;
}

export interface StandingsRow {
  rank: number;
  team: string;
  logo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  diff: string;
  points: number;
}

export interface MatchScore {
  homeGoals: string | number;
  awayGoals: string | number;
}

export interface CompetitionMatch {
  id: string;
  timestamp: number;
  competition: string;
  round: string;
  date: string;
  day?: string;
  time: string;
  home: string;
  away: string;
  homeLogo: string;
  awayLogo: string;
  venue: string;
  city: string;
  homeGoals?: number;
  awayGoals?: number;
}

export interface MatchdayMatch extends CompetitionMatch {
  status: string;
  ticket: string;
  channel: string;
}

export interface RecentResult extends MatchdayMatch {
  opponent: string;
  opponentLogo: string;
  side: string;
  score: string;
  amazonasScore: string;
  outcome: string;
}

export interface TopScorer {
  rank: number;
  player: string;
  club: string;
  goals: number;
  assists?: number;
  matches?: number;
}

export interface SectionCard {
  kicker?: string;
  title: string;
  text?: string;
}

export interface SectionBlock {
  title: string;
  type: string;
  columns?: string;
  items: SectionCard[];
}

export interface SectionCta {
  label: string;
  href: string;
  external: boolean;
  variant?: "primary" | "ghost" | "dark";
}

export interface SectionPageData {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageFit?: "contain" | "cover";
  imagePosition?: string;
  imagePanelClassName?: string;
  introTitle: string;
  intro: string[];
  stats?: StatItem[];
  blocks?: SectionBlock[];
  ctas?: SectionCta[];
}

export interface NavChildItem {
  label: string;
  path: string;
  aliases?: string[];
}

export interface NavItem extends NavChildItem {
  children?: NavChildItem[];
  groups?: Array<{ label: string; items: NavChildItem[] }>;
}
