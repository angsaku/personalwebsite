import { createSupabaseServer } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CommunityForm from "../_components/CommunityForm";

export default async function EditCommunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("communities").select("*").eq("id", id).single();
  if (!data) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  return (
    <CommunityForm
      item={{
        id: row.id,
        name: row.name,
        role: row.role,
        period: row.period,
        description: row.description,
        logo_url: row.logo_url,
        sort_order: row.sort_order,
      }}
    />
  );
}
