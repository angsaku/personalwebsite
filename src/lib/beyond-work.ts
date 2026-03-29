import { getSupabase } from "./supabase";

export interface BeyondWorkItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

const fallback: BeyondWorkItem[] = [
  { id: "1", icon: "Coffee",         title: "Coffee",       description: "Exploring specialty coffee — from pour-over to espresso.", sort_order: 0 },
  { id: "2", icon: "Music",          title: "Music",        description: "Listening to lo-fi, jazz, and indie playlists while designing.", sort_order: 1 },
  { id: "3", icon: "Video",          title: "Videography",  description: "Shooting and editing short films and creative reels.", sort_order: 2 },
  { id: "4", icon: "Plane",          title: "Traveling",    description: "Finding inspiration from different cultures and cities.", sort_order: 3 },
  { id: "5", icon: "Shuttlecock",    title: "Badminton",    description: "Playing badminton regularly to stay active and sharp.", sort_order: 4 },
  { id: "6", icon: "Code",           title: "Side Projects",description: "Building small tools and experimenting with new ideas.", sort_order: 5 },
  { id: "7", icon: "UtensilsCrossed",title: "Culinary",     description: "Trying new restaurants and experimenting in the kitchen.", sort_order: 6 },
];

export async function getBeyondWork(): Promise<BeyondWorkItem[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("beyond_work")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    icon: row.icon,
    title: row.title,
    description: row.description,
    sort_order: row.sort_order,
  }));
}
