export const revalidate = 0;

import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase-server";
import ServiceRow from "./_components/ServiceRow";

export default async function ServicesPage() {
  const supabase = await createSupabaseServer();
  const { data: services } = await supabase
    .from("services")
    .select("id, number, title, tags")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            {services?.length ?? 0} services total
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 bg-[#E5212E] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors"
        >
          <Plus size={15} />
          New Service
        </Link>
      </div>

      <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide">#</p>
          <p className="col-span-5 text-xs text-gray-600 uppercase tracking-wide">Title</p>
          <p className="col-span-4 text-xs text-gray-600 uppercase tracking-wide">Tags</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wide text-right">Actions</p>
        </div>

        {services && services.length > 0 ? (
          services.map((s) => <ServiceRow key={s.id} service={s} />)
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-600 text-sm">No services yet.</p>
            <Link
              href="/admin/services/new"
              className="text-[#E5212E] text-sm mt-2 inline-block hover:underline"
            >
              Add your first service →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
