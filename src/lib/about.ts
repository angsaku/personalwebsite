import { getSupabase } from "./supabase";

export interface AboutContent {
  heading: string;
  bioParagraph1: string;
  bioParagraph2: string;
  skills: string[];
  photoUrl: string | null;
  resumeUrl: string | null;
}

function toDirectImageUrl(url: string | null): string | null {
  if (!url) return null;
  // https://drive.google.com/file/d/FILE_ID/view…  →  uc?export=view&id=FILE_ID
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/);
  if (fileMatch) return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  // Already a direct id query-param form
  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  return url;
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
  resumeUrl: null,
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
    photoUrl: toDirectImageUrl(row.photo_url),
    resumeUrl: row.resume_url ?? null,
  };
}
