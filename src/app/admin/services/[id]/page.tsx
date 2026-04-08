import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import ServiceForm from "../_components/ServiceForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("services").select("*").eq("id", id).single();
  if (!data) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;
  const service = {
    id: row.id,
    number: row.number,
    title: row.title,
    description: row.description,
    tags: row.tags ?? [],
    sort_order: row.sort_order ?? 0,
  };

  return <ServiceForm service={service} />;
}
