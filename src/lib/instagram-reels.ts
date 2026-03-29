import { getSupabase } from "./supabase";

export interface ReelItem {
  id: string;
  url: string;
  thumbnail_url: string | null;
  instagram_url: string | null;
  sort_order: number;
}

const fallback: ReelItem[] = [];

export async function getInstagramReels(): Promise<ReelItem[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("instagram_reels")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    url: row.url,
    thumbnail_url: row.thumbnail_url ?? null,
    instagram_url: row.instagram_url ?? null,
    sort_order: row.sort_order,
  }));
}
