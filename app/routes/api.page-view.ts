import { json, type ActionFunctionArgs } from "@remix-run/node";
import { getPageViewTotal, incrementPageView } from "../lib/page-views.server";

const headers = { "Cache-Control": "no-store" };

export async function action({ request }: ActionFunctionArgs) {
  if (request.method.toUpperCase() !== "POST") {
    return json(
      { error: "Method not allowed" },
      {
        headers: { Allow: "POST" },
        status: 405,
      },
    );
  }

  const url = new URL(request.url);
  const pageView = await incrementPageView(url.searchParams.get("source"));

  return json(pageView, { headers });
}

export async function loader() {
  return json(await getPageViewTotal(), { headers });
}
