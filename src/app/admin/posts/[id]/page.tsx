import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import PostForm from "../_components/PostForm";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

type BlogPostRow = {
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

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServer();

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  const post = data as BlogPostRow | null;
  if (!post) notFound();

  return (
    <PostForm
      post={{
        id: post.id,
        slug: post.slug,
        tag: post.tag ?? "",
        title: post.title,
        excerpt: post.excerpt ?? "",
        read_time: post.read_time ?? "",
        date: post.date ?? "",
        cover_url: post.cover_url ?? null,
        published: post.published,
        content: post.content ?? "",
      }}
    />
  );
}
