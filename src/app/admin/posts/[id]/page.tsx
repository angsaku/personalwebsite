import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import PostForm from "../_components/PostForm";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServer();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

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
