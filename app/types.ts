export type HomeSectionId = "about" | "projects";

export interface HeroContent {
  title: string;
  subtitle: string;
}

export type AboutFact = [label: string, value: string];

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  copy: string;
}

export interface ProjectCardData {
  title: string;
  summary: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface BlogItem {
  id: number;
  title: string;
}

export interface SpotifyPlaylist {
  title: string;
  embedUrl: string;
}

export interface BookInfo {
  id: string;
  title: string;
  authors: string[];
  publishedDate?: string;
  description?: string;
  thumbnail?: string;
}
export interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  weeks: ContributionWeek[];
  username: string;
  live: boolean;
  error: string | null;
}

export interface NavItem {
  key: HomeSectionId | "blogs";
  label: string;
  href: string;
}
