"use client";

import Link from "next/link";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { deleteTemplate, toggleTemplatePublish } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Template = {
  id: string;
  title: string;
  platform: string;
  price: string;
  published: boolean;
  sort_order: number;
};

export default function TemplateRow({ template }: { template: Template }) {
  const router = useRouter();
  const [published, setPublished] = useState(template.published);
  const [deleting, setDeleting] = useState(false);

  async function handleToggle() {
    setPublished(!published);
    await toggleTemplatePublish(template.id, published);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Delete "${template.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteTemplate(template.id);
    router.refresh();
  }

  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
      <div className="col-span-5">
        <p className="text-sm text-white font-medium line-clamp-1">{template.title}</p>
        <p className="text-xs text-gray-600 mt-0.5">Sort: {template.sort_order}</p>
      </div>

      <div className="col-span-2">
        <span className="text-xs text-[#E5212E] bg-[#E5212E]/10 px-2 py-0.5 rounded-full">
          {template.platform}
        </span>
      </div>

      <p className="col-span-2 text-xs text-gray-500">{template.price}</p>

      <div className="col-span-1">
        <button
          onClick={handleToggle}
          className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
            published ? "bg-[#E5212E]" : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
              published ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="col-span-2 flex items-center justify-end gap-2">
        <Link
          href={`/admin/templates/${template.id}`}
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
