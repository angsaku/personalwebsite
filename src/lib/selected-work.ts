import { getSupabase } from "./supabase";

export interface ProcessStep {
  step: string;
  description: string;
  image_url?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  thumbnailUrl: string | null;
  coverUrl: string | null;
  caseStudyUrl: string | null;
  intro: string;
  challenge: string;
  process: ProcessStep[];
  outcome: string;
  metrics: Metric[];
  tools: string[];
}

const fallback: Project[] = [
  {
    id: "1",
    slug: "project-title-one",
    number: "01",
    title: "Project Title One",
    category: "Mobile App · UX Research",
    description: "A brief description of the project — what problem it solves, who it's for, and what your role was.",
    tags: ["UX Design", "User Research", "Prototyping"],
    year: "2024",
    thumbnailUrl: null,
    coverUrl: null,
    caseStudyUrl: null,
    intro: "Replace with your project introduction.",
    challenge: "Replace with the challenge your team faced.",
    process: [
      { step: "Research", description: "Describe your research phase." },
      { step: "Design", description: "Describe your design process." },
    ],
    outcome: "Replace with the outcome and learnings.",
    metrics: [
      { value: "+40%", label: "Engagement" },
      { value: "2x", label: "Retention" },
    ],
    tools: ["Figma", "Maze", "Miro"],
  },
];

function toDirectImageUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Project {
  return {
    id: row.id,
    slug: row.slug,
    number: row.number,
    title: row.title,
    category: row.category,
    description: row.description,
    tags: row.tags,
    year: row.year,
    thumbnailUrl: toDirectImageUrl(row.thumbnail_url),
    coverUrl: toDirectImageUrl(row.cover_url),
    caseStudyUrl: row.case_study_url ?? null,
    intro: row.intro ?? "",
    challenge: row.challenge ?? "",
    process: (row.process as ProcessStep[]) ?? [],
    outcome: row.outcome ?? "",
    metrics: (row.metrics as Metric[]) ?? [],
    tools: row.tools ?? [],
  };
}

export async function getSelectedWork(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("selected_work")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;
  return data.map(mapRow);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const supabase = getSupabase();
  if (!supabase) return fallback.find((p) => p.slug === slug);

  const { data, error } = await supabase
    .from("selected_work")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return fallback.find((p) => p.slug === slug);
  return mapRow(data);
}

export async function getAllWorkSlugs(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback.map((p) => p.slug);

  const { data, error } = await supabase
    .from("selected_work")
    .select("slug")
    .eq("published", true);

  if (error || !data) return fallback.map((p) => p.slug);
  return data.map((r) => r.slug);
}
