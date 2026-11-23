import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { queryD1 } from "../app/lib/d1.server.ts";

const rows = await queryD1("SELECT * FROM page_views WHERE id = 1");
if (!rows?.length) throw new Error("Configure the D1 credentials and apply the counter migration before exporting.");

const snapshot = rows[0];
const expectedTotal = snapshot.baseline + snapshot.organic + snapshot.twitter + snapshot.instagram + snapshot.linkedin;
if (!Number.isSafeInteger(snapshot.total) || snapshot.total !== expectedTotal) {
  throw new Error("The counter snapshot is inconsistent. Export cancelled.");
}

const exportedAt = new Date().toISOString();
const directory = resolve("backups");
const destination = resolve(directory, `page-views-${exportedAt.replaceAll(":", "-")}.json`);
await mkdir(directory, { recursive: true });
await writeFile(destination, JSON.stringify({ version: 1, provider: "cloudflare-d1", exportedAt, ...snapshot }, null, 2) + "\n", { flag: "wx" });
console.log(`Saved ${snapshot.total.toLocaleString("en-US")} visits to ${destination}`);
