import { getSupabase } from "./supabase";

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

const fallback: Experience[] = [
  {
    id: "1",
    company: "Company Name",
    role: "Senior Product Designer",
    period: "2023 — Present",
    location: "Jakarta, ID",
    description:
      "Lead the end-to-end design of core product features, manage design system, collaborate with cross-functional teams. Replace this with your actual responsibilities and achievements.",
    highlights: ["Design System", "Mobile App", "B2B Platform"],
  },
  {
    id: "2",
    company: "Previous Company",
    role: "Product Designer",
    period: "2021 — 2023",
    location: "Jakarta, ID",
    description:
      "Designed user-centered solutions for web and mobile platforms. Conducted UX research, created wireframes and prototypes. Replace with your actual description.",
    highlights: ["E-Commerce", "User Research", "Redesign"],
  },
  {
    id: "3",
    company: "Agency Name",
    role: "UI/UX Designer",
    period: "2019 — 2021",
    location: "Jakarta, ID",
    description:
      "Crafted visual designs and interaction patterns for various client projects across fintech, healthtech, and retail sectors. Replace with your actual experience.",
    highlights: ["Client Work", "FinTech", "Healthcare"],
  },
];

export async function getExperiences(): Promise<Experience[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    company: row.company,
    role: row.role,
    period: row.period,
    location: row.location,
    description: row.description,
    highlights: row.highlights,
  }));
}
