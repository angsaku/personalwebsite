"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createWorkflowPrinciple } from "@/app/admin/actions";

export default function PrincipleInlineForm() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const formData = new FormData(e.currentTarget);
      const result = await createWorkflowPrinciple(formData);
      if (result?.error) { setError(result.error); setSaving(false); }
    } catch (err: unknown) {
      if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setSaving(false);
    }
  }

  const inputCls = "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
        <Plus size={14} /> Add Principle
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
      <h3 className="text-sm font-semibold text-white">New Principle</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input name="title" required className={inputCls} placeholder="Research before pixels" />
        </div>
        <div>
          <label className={labelCls}>Sort Order</label>
          <input name="sort_order" type="number" defaultValue={0} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Description *</label>
        <textarea name="description" required rows={2} className={`${inputCls} resize-none`} placeholder="Short explanation…" />
      </div>
      {error && <p className="text-xs text-[#E5212E]">{error}</p>}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="bg-[#E5212E] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50">
          {saving ? "Saving…" : "Add"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
}
