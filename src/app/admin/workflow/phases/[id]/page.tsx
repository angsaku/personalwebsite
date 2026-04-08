import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import PhaseForm from "../_components/PhaseForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditPhasePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("workflow_phases").select("*").eq("id", id).single();
  if (!data) notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = data as any;
  return <PhaseForm phase={{ id: r.id, number: r.number, title: r.title, description: r.description ?? "", content: r.content ?? "", sort_order: r.sort_order ?? 0 }} />;
}
