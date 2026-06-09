# new-portfolio

## Local env setup

1. Copy `.env.example` to `.env.local` if you need a fresh local file.
2. Fill in any optional values you want to use.
3. Start the app with:

```bash
npm run dev
```

## Reach stats

The Work page `reach` strip reads optional server-side values:

- `X_BEARER_TOKEN` + `X_USERNAME` for live X follower counts through the official API.
- `INSTAGRAM_STATS_ENDPOINT` or `INSTAGRAM_FOLLOWERS` for Instagram follower counts.
- `PAGE_VISITS_ENDPOINT` or `PAGE_VISITS` for page visit totals.

If a stat is not configured, the UI shows `connect` instead of fake numbers.
