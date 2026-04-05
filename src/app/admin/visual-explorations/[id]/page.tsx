export const revalidate = 0;

import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import VisualForm from "../_components/VisualForm";

export default async function EditVisualPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data: item } = await supabase
    .from("visual_explorations")
    .select("id, title, image_url, source_url, sort_order, published")
    .eq("id", id)
    .single();

  if (!item) notFound();

  return <VisualForm item={item} />;
}
