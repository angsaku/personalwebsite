import { getSupabase } from "./supabase";

export interface AboutContent {
  heading: string;
  bioParagraph1: string;
  bioParagraph2: string;
  skills: string[];
  photoUrl: string | null;
}

const fallback: AboutContent = {
  heading: "Designing with purpose",
  bioParagraph1:
    "I'm a Product Designer with 5+ years of experience creating digital products that are both beautiful and functional. I thrive at the intersection of design and strategy — turning complex problems into intuitive experiences.",
  bioParagraph2:
    "Based in Jakarta, Indonesia, I've worked with startups, agencies, and established companies across fintech, e-commerce, and SaaS industries. Add your own bio here.",
  skills: [
    "Product Strategy",
    "UX Research",
    "Interaction Design",
    "Design Systems",
    "Prototyping",
    "Usability Testing",
    "Visual Design",
    "Figma",
  ],
  photoUrl: null,
};

export async function getAboutContent(): Promise<AboutContent> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("about_content")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  return {
    heading: row.heading,
    bioParagraph1: row.bio_paragraph_1,
    bioParagraph2: row.bio_paragraph_2,
    skills: row.skills,
    photoUrl: row.photo_url,
  };
}
