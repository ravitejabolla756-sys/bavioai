import type { MetadataRoute } from "next";

import { BLOG_POSTS } from "@/lib/constants";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bavio.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/pricing",
    "/use-cases",
    "/product",
    "/docs",
    "/company",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/signup",
    "/login",
    "/dashboard"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const posts = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...posts];
}
