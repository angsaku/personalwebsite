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

  const { error } = await supabase.from("blog_posts").insert({
    slug: formData.get("slug") as string,
    tag: formData.get("tag") as string,
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    read_time: formData.get("read_time") as string,
    date: formData.get("date") as string,
    cover_url: (formData.get("cover_url") as string) || null,
    content: (formData.get("content") as string) || null,
    published: formData.get("published") === "true",
  });

  if (error) return { error: error.message };
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from("blog_posts")
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
  await supabase.from("blog_posts").delete().eq("id", id);
  redirect("/admin/posts");
}

export async function togglePublish(id: string, published: boolean) {
  const supabase = await createSupabaseServer();
  await supabase.from("blog_posts").update({ published: !published }).eq("id", id);
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

/* ── Beyond Work ─────────────────────────────────── */

export async function createBeyondWork(formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase.from("beyond_work").insert({
    icon: formData.get("icon") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };
  redirect("/admin/beyond-work");
}

export async function updateBeyondWork(id: string, formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from("beyond_work")
    .update({
      icon: formData.get("icon") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  redirect("/admin/beyond-work");
}

export async function deleteBeyondWork(id: string) {
  const supabase = await createSupabaseServer();
  await supabase.from("beyond_work").delete().eq("id", id);
  redirect("/admin/beyond-work");
}

/* ── Instagram Reels ─────────────────────────────── */

export async function createReel(formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase.from("instagram_reels").insert({
    url: formData.get("url") as string,
    thumbnail_url: (formData.get("thumbnail_url") as string) || null,
    instagram_url: (formData.get("instagram_url") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };
  redirect("/admin/reels");
}

export async function updateReel(id: string, formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from("instagram_reels")
    .update({
      url: formData.get("url") as string,
      thumbnail_url: (formData.get("thumbnail_url") as string) || null,
      instagram_url: (formData.get("instagram_url") as string) || null,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  redirect("/admin/reels");
}

export async function deleteReel(id: string) {
  const supabase = await createSupabaseServer();
  await supabase.from("instagram_reels").delete().eq("id", id);
  redirect("/admin/reels");
}

/* ── Communities ─────────────────────────────────── */

export async function createCommunity(formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase.from("communities").insert({
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    period: formData.get("period") as string,
    description: formData.get("description") as string,
    logo_url: (formData.get("logo_url") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };
  redirect("/admin/communities");
}

export async function updateCommunity(id: string, formData: FormData) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from("communities")
    .update({
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
      logo_url: (formData.get("logo_url") as string) || null,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  redirect("/admin/communities");
}

export async function deleteCommunity(id: string) {
  const supabase = await createSupabaseServer();
  await supabase.from("communities").delete().eq("id", id);
  redirect("/admin/communities");
}

/* ── Experience ──────────────────────────────────── */

export async function createExperience(formData: FormData) {
  const supabase = await createSupabaseServer();
  const highlights = ((formData.get("highlights") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error } = await supabase.from("experiences").insert({
    company: formData.get("company") as string,
    role: formData.get("role") as string,
    period: formData.get("period") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    highlights,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createSupabaseServer();
  const highlights = ((formData.get("highlights") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("experiences")
    .update({
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      period: formData.get("period") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      highlights,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  const supabase = await createSupabaseServer();
  await supabase.from("experiences").delete().eq("id", id);
  redirect("/admin/experience");
}
