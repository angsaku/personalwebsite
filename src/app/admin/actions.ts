"use server";

import { createSupabaseServer } from "@/lib/supabase-server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/* ── Auth ──────────────────────────────────────── */

export async function logout() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ── Blog Posts ─────────────────────────────────── */

export async function createPost(formData: FormData) {
  const supabase = createSupabaseAdmin();

  const slug = formData.get("slug") as string;
  const { error } = await supabase.from("blog_posts").insert({
    slug,
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
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = createSupabaseAdmin();

  const slug = formData.get("slug") as string;
  const { error } = await supabase
    .from("blog_posts")
    .update({
      slug,
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
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const supabase = createSupabaseAdmin();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function togglePublish(id: string, published: boolean) {
  const supabase = createSupabaseAdmin();
  await supabase.from("blog_posts").update({ published: !published }).eq("id", id);
}

/* ── Selected Work ──────────────────────────────── */

export async function createWork(formData: FormData) {
  const supabase = createSupabaseAdmin();

  const process = JSON.parse((formData.get("process") as string) || "[]");
  const metrics = JSON.parse((formData.get("metrics") as string) || "[]");
  const tags = (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean);
  const tools = (formData.get("tools") as string).split(",").map((t) => t.trim()).filter(Boolean);
  const gallery_images = JSON.parse((formData.get("gallery_images") as string) || "[]");

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
    gallery_images,
  });

  if (error) return { error: error.message };
  redirect("/admin/work");
}

export async function updateWork(id: string, formData: FormData) {
  const supabase = createSupabaseAdmin();

  const process = JSON.parse((formData.get("process") as string) || "[]");
  const metrics = JSON.parse((formData.get("metrics") as string) || "[]");
  const tags = (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean);
  const tools = (formData.get("tools") as string).split(",").map((t) => t.trim()).filter(Boolean);
  const gallery_images = JSON.parse((formData.get("gallery_images") as string) || "[]");

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
      gallery_images,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  redirect("/admin/work");
}

export async function deleteWork(id: string) {
  const supabase = createSupabaseAdmin();
  await supabase.from("selected_work").delete().eq("id", id);
  redirect("/admin/work");
}

export async function toggleWorkPublish(id: string, published: boolean) {
  const supabase = createSupabaseAdmin();
  await supabase.from("selected_work").update({ published: !published }).eq("id", id);
}

/* ── Beyond Work ─────────────────────────────────── */

export async function createBeyondWork(formData: FormData) {
  const supabase = createSupabaseAdmin();

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
  const supabase = createSupabaseAdmin();

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
  const supabase = createSupabaseAdmin();
  await supabase.from("beyond_work").delete().eq("id", id);
  redirect("/admin/beyond-work");
}

/* ── Instagram Reels ─────────────────────────────── */

export async function createReel(formData: FormData) {
  const supabase = createSupabaseAdmin();

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
  const supabase = createSupabaseAdmin();

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
  const supabase = createSupabaseAdmin();
  await supabase.from("instagram_reels").delete().eq("id", id);
  redirect("/admin/reels");
}

/* ── Communities ─────────────────────────────────── */

export async function createCommunity(formData: FormData) {
  const supabase = createSupabaseAdmin();

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
  const supabase = createSupabaseAdmin();

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
  const supabase = createSupabaseAdmin();
  await supabase.from("communities").delete().eq("id", id);
  redirect("/admin/communities");
}

/* ── Experience ──────────────────────────────────── */

export async function createExperience(formData: FormData) {
  const supabase = createSupabaseAdmin();
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
    is_current: formData.get("is_current") === "true",
  });

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = createSupabaseAdmin();
  const highlights = ((formData.get("highlights") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { data, error, count } = await supabase
    .from("experiences")
    .update({
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      period: formData.get("period") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      highlights,
      sort_order: Number(formData.get("sort_order") || 0),
      is_current: formData.get("is_current") === "true",
    })
    .eq("id", id)
    .select();

  if (error) return { error: error.message };
  if (!data || data.length === 0) return { error: `No row matched id="${id}".` };
  revalidatePath("/");
  redirect("/admin/experience");

}

export async function deleteExperience(id: string) {
  const supabase = createSupabaseAdmin();
  await supabase.from("experiences").delete().eq("id", id);
  revalidatePath("/");
  redirect("/admin/experience");
}

/* ── Services ────────────────────────────────────── */

export async function createService(formData: FormData) {
  const supabase = createSupabaseAdmin();
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",").map((t) => t.trim()).filter(Boolean);

  const { error } = await supabase.from("services").insert({
    number: formData.get("number") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    tags,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const supabase = createSupabaseAdmin();
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",").map((t) => t.trim()).filter(Boolean);

  const { error } = await supabase
    .from("services")
    .update({
      number: formData.get("number") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tags,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  const supabase = createSupabaseAdmin();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/");
  redirect("/admin/services");
}

/* ── Visual Explorations ─────────────────────────── */

export async function createVisualExploration(formData: FormData) {
  const supabase = createSupabaseAdmin();

  const { error } = await supabase.from("visual_explorations").insert({
    title: formData.get("title") as string,
    image_url: formData.get("image_url") as string,
    source_url: (formData.get("source_url") as string) || null,
    sort_order: Number(formData.get("sort_order") || 0),
    published: formData.get("published") === "true",
  });

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/visual-explorations");
}

export async function updateVisualExploration(id: string, formData: FormData) {
  const supabase = createSupabaseAdmin();

  const { error } = await supabase
    .from("visual_explorations")
    .update({
      title: formData.get("title") as string,
      image_url: formData.get("image_url") as string,
      source_url: (formData.get("source_url") as string) || null,
      sort_order: Number(formData.get("sort_order") || 0),
      published: formData.get("published") === "true",
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/visual-explorations");
}

export async function deleteVisualExploration(id: string) {
  const supabase = createSupabaseAdmin();
  await supabase.from("visual_explorations").delete().eq("id", id);
  revalidatePath("/");
  redirect("/admin/visual-explorations");
}

/* ── Hero Content ─────────────────────────────────── */

export async function upsertHeroContent(formData: FormData) {
  const supabase = createSupabaseAdmin();
  const { data: existing } = await supabase.from("hero_content").select("id").limit(1).single();

  const payload = {
    short_description: formData.get("short_description") as string,
    years_experience: formData.get("years_experience") as string,
    projects_delivered: formData.get("projects_delivered") as string,
    happy_clients: formData.get("happy_clients") as string,
    og_image_url: (formData.get("og_image_url") as string) || null,
  };

  const { error } = existing
    ? await supabase.from("hero_content").update(payload).eq("id", existing.id)
    : await supabase.from("hero_content").insert(payload);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

/* ── About Content ─────────────────────────────────── */

export async function upsertAboutContent(formData: FormData) {
  const supabase = createSupabaseAdmin();
  const { data: existing } = await supabase.from("about_content").select("id").limit(1).single();

  const skills = (formData.get("skills") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    heading: formData.get("heading") as string,
    bio_paragraph_1: formData.get("bio_paragraph_1") as string,
    bio_paragraph_2: formData.get("bio_paragraph_2") as string,
    skills,
    photo_url: (formData.get("photo_url") as string) || null,
    resume_url: (formData.get("resume_url") as string) || null,
  };

  const { error } = existing
    ? await supabase.from("about_content").update(payload).eq("id", existing.id)
    : await supabase.from("about_content").insert(payload);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

/* ── CTA Content ─────────────────────────────────── */

export async function upsertCtaContent(formData: FormData) {
  const supabase = createSupabaseAdmin();
  const { data: existing } = await supabase.from("cta_content").select("id").limit(1).single();

  const payload = {
    label: formData.get("label") as string,
    headline: formData.get("headline") as string,
    body_text: formData.get("body_text") as string,
    email: formData.get("email") as string,
    whatsapp_number: formData.get("whatsapp_number") as string,
    linkedin_url: formData.get("linkedin_url") as string,
    instagram_url: formData.get("instagram_url") as string,
    behance_url: formData.get("behance_url") as string,
    dribbble_url: formData.get("dribbble_url") as string,
    github_url: formData.get("github_url") as string,
    twitter_url: formData.get("twitter_url") as string,
    youtube_url: formData.get("youtube_url") as string,
    tiktok_url: formData.get("tiktok_url") as string,
  };

  const { error } = existing
    ? await supabase.from("cta_content").update(payload).eq("id", existing.id)
    : await supabase.from("cta_content").insert(payload);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

/* ── Templates ───────────────────────────────────── */

export async function createTemplate(formData: FormData) {
  const supabase = createSupabaseAdmin();
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error } = await supabase.from("templates").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    platform: formData.get("platform") as string,
    thumbnail_url: (formData.get("thumbnail_url") as string) || null,
    template_url: formData.get("template_url") as string,
    price: (formData.get("price") as string) || "Free",
    tags,
    published: formData.get("published") === "true",
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/templates");
}

export async function updateTemplate(id: string, formData: FormData) {
  const supabase = createSupabaseAdmin();
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("templates")
    .update({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      platform: formData.get("platform") as string,
      thumbnail_url: (formData.get("thumbnail_url") as string) || null,
      template_url: formData.get("template_url") as string,
      price: (formData.get("price") as string) || "Free",
      tags,
      published: formData.get("published") === "true",
      sort_order: Number(formData.get("sort_order") || 0),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/admin/templates");
}

export async function deleteTemplate(id: string) {
  const supabase = createSupabaseAdmin();
  await supabase.from("templates").delete().eq("id", id);
  revalidatePath("/");
  redirect("/admin/templates");
}

export async function toggleTemplatePublish(id: string, published: boolean) {
  const supabase = createSupabaseAdmin();
  await supabase.from("templates").update({ published: !published }).eq("id", id);
}

/* ── Inquiry Form ─────────────────────────────────── */

export async function submitInquiry(formData: FormData) {
  const name         = (formData.get("name") as string).trim();
  const email        = (formData.get("email") as string).trim();
  const project_type = (formData.get("project_type") as string) || null;
  const budget       = (formData.get("budget") as string) || null;
  const message      = (formData.get("message") as string).trim();

  if (!name || !email || !message) return { error: "Name, email and message are required." };

  const supabase = createSupabaseAdmin();
  const { error: dbError } = await supabase.from("inquiries").insert({
    name, email, project_type, budget, message,
  });
  if (dbError) return { error: dbError.message };

  return { success: true };
}
