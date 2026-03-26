import { getSupabase } from "./supabase";

export type BlogPost = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  coverUrl: string | null;
  content: string | null;
  published: boolean;
};

type Row = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  read_time: string;
  date: string;
  cover_url: string | null;
  content: string | null;
  published: boolean;
};

function toPost(row: Row): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    tag: row.tag ?? "",
    title: row.title ?? "",
    excerpt: row.excerpt ?? "",
    readTime: row.read_time ?? "",
    date: row.date ?? "",
    coverUrl: row.cover_url ?? null,
    content: row.content ?? null,
    published: row.published,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as Row[]).map(toPost);
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const supabase = getSupabase();
  if (!supabase) return undefined;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return undefined;
  return toPost(data as Row);
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  if (error || !data) return [];
  return (data as { slug: string }[]).map((row) => row.slug);
}
