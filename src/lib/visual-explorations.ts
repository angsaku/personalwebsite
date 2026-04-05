import { getSupabase } from "./supabase";

export interface VisualItem {
  id: string;
  title: string;
  imageUrl: string;
  sourceUrl: string | null;
  sortOrder: number;
}

export async function getVisualExplorations(): Promise<VisualItem[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("visual_explorations")
    .select("id, title, image_url, source_url, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    title: row.title,
    imageUrl: row.image_url,
    sourceUrl: row.source_url ?? null,
    sortOrder: row.sort_order,
  }));
}
