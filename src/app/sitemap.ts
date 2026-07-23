import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getCollection } from "@/lib/content";

// Static export needs a fully static sitemap.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Indexable pages only — redirect stubs are noindex and excluded.
  const staticPaths = [
    "",
    "/workshops",
    "/podcast",
    "/blog",
    "/podcast-transcripts",
    "/history",
    "/contact",
    "/are-current-llms-conscious",
  ];
  const collections = ["podcast", "blog", "transcripts"] as const;
  const prefix = { podcast: "/podcast", blog: "/blog", transcripts: "/podcast-transcripts" };

  const entryPaths = collections.flatMap((c) =>
    getCollection(c).map((e) => `${prefix[c]}/${e.slug}`),
  );

  return [...staticPaths, ...entryPaths].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
