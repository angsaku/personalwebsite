import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import ExperienceForm from "../_components/ExperienceForm";

export const revalidate = 0;

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;

  return (
    <ExperienceForm
      experience={{
        id: row.id,
        company: row.company,
        role: row.role,
        period: row.period,
        location: row.location ?? "",
        description: row.description ?? "",
        highlights: row.highlights ?? [],
        sort_order: row.sort_order ?? 0,
      }}
    />
  );
}
