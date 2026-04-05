"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MediaUpload from "@/app/admin/_components/MediaUpload";
import { createVisualExploration, updateVisualExploration } from "@/app/admin/actions";

type Item = {
  id: string;
  title: string;
  image_url: string;
  source_url: string | null;
  sort_order: number;
  published: boolean;
};

const inputCls = "w-full bg-[#020618] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50";
const labelCls = "block text-xs text-gray-500 tracking-wide mb-1.5";

export default function VisualForm({ item }: { item?: Item }) {
  const isEdit = !!item;
  const [imageUrl, setImageUrl] = useState<string | null>(item?.image_url ?? null);
  const [published, setPublished] = useState(item?.published ?? true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageUrl) { setError("Please upload an image."); return; }
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl);
    formData.set("published", String(published));
    const result = isEdit
      ? await updateVisualExploration(item.id, formData)
      : await createVisualExploration(formData);
    if (result?.error) { setError(result.error); setSaving(false); }
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/visual-explorations" className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">{isEdit ? "Edit Item" : "New Item"}</h1>
          <p className="text-xs text-gray-600 mt-0.5">Visual Exploration</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image upload */}
        <MediaUpload
          value={imageUrl}
          onChange={setImageUrl}
          folder="visual-explorations"
          label="Image or Video"
        />

        {/* Title */}
        <div>
          <label className={labelCls}>Title</label>
          <input name="title" defaultValue={item?.title} required className={inputCls} placeholder="e.g. Brand Concept" />
        </div>

        {/* Source URL */}
        <div>
          <label className={labelCls}>Source Link <span className="text-gray-700">(optional)</span></label>
          <input name="source_url" defaultValue={item?.source_url ?? ""} className={inputCls} placeholder="https://dribbble.com/..." />
        </div>

        {/* Sort order */}
        <div>
          <label className={labelCls}>Sort Order</label>
          <input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} className={inputCls} />
        </div>

        {/* Published toggle */}
        <div className="flex items-center justify-between py-3 px-4 bg-[#020618] border border-white/10 rounded-xl">
          <div>
            <p className="text-sm text-white">Published</p>
            <p className="text-xs text-gray-600 mt-0.5">Show on the public site</p>
          </div>
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative w-10 h-6 rounded-full transition-colors ${published ? "bg-[#E5212E]" : "bg-white/10"}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${published ? "left-5" : "left-1"}`} />
          </button>
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
          <Link href="/admin/visual-explorations" className="px-6 py-2.5 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:border-white/30 hover:text-white transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
