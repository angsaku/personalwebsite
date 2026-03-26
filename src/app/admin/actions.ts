"use server";

import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

/* ── Auth ──────────────────────────────────────── */

export async function logout() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ── Blog Posts ─────────────────────────────────── */

export async function createPost(formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase.from("posts").insert({
    slug: formData.get("slug") as string,
    tag: formData.get("tag") as string,
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    read_time: formData.get("read_time") as string,
    date: formData.get("date") as string,
    cover_url: (formData.get("cover_url") as string) || null,
    content: (formData.get("content") as string) || null,
    published: formData.get("published") === "true",
    // keep structured fields empty for blog posts
    intro: "",
    challenge: "",
    outcome: "",
    process: [],
    metrics: [],
    tools: [],
  });

  if (error) return { error: error.message };
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from("posts")
    .update({
      slug: formData.get("slug") as string,
      tag: formData.get("tag") as string,
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      read_time: formData.get("read_time") as string,
      date: formData.get("date") as string,
      cover_url: (formData.get("cover_url") as string) || null,
      content: (formData.get("content") as string) || null,
      published: formData.get("published") === "true",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const supabase = await createSupabaseServer();
  await supabase.from("posts").delete().eq("id", id);
  redirect("/admin/posts");
}

export async function togglePublish(id: string, published: boolean) {
  const supabase = await createSupabaseServer();
  await supabase.from("posts").update({ published: !published }).eq("id", id);
}

/* ── Selected Work ──────────────────────────────── */

export async function createWork(formData: FormData) {
  const supabase = await createSupabaseServer();

  const process = JSON.parse((formData.get("process") as string) || "[]");
  const metrics = JSON.parse((formData.get("metrics") as string) || "[]");
  const tags = (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean);
  const tools = (formData.get("tools") as string).split(",").map((t) => t.trim()).filter(Boolean);

  const { error } = await supabase.from("selected_work").insert({
    slug: formData.get("slug") as string,
    number: formData.get("number") as string,
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    year: formData.get("year") as string,
    thumbnail_url: (formData.get("thumbnail_url") as string) || null,
    cover_url: (formData.get("cover_url") as string) || null,
    case_study_url: (formData.get("case_study_url") as string) || null,
    intro: formData.get("intro") as string,
    challenge: formData.get("challenge") as string,
    outcome: formData.get("outcome") as string,
    published: formData.get("published") === "true",
    sort_order: Number(formData.get("sort_order") || 0),
    tags,
    tools,
    process,
    metrics,
  });

  if (error) return { error: error.message };
  redirect("/admin/work");
}

export async function updateWork(id: string, formData: FormData) {
  const supabase = await createSupabaseServer();

  const process = JSON.parse((formData.get("process") as string) || "[]");
  const metrics = JSON.parse((formData.get("metrics") as string) || "[]");
  const tags = (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean);
  const tools = (formData.get("tools") as string).split(",").map((t) => t.trim()).filter(Boolean);

  const { error } = await supabase
    .from("selected_work")
    .update({
      slug: formData.get("slug") as string,
      number: formData.get("number") as string,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      year: formData.get("year") as string,
      thumbnail_url: (formData.get("thumbnail_url") as string) || null,
      cover_url: (formData.get("cover_url") as string) || null,
      case_study_url: (formData.get("case_study_url") as string) || null,
      intro: formData.get("intro") as string,
      challenge: formData.get("challenge") as string,
      outcome: formData.get("outcome") as string,
      published: formData.get("published") === "true",
      sort_order: Number(formData.get("sort_order") || 0),
      tags,
      tools,
      process,
      metrics,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  redirect("/admin/work");
}

export async function deleteWork(id: string) {
  const supabase = await createSupabaseServer();
  await supabase.from("selected_work").delete().eq("id", id);
  redirect("/admin/work");
}

export async function toggleWorkPublish(id: string, published: boolean) {
  const supabase = await createSupabaseServer();
  await supabase.from("selected_work").update({ published: !published }).eq("id", id);
}
