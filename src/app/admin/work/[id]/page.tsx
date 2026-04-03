import { notFound } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase-server";
import WorkForm from "../_components/WorkForm";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

type WorkRow = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[] | null;
  year: string;
  thumbnail_url: string | null;
  cover_url: string | null;
  case_study_url: string | null;
  intro: string;
  challenge: string;
  outcome: string;
  published: boolean;
  sort_order: number | null;
  tools: string[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  process: any[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metrics: any[] | null;
  gallery_images: string[] | null;
};

export default async function EditWorkPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServer();

  const { data } = await supabase
    .from("selected_work")
    .select("*")
    .eq("id", id)
    .single();

  const project = data as WorkRow | null;
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
        process: project.process ?? [],
        metrics: project.metrics ?? [],
        gallery_images: project.gallery_images ?? [],
      }}
    />
  );
}
