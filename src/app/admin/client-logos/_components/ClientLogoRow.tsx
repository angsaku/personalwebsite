"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteClientLogo } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Logo = {
  id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
};

export default function ClientLogoRow({ logo }: { logo: Logo }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${logo.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteClientLogo(logo.id);
    router.refresh();
  }

  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
      <div className="col-span-2">
        <div className="w-20 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center overflow-hidden">
          {logo.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo.logo_url} alt={logo.name} className="max-w-full max-h-full object-contain" />
          ) : (
            <span className="text-[10px] text-gray-600">none</span>
          )}
        </div>
      </div>

      <p className="col-span-6 text-sm text-white font-medium line-clamp-1">{logo.name}</p>
      <p className="col-span-2 text-xs text-gray-500">{logo.sort_order}</p>

      <div className="col-span-2 flex items-center justify-end gap-2">
        <Link
          href={`/admin/client-logos/${logo.id}`}
          className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          <Pencil size={14} />
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 text-gray-500 hover:text-[#E5212E] hover:bg-[#E5212E]/10 rounded-lg transition-colors disabled:opacity-40"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
