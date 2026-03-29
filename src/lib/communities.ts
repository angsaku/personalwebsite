import { getSupabase } from "./supabase";

export interface CommunityItem {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  logo_url: string | null;
  sort_order: number;
}

const fallback: CommunityItem[] = [
  {
    id: "1",
    name: "UXID Jakarta",
    role: "Chapter Lead",
    period: "2023 – Present",
    description:
      "Leading a community of UX practitioners across Jakarta, organizing events and knowledge-sharing sessions.",
    logo_url: null,
    sort_order: 1,
  },
  {
    id: "2",
    name: "Figma Community ID",
    role: "Speaker & Contributor",
    period: "2021 – 2023",
    description:
      "Sharing design system knowledge and Figma best practices through talks and open-source contributions.",
    logo_url: null,
    sort_order: 2,
  },
  {
    id: "3",
    name: "Product Design Indonesia",
    role: "Member",
    period: "2020 – 2021",
    description:
      "Active member contributing to design discussions, critiques, and collaborative learning sessions.",
    logo_url: null,
    sort_order: 3,
  },
];

export async function getCommunities(): Promise<CommunityItem[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    period: row.period,
    description: row.description,
    logo_url: row.logo_url,
    sort_order: row.sort_order,
  }));
}
