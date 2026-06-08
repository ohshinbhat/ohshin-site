const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
import type { ContributionCalendar, ContributionWeek } from "../types";

interface ContributionCalendarArgs {
  username: string;
  token?: string;
}

interface GitHubGraphQlError {
  message: string;
}

interface GitHubContributionPayload {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: ContributionWeek[];
        };
      };
    };
  };
  errors?: GitHubGraphQlError[];
}

function toIsoDate(date: Date): string {
  return date.toISOString();
}

export async function getContributionCalendar({
  username,
  token,
}: ContributionCalendarArgs): Promise<ContributionCalendar> {
  if (!token) {
    return {
      weeks: [],
      username,
      live: false,
      error: "Missing GITHUB_TOKEN",
    };
  }

  const now = new Date();
  const from = new Date(now);
  from.setDate(now.getDate() - 365);

  const query = `
    query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                color
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "ohshin-portfolio",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: toIsoDate(from),
        to: toIsoDate(now),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL returned ${response.status}`);
  }

  const payload = (await response.json()) as GitHubContributionPayload;

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message);
  }

  const weeks =
    payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return {
    weeks: weeks.slice(-8),
    username,
    live: true,
    error: null,
  };
}
