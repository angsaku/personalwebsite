export const revalidate = 0;

import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase-server";
import PhaseRow from "./_components/PhaseRow";

export default async function WorkflowPhasesPage() {
  const supabase = await createSupabaseServer();
  const { data: phases } = await supabase.from("workflow_phases").select("id, number, title, description").order("sort_order", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/workflow" className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Workflow Phases</h1>
          <p className="text-sm text-gray-500 mt-1">{phases?.length ?? 0} phases</p>
        </div>
        <Link href="/admin/workflow/phases/new" className="flex items-center gap-2 bg-[#E5212E] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors">
          <Plus size={15} /> New Phase
        </Link>
      </div>
      <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide">#</p>
          <p className="col-span-4 text-xs text-gray-600 uppercase tracking-wide">Title</p>
          <p className="col-span-5 text-xs text-gray-600 uppercase tracking-wide">Subtitle</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wide text-right">Actions</p>
        </div>
        {phases && phases.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (phases as any[]).map((p) => <PhaseRow key={p.id} phase={p} />)
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-600 text-sm">No phases yet.</p>
            <Link href="/admin/workflow/phases/new" className="text-[#E5212E] text-sm mt-2 inline-block hover:underline">Add your first phase →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
