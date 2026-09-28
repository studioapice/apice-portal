import type { MetadataRoute } from "next";

/** TEMPORARY: private presentation — block all crawlers. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
