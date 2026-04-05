export const revalidate = 0;

import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase-server";
import VisualRow from "./_components/VisualRow";

export default async function VisualExplorationsPage() {
  const supabase = await createSupabaseServer();
  const { data: items } = await supabase
    .from("visual_explorations")
    .select("id, title, image_url, source_url, sort_order, published")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Visual Explorations</h1>
          <p className="text-sm text-gray-500 mt-1">{items?.length ?? 0} items</p>
        </div>
        <Link
          href="/admin/visual-explorations/new"
          className="flex items-center gap-2 bg-[#E5212E] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors"
        >
          <Plus size={15} />
          New Item
        </Link>
      </div>

      <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide">Thumb</p>
          <p className="col-span-4 text-xs text-gray-600 uppercase tracking-wide">Title</p>
          <p className="col-span-4 text-xs text-gray-600 uppercase tracking-wide">Source</p>
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide text-center">Status</p>
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide text-center">Order</p>
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide text-right">Actions</p>
        </div>

        {items && items.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (items as any[]).map((item) => <VisualRow key={item.id} item={item} />)
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-600 text-sm">No items yet.</p>
            <Link href="/admin/visual-explorations/new" className="text-[#E5212E] text-sm mt-2 inline-block hover:underline">
              Add your first item →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
