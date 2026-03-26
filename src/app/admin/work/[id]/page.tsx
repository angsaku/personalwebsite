import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import WorkForm from "../_components/WorkForm";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditWorkPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServer();

  const { data: project } = await supabase
    .from("selected_work")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <WorkForm
      project={{
        id: project.id,
        slug: project.slug,
        number: project.number,
        title: project.title,
        category: project.category,
        description: project.description,
        tags: project.tags ?? [],
        year: project.year,
        thumbnail_url: project.thumbnail_url,
        cover_url: project.cover_url,
        case_study_url: project.case_study_url,
        intro: project.intro ?? "",
        challenge: project.challenge ?? "",
        outcome: project.outcome ?? "",
        published: project.published,
        sort_order: project.sort_order ?? 0,
        tools: project.tools ?? [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        process: (project.process as any[]) ?? [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metrics: (project.metrics as any[]) ?? [],
      }}
    />
  );
}
