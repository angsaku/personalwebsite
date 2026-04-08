import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import PrincipleEditForm from "./_components/PrincipleEditForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditPrinciplePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data } = await supabase.from("workflow_principles").select("*").eq("id", id).single();
  if (!data) notFound();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PrincipleEditForm principle={data as any} />;
}
