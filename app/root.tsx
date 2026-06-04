import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import appStylesHref from "./styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Doto:wght@400..900&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:wght@500;600;700&display=swap",
  },
  { rel: "icon", href: "/favicon.ico" },
  { rel: "stylesheet", href: appStylesHref },
];

export const meta: MetaFunction = () => [
  { title: "Ohshin | Engineer, Designer, Shipper" },
  {
    name: "description",
    content:
      "Personal portfolio for Ohshin with projects, writing, and a dark retro-future visual identity.",
  },
];

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
