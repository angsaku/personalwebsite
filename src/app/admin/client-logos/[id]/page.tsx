import { notFound } from "next/navigation";
import { getClientLogoById } from "@/lib/client-logos";
import ClientLogoForm from "../_components/ClientLogoForm";

export default async function EditClientLogoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getClientLogoById(id);
  if (!item) notFound();

  return <ClientLogoForm item={item} />;
}
