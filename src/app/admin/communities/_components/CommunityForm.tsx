"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCommunity, updateCommunity } from "@/app/admin/actions";

type Item = {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  logo_url: string | null;
  sort_order: number;
};

const inputCls =
  "w-full bg-[#020618] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50";
const labelCls = "block text-xs text-gray-500 tracking-wide mb-1.5";

export default function CommunityForm({ item }: { item?: Item }) {
  const isEdit = !!item;
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const result = isEdit
      ? await updateCommunity(item.id, formData)
      : await createCommunity(formData);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/communities"
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">
            {isEdit ? "Edit Community" : "New Community"}
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">Communities</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className={labelCls}>Community Name</label>
          <input
            name="name"
            defaultValue={item?.name}
            required
            className={inputCls}
            placeholder="e.g. UXID Jakarta"
          />
        </div>

        {/* Role */}
        <div>
          <label className={labelCls}>Role</label>
          <input
            name="role"
            defaultValue={item?.role}
            className={inputCls}
            placeholder="e.g. Chapter Lead"
          />
        </div>

        {/* Period */}
        <div>
          <label className={labelCls}>Period</label>
          <input
            name="period"
            defaultValue={item?.period}
            className={inputCls}
            placeholder="e.g. 2023 – Present"
          />
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            name="description"
            defaultValue={item?.description}
            rows={3}
            className={inputCls + " resize-none"}
            placeholder="Brief description of your involvement..."
          />
        </div>

        {/* Logo URL (optional) */}
        <div>
          <label className={labelCls}>Logo URL (optional)</label>
          <input
            name="logo_url"
            defaultValue={item?.logo_url ?? ""}
            className={inputCls}
            placeholder="https://..."
          />
        </div>

        {/* Sort order */}
        <div>
          <label className={labelCls}>Sort Order</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={item?.sort_order ?? 0}
            className={inputCls}
          />
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
          <Link
            href="/admin/communities"
            className="px-6 py-2.5 border border-white/10 text-gray-400 text-sm font-medium rounded-xl hover:border-white/30 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
