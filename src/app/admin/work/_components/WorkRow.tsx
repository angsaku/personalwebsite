"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteWork, toggleWorkPublish } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  published: boolean;
};

export default function WorkRow({ project }: { project: Project }) {
  const router = useRouter();
  const [published, setPublished] = useState(project.published);

  async function handleToggle() {
    setPublished(!published);
    await toggleWorkPublish(project.id, published);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    await deleteWork(project.id);
    router.refresh();
  }

  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
      <p className="col-span-1 text-xs text-[#E5212E]/60 font-mono">{project.number}</p>
      <div className="col-span-5">
        <p className="text-sm text-white font-medium line-clamp-1">{project.title}</p>
        <p className="text-xs text-gray-600 mt-0.5">/{project.slug}</p>
      </div>
      <p className="col-span-2 text-xs text-gray-500">{project.category}</p>
      <p className="col-span-1 text-xs text-gray-500">{project.year}</p>
      <div className="col-span-1">
        <button
          onClick={handleToggle}
          className={`w-10 h-5 rounded-full transition-colors relative ${published ? "bg-[#E5212E]" : "bg-white/10"}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${published ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2">
        <Link href={`/admin/work/${project.id}`} className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
          <Pencil size={14} />
        </Link>
        <button onClick={handleDelete} className="p-2 text-gray-500 hover:text-[#E5212E] hover:bg-[#E5212E]/10 rounded-lg transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
