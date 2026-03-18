import { getSupabase } from "./supabase";

export interface CtaContent {
  email: string;
  whatsapp_number: string;
  linkedin_url: string;
  instagram_url: string;
  behance_url: string;
  dribbble_url: string;
}

const fallback: CtaContent = {
  email: "hello@yourname.com",
  whatsapp_number: "628xxxxxxxxxx",
  linkedin_url: "https://linkedin.com/in/yourname",
  instagram_url: "https://instagram.com/yourname",
  behance_url: "https://behance.net/yourname",
  dribbble_url: "https://dribbble.com/yourname",
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
    email: row.email ?? fallback.email,
    whatsapp_number: row.whatsapp_number ?? fallback.whatsapp_number,
    linkedin_url: row.linkedin_url ?? fallback.linkedin_url,
    instagram_url: row.instagram_url ?? fallback.instagram_url,
    behance_url: row.behance_url ?? fallback.behance_url,
    dribbble_url: row.dribbble_url ?? fallback.dribbble_url,
  };
}
