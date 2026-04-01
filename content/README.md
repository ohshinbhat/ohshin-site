# Content Guide

This portfolio uses git-backed content files so routine updates do not require React or route changes.

## Directory layout

- `content/site/home.json`: hero copy, about facts, about paragraphs, Spotify playlists, and book titles
- `content/site/projects.json`: project section headings and project cards
- `content/site/work-experience.json`: work experience section heading and entries
- `content/site/navigation.json`: primary navigation items
- `content/site/social-links.json`: reusable outbound profile links
- `content/blogs/*.mdx`: blog posts with frontmatter and markdown body

## Blog frontmatter

Every blog post requires:

- `title`
- `slug`
- `excerpt`
- `publishedAt` in `YYYY-MM-DD`
- `tags` as an array of strings
- `published` as a boolean

## Project fields

Every project entry requires:

- `id`
- `slug`
- `title`
- `summary`
- `description`
- `tech`
- `featured`
- `published`
- `sortOrder`
- `year`
- `role`
- `status`

`githubUrl`, `liveUrl`, and `image` are optional.

## Work experience fields

Every work experience entry requires:

- `id`
- `role`
- `company`
- `periodLabel`
- `startDate`
- `summary`
- `highlights`
- `links`
- `published`
- `sortOrder`

`endDate` and `location` are optional.

## Publishing and sorting

- Hidden items are kept in the repo by setting `published: false`
- Blog posts are listed by `publishedAt` descending
- Projects are ordered by `featured` first and then `sortOrder`
- Work experience entries are ordered by `sortOrder` and then `startDate`
- Navigation items render only when `visible: true`

## Common edits

### Add a new project

1. Open `content/site/projects.json`
2. Add a new object to `items`
3. Set a unique `id` and `slug`
4. Keep `published: false` until you want it visible

### Add a new job

1. Open `content/site/work-experience.json`
2. Add a new object to `items`
3. Set a unique `id`
4. Use `sortOrder` to position it

### Add a blog post

1. Create `content/blogs/your-slug.mdx`
2. Add the required frontmatter
3. Write the body in markdown
4. Set `published: true` when it should appear in `/blogs`

## Validation rules

- IDs and slugs must be unique
- Dates must use sortable `YYYY-MM-DD`
- External links must be valid URLs
- Invalid content fails during loading and tests
