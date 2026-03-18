import { getSupabase } from "./supabase";

export interface HeroContent {
  shortDescription: string;
  yearsExperience: string;
  projectsDelivered: string;
  happyClients: string;
}

const fallback: HeroContent = {
  shortDescription:
    "I'm Your Name — a Product Designer based in Jakarta, Indonesia. I design intuitive digital products that bridge business goals with human needs.",
  yearsExperience: "5+",
  projectsDelivered: "40+",
  happyClients: "20+",
};

export async function getHeroContent(): Promise<HeroContent> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  return {
    shortDescription: row.short_description,
    yearsExperience: row.years_experience,
    projectsDelivered: row.projects_delivered,
    happyClients: row.happy_clients,
  };
}
