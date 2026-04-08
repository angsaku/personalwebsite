"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createService, updateService } from "@/app/admin/actions";

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  sort_order: number;
};

export default function ServiceForm({ service }: { service?: Service }) {
  const isEdit = !!service;
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const formData = new FormData(e.currentTarget);
      const result = isEdit
        ? await updateService(service.id, formData)
        : await createService(formData);
      if (result?.error) {
        setError(result.error);
        setSaving(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes("NEXT_REDIRECT")) {
        setError(msg);
        setSaving(false);
      }
    }
  }

  const inputCls =
    "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/services"
          className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? "Edit Service" : "New Service"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-2">Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Number *</label>
              <input
                name="number"
                defaultValue={service?.number}
                required
                className={inputCls}
                placeholder="01"
              />
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input
                name="sort_order"
                type="number"
                defaultValue={service?.sort_order ?? 0}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Title *</label>
            <input
              name="title"
              defaultValue={service?.title}
              required
              className={inputCls}
              placeholder="Mobile & Web Design"
            />
          </div>

          <div>
            <label className={labelCls}>Description *</label>
            <textarea
              name="description"
              defaultValue={service?.description}
              required
              rows={4}
              className={`${inputCls} resize-none`}
              placeholder="Describe what this service covers…"
            />
          </div>

          <div>
            <label className={labelCls}>Tags (comma-separated)</label>
            <input
              name="tags"
              defaultValue={service?.tags?.join(", ")}
              className={inputCls}
              placeholder="iOS, Android, Figma, Prototyping"
            />
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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Service"}
          </button>
          <Link
            href="/admin/services"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
