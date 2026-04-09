export const revalidate = 0;

import { createSupabaseAdmin } from "@/lib/supabase-admin";
import CtaForm from "./_components/CtaForm";

export default async function CtaAdminPage() {
  const supabase = createSupabaseAdmin();
  const { data } = await supabase
    .from("cta_content")
    .select("*")
    .limit(1)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cta = data as any ?? null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">CTA & Contact Section</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit your email, WhatsApp number, and social links.
        </p>
      </div>
      <CtaForm cta={cta} />
    </div>
  );
}
