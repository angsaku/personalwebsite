import { createSupabaseAdmin } from "@/lib/supabase-admin";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  project_type: string | null;
  budget: string | null;
  message: string;
  created_at: string;
}

export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data as Inquiry[];
}
