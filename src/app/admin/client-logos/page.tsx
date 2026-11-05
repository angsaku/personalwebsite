import Link from "next/link";
import { Plus } from "lucide-react";
import { getClientLogosAdmin } from "@/lib/client-logos";
import ClientLogoRow from "./_components/ClientLogoRow";

export default async function AdminClientLogosPage() {
  const logos = await getClientLogosAdmin();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Logos</h1>
          <p className="text-xs text-gray-500 mt-1">{logos.length} total</p>
        </div>
        <Link
          href="/admin/client-logos/new"
          className="flex items-center gap-2 bg-[#E5212E] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors"
        >
          <Plus size={15} />
          New Logo
        </Link>
      </div>

      <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wider">Logo</p>
          <p className="col-span-6 text-xs text-gray-600 uppercase tracking-wider">Name</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wider">Sort</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wider text-right">Actions</p>
        </div>

        {logos.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-gray-500">No client logos yet.</p>
            <Link
              href="/admin/client-logos/new"
              className="mt-3 inline-block text-xs text-[#E5212E] hover:underline"
            >
              Add your first logo →
            </Link>
          </div>
        ) : (
          logos.map((l) => <ClientLogoRow key={l.id} logo={l} />)
        )}
      </div>
    </div>
  );
}
