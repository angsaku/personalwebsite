"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createBeyondWork, updateBeyondWork } from "@/app/admin/actions";
import { ICON_MAP, ICON_OPTIONS } from "@/lib/icon-map";

type Item = { id: string; icon: string; title: string; description: string; sort_order: number };

const inputCls = "w-full bg-[#020618] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50";
const labelCls = "block text-xs text-gray-500 tracking-wide mb-1.5";

export default function BeyondWorkForm({ item }: { item?: Item }) {
  const isEdit = !!item;
  const [selectedIcon, setSelectedIcon] = useState(item?.icon ?? "Coffee");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const SelectedIconComponent = ICON_MAP[selectedIcon];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("icon", selectedIcon);
    const result = isEdit
      ? await updateBeyondWork(item.id, formData)
      : await createBeyondWork(formData);
    if (result?.error) { setError(result.error); setSaving(false); }
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/beyond-work" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">{isEdit ? "Edit Item" : "New Item"}</h1>
          <p className="text-xs text-gray-600 mt-0.5">Beyond Work</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Icon picker */}
        <div>
          <label className={labelCls}>Icon</label>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center flex-shrink-0">
              {SelectedIconComponent && <SelectedIconComponent size={18} className="text-[#E5212E]" />}
            </div>
            <span className="text-sm text-white">{selectedIcon}</span>
          </div>
          <div className="grid grid-cols-6 gap-2 p-3 bg-[#020618] border border-white/10 rounded-xl max-h-48 overflow-y-auto">
            {ICON_OPTIONS.map((name) => {
              const IconComp = ICON_MAP[name];
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => setSelectedIcon(name)}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${selectedIcon === name ? "bg-[#E5212E]/20 border border-[#E5212E]/40" : "hover:bg-white/[0.06] border border-transparent"}`}
                >
                  <IconComp size={16} className={selectedIcon === name ? "text-[#E5212E]" : "text-gray-500"} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className={labelCls}>Title</label>
          <input name="title" defaultValue={item?.title} required className={inputCls} placeholder="e.g. Badminton" />
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Short Description</label>
          <textarea name="description" defaultValue={item?.description} required rows={2} className={inputCls + " resize-none"} placeholder="A short sentence about this hobby..." />
        </div>

        {/* Sort order */}
        <div>
          <label className={labelCls}>Sort Order</label>
          <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} className={inputCls} />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#E5212E] text-white text-sm font-medium rounded-xl hover:bg-[#c41a25] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Item"}
          </button>
          <Link href="/admin/beyond-work" className="px-6 py-2.5 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:border-white/30 hover:text-white transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
