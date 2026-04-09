import { getSupabase } from "./supabase";

export interface CtaContent {
  label: string;
  headline: string;
  body_text: string;
  email: string;
  whatsapp_number: string;
  linkedin_url: string;
  instagram_url: string;
  behance_url: string;
  dribbble_url: string;
  github_url: string;
  twitter_url: string;
  youtube_url: string;
  tiktok_url: string;
}

const fallback: CtaContent = {
  label: "Let's Collaborate",
  headline: "Have a project in mind?",
  body_text:
    "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's build something great together.",
  email: "hello@yourname.com",
  whatsapp_number: "628xxxxxxxxxx",
  linkedin_url: "https://linkedin.com/in/yourname",
  instagram_url: "https://instagram.com/yourname",
  behance_url: "https://behance.net/yourname",
  dribbble_url: "https://dribbble.com/yourname",
  github_url: "",
  twitter_url: "",
  youtube_url: "",
  tiktok_url: "",
};

export async function getCtaContent(): Promise<CtaContent> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("cta_content")
    .select("*")
    .single();

  if (error || !data) {
    console.error("[cta] Supabase error:", error?.message);
    return fallback;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  return {
    label: row.label ?? fallback.label,
    headline: row.headline ?? fallback.headline,
    body_text: row.body_text ?? fallback.body_text,
    email: row.email ?? fallback.email,
    whatsapp_number: row.whatsapp_number ?? fallback.whatsapp_number,
    linkedin_url: row.linkedin_url ?? fallback.linkedin_url,
    instagram_url: row.instagram_url ?? fallback.instagram_url,
    behance_url: row.behance_url ?? fallback.behance_url,
    dribbble_url: row.dribbble_url ?? fallback.dribbble_url,
    github_url: row.github_url ?? fallback.github_url,
    twitter_url: row.twitter_url ?? fallback.twitter_url,
    youtube_url: row.youtube_url ?? fallback.youtube_url,
    tiktok_url: row.tiktok_url ?? fallback.tiktok_url,
  };
}
