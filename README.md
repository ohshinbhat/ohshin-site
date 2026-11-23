# Ohshin Bhat
Personal portfolio for my work, projects, writing, and experiments.
Built to feel visual, sharp, and a little playful.
The site brings together who I am, what I build, and how to reach me.

The site runs on Vercel and stores its visit counter in Cloudflare D1. Configure `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, and `CLOUDFLARE_D1_API_TOKEN` in `.env.local` and in the Vercel environment. The API token needs D1 edit permission in the database's account. Restart the local server after changing credentials.

The restored database is `ohshin-site-page-views` in account `d61df55b59d50c81c8db9c5a54973e68`, with database ID `b2903b98-2fef-44d0-8c75-d9519decd09c`. The schema and recovered data have already been applied to this database. Create the reviewed `ohshin-site-page-views` token with only D1 Write permission, then save its secret as `CLOUDFLARE_D1_API_TOKEN` locally and in Vercel project settings. Never commit the secret. Redeploy Vercel after updating its environment, then check that `GET /api/page-view` returns `status: "live"` and `live: true`.

Apply `migrations/0001_page_views.sql` once to initialize D1. It restores 162,273 visits, including the 150,000 carryover and the 12,273 visits recovered from the deleted Upstash database's October 15, 2026 backup. Source counts and recovery provenance are preserved in `backups/page-views-2026-10-15.json`. Reapplying the migration preserves newer visits.

`GET /api/page-view` reports the total and connection status. `POST /api/page-view` records a visit. Tracking runs after navigation and updates the displayed total from the response. When D1 is unavailable, the API returns the last known total with `live: false`, and the Work tooltip indicates the outage.

Run `npm run counter:backup` with Node 22.6 or later to save a consistent JSON snapshot locally under `backups/`. D1 also provides automatic Time Travel recovery for seven days on the free plan. Store exported snapshots outside the Cloudflare account for longer retention.
