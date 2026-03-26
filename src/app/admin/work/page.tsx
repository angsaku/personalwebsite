import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase-server";
import WorkRow from "./_components/WorkRow";

export const revalidate = 0;

export default async function WorkPage() {
  const supabase = await createSupabaseServer();
  const { data: projects } = await supabase
    .from("selected_work")
    .select("id, slug, number, title, category, year, published")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Selected Work</h1>
          <p className="text-sm text-gray-500 mt-1">
            {projects?.length ?? 0} projects total
          </p>
        </div>
        <Link
          href="/admin/work/new"
          className="flex items-center gap-2 bg-[#E5212E] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors"
        >
          <Plus size={15} />
          New Project
        </Link>
      </div>

      <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide">#</p>
          <p className="col-span-5 text-xs text-gray-600 uppercase tracking-wide">Title</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wide">Category</p>
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide">Year</p>
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide">Status</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wide text-right">Actions</p>
        </div>

        {projects && projects.length > 0 ? (
          projects.map((project) => <WorkRow key={project.id} project={project} />)
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-600 text-sm">No projects yet.</p>
            <Link href="/admin/work/new" className="text-[#E5212E] text-sm mt-2 inline-block hover:underline">
              Add your first project →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
