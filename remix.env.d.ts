/// <reference types="@remix-run/dev" />
/// <reference types="vite/client" />

declare module "*?url" {
  const href: string;
  export default href;
}
