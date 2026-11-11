import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://vidyamhometuition.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about/`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/services/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact/`, changeFrequency: "yearly", priority: 0.7 },
  ];
}
