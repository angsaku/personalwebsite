import { getSupabase } from "./supabase";

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const fallback: Service[] = [
  {
    id: "1",
    number: "01",
    title: "Mobile & Web Design",
    description:
      "End-to-end design for mobile apps (iOS & Android) and web products — from wireframes and user flows to polished, developer-ready interfaces that balance aesthetics with usability.",
    tags: ["iOS", "Android", "Responsive Web", "Figma", "Prototyping"],
  },
  {
    id: "2",
    number: "02",
    title: "Visual Design",
    description:
      "Crafting strong visual identities, marketing assets, and UI systems that communicate brand values clearly. Every pixel is intentional — from typography and color to motion and iconography.",
    tags: ["Brand Identity", "UI Systems", "Typography", "Illustration", "Motion"],
  },
  {
    id: "3",
    number: "03",
    title: "Project & Product Management",
    description:
      "Bridging design and delivery. I help teams prioritize the right features, define product roadmaps, and keep cross-functional collaboration moving — from discovery through launch.",
    tags: ["Roadmapping", "Agile", "Stakeholder Alignment", "Scoping", "Delivery"],
  },
  {
    id: "4",
    number: "04",
    title: "Service Design",
    description:
      "Designing the full experience behind a service — mapping customer journeys, identifying friction across touchpoints, and aligning people, processes, and tools to deliver seamless end-to-end experiences.",
    tags: ["Service Blueprint", "Journey Mapping", "CX Strategy", "Touchpoint Design"],
  },
];

export async function getServices(): Promise<Service[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    number: row.number,
    title: row.title,
    description: row.description,
    tags: row.tags ?? [],
  }));
}
