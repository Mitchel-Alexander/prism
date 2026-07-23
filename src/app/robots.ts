import type { MetadataRoute } from "next";
import { SITE_URL, BASE_PATH } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // The /prism preview build (BASE_PATH set) is staging — keep it out of the
  // index so it can't compete with the real domain as duplicate content.
  if (BASE_PATH) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
