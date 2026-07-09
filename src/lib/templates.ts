import { getSupabase } from "./supabase";

export type Template = {
  id: string;
  title: string;
  description: string;
  platform: string;
  thumbnailUrl: string | null;
  templateUrl: string;
  price: string;
  tags: string[];
  published: boolean;
  sortOrder: number;
};

type Row = {
  id: string;
  title: string;
  description: string;
  platform: string;
  thumbnail_url: string | null;
  template_url: string;
  price: string;
  tags: string[];
  published: boolean;
  sort_order: number;
};

function toTemplate(row: Row): Template {
  return {
    id: row.id,
    title: row.title ?? "",
    description: row.description ?? "",
    platform: row.platform ?? "",
    thumbnailUrl: row.thumbnail_url ?? null,
    templateUrl: row.template_url ?? "",
    price: row.price ?? "Free",
    tags: row.tags ?? [],
    published: row.published,
    sortOrder: row.sort_order ?? 0,
  };
}

export async function getAllTemplates(): Promise<Template[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return (data as Row[]).map(toTemplate);
}

export async function getAllTemplatesAdmin(): Promise<Template[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return (data as Row[]).map(toTemplate);
}

export async function getTemplateById(id: string): Promise<Template | undefined> {
  const supabase = getSupabase();
  if (!supabase) return undefined;

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return undefined;
  return toTemplate(data as Row);
}
