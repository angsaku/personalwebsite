import { getSupabase } from "./supabase";

export interface ClientLogo {
  id: string;
  name: string;
  logo_url: string | null;
}

const fallback: ClientLogo[] = [
  { id: "1", name: "Client Alpha", logo_url: null },
  { id: "2", name: "Brand Studio", logo_url: null },
  { id: "3", name: "Tech Ventures", logo_url: null },
  { id: "4", name: "Design Co.", logo_url: null },
  { id: "5", name: "Creative Labs", logo_url: null },
  { id: "6", name: "Startup Hub", logo_url: null },
  { id: "7", name: "MediaGroup", logo_url: null },
  { id: "8", name: "FinTech Corp", logo_url: null },
];

function toDirectImageUrl(url: string | null): string | null {
  if (!url) return null;
  // https://drive.google.com/file/d/FILE_ID/view...
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/);
  if (fileMatch) return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w128`;
  // https://drive.google.com/open?id=FILE_ID or uc?id=FILE_ID
  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w128`;
  return url;
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const supabase = getSupabase();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("client_logos")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[client_logos] Supabase error:", error.message);
    return fallback;
  }
  if (!data || data.length === 0) return fallback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]).map((row) => ({
    id: row.id,
    name: row.name,
    logo_url: toDirectImageUrl(row.logo_url),
  }));
}
