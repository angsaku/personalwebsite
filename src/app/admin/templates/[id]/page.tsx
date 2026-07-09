import { notFound } from "next/navigation";
import { getTemplateById } from "@/lib/templates";
import TemplateForm from "../_components/TemplateForm";

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = await getTemplateById(id);
  if (!template) notFound();

  return (
    <TemplateForm
      template={{
        id: template.id,
        title: template.title,
        description: template.description,
        platform: template.platform,
        thumbnail_url: template.thumbnailUrl,
        template_url: template.templateUrl,
        price: template.price,
        tags: template.tags,
        published: template.published,
        sort_order: template.sortOrder,
      }}
    />
  );
}
