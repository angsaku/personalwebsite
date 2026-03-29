"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCommunity } from "@/app/admin/actions";

type Item = {
  id: string;
  name: string;
  role: string;
  period: string;
  sort_order: number;
};

export default function CommunityRow({ item }: { item: Item }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
      <p className="col-span-4 text-sm text-white font-medium truncate">{item.name}</p>
      <p className="col-span-3 text-xs text-gray-400 truncate">{item.role}</p>
      <p className="col-span-3 text-xs text-gray-500 truncate">{item.period}</p>
      <p className="col-span-1 text-xs text-gray-600 text-center">{item.sort_order}</p>
      <div className="col-span-1 flex items-center justify-end gap-2">
        <Link
          href={`/admin/communities/${item.id}`}
          className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Pencil size={13} />
        </Link>
        <form action={deleteCommunity.bind(null, item.id)}>
          <button
            type="submit"
            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            onClick={(e) => {
              if (!confirm("Delete this community?")) e.preventDefault();
            }}
          >
            <Trash2 size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
