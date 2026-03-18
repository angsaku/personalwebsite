import { getSupabase } from "./supabase";
import { posts as staticPosts } from "./posts";
import type { Post } from "./posts";

type SupabasePost = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  read_time: string;
  date: string;
  intro: string;
  challenge: string;
  process: { step: string; description: string }[];
  outcome: string;
  metrics: { value: string; label: string }[];
  tools: string[];
  cover_url: string | null;
  published: boolean;
};

function toPost(row: SupabasePost): Post {
  return {
    slug: row.slug,
    tag: row.tag ?? "",
    title: row.title ?? "",
    excerpt: row.excerpt ?? "",
    readTime: row.read_time ?? "",
    date: row.date ?? "",
    intro: row.intro ?? "",
    challenge: row.challenge ?? "",
    process: Array.isArray(row.process) ? row.process : [],
    outcome: row.outcome ?? "",
    metrics: Array.isArray(row.metrics) ? row.metrics : [],
    tools: Array.isArray(row.tools) ? row.tools : [],
    coverUrl: row.cover_url ?? undefined,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = getSupabase();
  if (!supabase) return staticPosts;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return staticPosts;
  return (data as SupabasePost[]).map(toPost);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const supabase = getSupabase();
  if (!supabase) return staticPosts.find((p) => p.slug === slug);

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return staticPosts.find((p) => p.slug === slug);
  return toPost(data as SupabasePost);
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return staticPosts.map((p) => p.slug);

  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);

  if (error || !data) return staticPosts.map((p) => p.slug);
  return (data as { slug: string }[]).map((row) => row.slug);
}
