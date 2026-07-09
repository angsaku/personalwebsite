import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllTemplatesAdmin } from "@/lib/templates";
import TemplateRow from "./_components/TemplateRow";

export default async function AdminTemplatesPage() {
  const templates = await getAllTemplatesAdmin();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Templates</h1>
          <p className="text-xs text-gray-500 mt-1">{templates.length} total</p>
        </div>
        <Link
          href="/admin/templates/new"
          className="flex items-center gap-2 bg-[#E5212E] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors"
        >
          <Plus size={15} />
          New Template
        </Link>
      </div>

      <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
          <p className="col-span-5 text-xs text-gray-600 uppercase tracking-wider">Title</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wider">Platform</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wider">Price</p>
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wider">Live</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wider text-right">Actions</p>
        </div>

        {templates.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-gray-500">No templates yet.</p>
            <Link
              href="/admin/templates/new"
              className="mt-3 inline-block text-xs text-[#E5212E] hover:underline"
            >
              Create your first template →
            </Link>
          </div>
        ) : (
          templates.map((t) => (
            <TemplateRow
              key={t.id}
              template={{
                id: t.id,
                title: t.title,
                platform: t.platform,
                price: t.price,
                published: t.published,
                sort_order: t.sortOrder,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
