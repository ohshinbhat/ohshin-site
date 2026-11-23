interface D1Response<T> {
  success: boolean;
  result: { success: boolean; results: T[] }[];
}

export async function queryD1<T>(
  sql: string,
  params: (string | number)[] = [],
): Promise<T[] | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_D1_API_TOKEN;
  if (!accountId || !databaseId || !token) return null;

  const url = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/d1/database/${encodeURIComponent(databaseId)}/query`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    signal: AbortSignal.timeout(2500),
    cache: "no-store",
  });
  const data = await response.json() as D1Response<T>;
  if (!response.ok || !data.success || !data.result?.length || data.result.some(result => !result.success)) {
    throw new Error("Cloudflare D1 query failed");
  }
  return data.result.flatMap(result => result.results);
}
