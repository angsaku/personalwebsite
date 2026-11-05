"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClientLogo, updateClientLogo } from "@/app/admin/actions";
import ImageUpload from "@/app/admin/_components/ImageUpload";

type Item = {
  id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
};

const inputCls =
  "w-full bg-[#020618] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50";
const labelCls = "block text-xs text-gray-500 tracking-wide mb-1.5";

export default function ClientLogoForm({ item }: { item?: Item }) {
  const isEdit = !!item;
  const [logoUrl, setLogoUrl] = useState<string | null>(item?.logo_url ?? null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("logo_url", logoUrl ?? "");
    const result = isEdit
      ? await updateClientLogo(item.id, formData)
      : await createClientLogo(formData);
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/client-logos"
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">
            {isEdit ? "Edit Client Logo" : "New Client Logo"}
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">Client Logos</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Client Name *</label>
          <input
            name="name"
            defaultValue={item?.name}
            required
            className={inputCls}
            placeholder="Acme Inc."
          />
          <p className="text-[11px] text-gray-700 mt-1.5">
            Shown as a text wordmark if no logo is uploaded.
          </p>
        </div>

        <ImageUpload
          value={logoUrl}
          onChange={setLogoUrl}
          folder="client-logos"
          label="Logo"
        />

        <div>
          <label className={labelCls}>Sort Order</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={item?.sort_order ?? 0}
            className={inputCls}
          />
        </div>

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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Logo"}
          </button>
          <Link
            href="/admin/client-logos"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
