import type { MetadataRoute } from "next";

import { BLOG_POSTS, INDUSTRY_USE_CASES } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/product",
    "/voice-ai-agent-for-business",
    "/ai-call-handling-software",
    "/ai-appointment-scheduling-calls",
    "/vapi-ai-alternative",
    "/retell-ai-alternative",
    "/hipaa-compliant-voice-ai",
    "/voice-agent-api",
    "/ai-receptionist-for-restaurants",
    "/integrations",
    "/customers",
    "/voices",
    "/pricing",
    "/use-cases",
    "/benchmarks/voice-latency",
    "/growth",
    "/architecture",
    "/positioning",
    "/launch-checklist",
    "/docs",
    "/docs/api-reference",
    "/docs/core-concepts",
    "/docs/guides",
    "/docs/sdks",
    "/docs/support",
    "/docs/webhooks",
    "/docs/quickstart",
    "/enterprise",
    "/status",
    "/changelog",
    "/company",
    "/careers",
    "/blog",
    "/contact",
    "/legal/security",
    "/legal/privacy",
    "/legal/terms",
    "/legal/hipaa",
    "/legal/data-deletion-request",
    "/privacy",
    "/terms",
    "/cookies",
    "/signup",
    "/subscribe-success",
    "/login",
    "/dashboard",
    "/dashboard/agents",
    "/dashboard/calls",
    "/dashboard/analytics",
    "/dashboard/workflows",
    "/dashboard/knowledge",
    "/dashboard/integrations",
    "/dashboard/phone-numbers",
    "/dashboard/voices",
    "/dashboard/billing",
    "/dashboard/team",
    "/dashboard/settings"
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const posts = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const useCases = INDUSTRY_USE_CASES.map((item) => ({
    url: `${SITE_URL}/use-cases/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...posts, ...useCases];
}
