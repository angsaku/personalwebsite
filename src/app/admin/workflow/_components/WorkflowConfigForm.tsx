"use client";

import { useState, lazy, Suspense } from "react";
import { upsertWorkflowConfig } from "@/app/admin/actions";

const MiniEditor = lazy(() => import("@/app/admin/work/_components/MiniEditor"));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WorkflowConfigForm({ config }: { config: any }) {
  const [engagementContent, setEngagementContent] = useState(config?.engagement_content ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("engagement_content", engagementContent);
      const result = await upsertWorkflowConfig(formData);
      if (result?.error) { setError(result.error); setSaving(false); return; }
      setSaved(true);
      setSaving(false);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setSaving(false);
    }
  }

  const inputCls = "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
      <div>
        <label className={labelCls}>Headline</label>
        <input name="headline" defaultValue={config?.headline ?? "How I work."} required className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Philosophy</label>
        <textarea name="philosophy" defaultValue={config?.philosophy ?? ""} rows={3} className={`${inputCls} resize-none`} />
      </div>
      <div>
        <label className={labelCls}>How to Work With Me (rich text)</label>
        <Suspense fallback={<div className="h-32 bg-[#020618] rounded-xl border border-white/[0.08] animate-pulse" />}>
          <MiniEditor value={engagementContent} onChange={setEngagementContent} placeholder="Describe your engagement models…" />
        </Suspense>
      </div>
      {error && <p className="text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 rounded-xl px-4 py-3">{error}</p>}
      <button type="submit" disabled={saving} className="bg-[#E5212E] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50">
        {saving ? "Saving…" : saved ? "Saved ✓" : "Save Config"}
      </button>
    </form>
  );
}
