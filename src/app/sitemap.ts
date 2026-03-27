import { getAllPosts } from "@/lib/blog";
import { getSelectedWork } from "@/lib/selected-work";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const BASE_URL = "https://angsaku.vercel.app";

function safeDate(value: string | null | undefined): Date {
  if (!value) return new Date();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  let projects: Awaited<ReturnType<typeof getSelectedWork>> = [];

  try {
    [posts, projects] = await Promise.all([getAllPosts(), getSelectedWork()]);
  } catch {
    // fall through with empty arrays — static entries still render
  }

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...workEntries,
    ...blogEntries,
  ];
}
