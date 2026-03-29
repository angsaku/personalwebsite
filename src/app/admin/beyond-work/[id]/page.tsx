import { createSupabaseServer } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import BeyondWorkForm from "../_components/BeyondWorkForm";

export default async function EditBeyondWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("beyond_work").select("*").eq("id", id).single();
  if (!data) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  return (
    <BeyondWorkForm
      item={{
        id: row.id,
        icon: row.icon,
        title: row.title,
        description: row.description,
        sort_order: row.sort_order,
      }}
    />
  );
}
