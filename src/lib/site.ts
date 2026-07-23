// Canonical site origin, shared by metadata, sitemap, and robots.
// Root/production build (no BASE_PATH) → the real domain.
// /prism preview build (BASE_PATH=/prism in CI) → the github.io project path,
// so the preview's canonical/OG/sitemap stay self-consistent.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_URL = BASE_PATH
  ? `https://mitchel-alexander.github.io${BASE_PATH}`
  : "https://www.prism-global.com";
