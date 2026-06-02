import { z } from "zod";

const sortableDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const SortableDateSchema = z
  .string()
  .regex(sortableDatePattern, "Expected date in YYYY-MM-DD format");

export const AboutFactSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().url().optional(),
});

export const SpotifyPlaylistSchema = z.object({
  title: z.string().min(1),
  embedUrl: z.string().url(),
});

export const HomeContentSchema = z.object({
  hero: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
  }),
  about: z.object({
    facts: z.array(AboutFactSchema),
    paragraphs: z.array(z.string().min(1)),
  }),
  spotifyPlaylists: z.array(SpotifyPlaylistSchema),
  bookTitles: z.array(z.string().min(1)),
});

export const WorkExperienceLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const WorkExperienceSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  periodLabel: z.string().min(1),
  startDate: SortableDateSchema,
  endDate: SortableDateSchema.nullable().optional(),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)),
  location: z.string().min(1).optional(),
  links: z.array(WorkExperienceLinkSchema),
  published: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});

export const WorkExperienceSectionSchema = z.object({
  sectionTitle: z.string().min(1),
  items: z.array(WorkExperienceSchema),
});

export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string().min(1)).min(1),
  githubUrl: z.string().url().nullable().optional(),
  liveUrl: z.string().url().nullable().optional(),
  image: z.string().min(1).nullable().optional(),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  year: z.number().int().min(1900).max(2100),
  role: z.string().min(1),
  status: z.string().min(1),
});

export const ProjectsSectionSchema = z.object({
  sectionTitle: z.string().min(1),
  items: z.array(ProjectSchema),
});

export const NavigationItemSchema = z.object({
  key: z.enum(["about", "projects", "blogs"]),
  label: z.string().min(1),
  href: z.string().min(1),
  visible: z.boolean(),
});

export const SocialLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const BlogFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: SortableDateSchema,
  published: z.boolean(),
});
