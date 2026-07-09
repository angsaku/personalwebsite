"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createTemplate, updateTemplate } from "@/app/admin/actions";
import ImageUpload from "@/app/admin/_components/ImageUpload";

type Template = {
  id: string;
  title: string;
  description: string;
  platform: string;
  thumbnail_url: string | null;
  template_url: string;
  price: string;
  tags: string[];
  published: boolean;
  sort_order: number;
};

const PLATFORMS = ["Notion", "Figma", "Framer", "Webflow", "Canva", "Other"];

export default function TemplateForm({ template }: { template?: Template }) {
  const isEdit = !!template;
  const [published, setPublished] = useState(template?.published ?? true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    template?.thumbnail_url ?? null
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("published", String(published));
    formData.set("thumbnail_url", thumbnailUrl ?? "");

    const result = isEdit
      ? await updateTemplate(template.id, formData)
      : await createTemplate(formData);

    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  const inputCls =
    "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/templates"
          className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? "Edit Template" : "New Template"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-2">Template Info</h2>

          <div>
            <label className={labelCls}>Title *</label>
            <input
              name="title"
              defaultValue={template?.title}
              required
              className={inputCls}
              placeholder="Notion Life OS Template"
            />
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea
              name="description"
              defaultValue={template?.description}
              rows={3}
              className={inputCls}
              placeholder="A short description shown on the card…"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Platform *</label>
              <select
                name="platform"
                defaultValue={template?.platform ?? "Notion"}
                required
                className={inputCls}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Price</label>
              <input
                name="price"
                defaultValue={template?.price ?? "Free"}
                className={inputCls}
                placeholder='Free / $9 / Pay what you want'
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Template URL *</label>
            <input
              name="template_url"
              type="url"
              defaultValue={template?.template_url}
              required
              className={inputCls}
              placeholder="https://notion.so/..."
            />
          </div>

          <div>
            <label className={labelCls}>Tags (comma-separated)</label>
            <input
              name="tags"
              defaultValue={template?.tags?.join(", ")}
              className={inputCls}
              placeholder="Productivity, Life OS, Second Brain"
            />
          </div>

          <div>
            <label className={labelCls}>Sort Order</label>
            <input
              name="sort_order"
              type="number"
              defaultValue={template?.sort_order ?? 0}
              className={inputCls}
            />
          </div>

          <ImageUpload
            value={thumbnailUrl}
            onChange={setThumbnailUrl}
            folder="template-thumbnails"
            label="Thumbnail"
          />

          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm text-white font-medium">Published</p>
              <p className="text-xs text-gray-500">Visible on the live site</p>
            </div>
            <button
              type="button"
              onClick={() => setPublished(!published)}
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
        </section>

        {error && (
          <p className="text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#E5212E] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Template"}
          </button>
          <Link
            href="/admin/templates"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
