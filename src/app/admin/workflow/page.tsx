export const revalidate = 0;

import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase-server";
import WorkflowConfigForm from "./_components/WorkflowConfigForm";
import PrincipleInlineForm from "./_components/PrincipleInlineForm";
import PrinciplesList from "./_components/PrinciplesList";

export default async function WorkflowAdminPage() {
  const supabase = await createSupabaseServer();
  const [{ data: configRow }, { data: principles }] = await Promise.all([
    supabase.from("workflow_config").select("*").single(),
    supabase.from("workflow_principles").select("*").order("sort_order", { ascending: true }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = configRow as any;

  return (
    <div className="p-8 space-y-10 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Workflow & Approach</h1>
        <p className="text-sm text-gray-500 mt-1">Manage the content on your /approach page.</p>
      </div>

      {/* Page config */}
      <section>
        <p className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">Page Config</p>
        <WorkflowConfigForm config={config} />
      </section>

      {/* Principles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase">Mindset Principles</p>
          <p className="text-xs text-gray-600">{principles?.length ?? 0} entries</p>
        </div>

        <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden mb-4">
          <PrinciplesList principles={(principles ?? []) as { id: string; title: string; description: string }[]} />
        </div>

        <PrincipleInlineForm />
      </section>
    </div>
  );
}
