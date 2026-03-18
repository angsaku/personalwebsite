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

  return {
    shortDescription: data.short_description,
    yearsExperience: data.years_experience,
    projectsDelivered: data.projects_delivered,
    happyClients: data.happy_clients,
  };
}
