"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createWorkflowService, updateWorkflowService } from "@/app/admin/actions";

const MiniEditor = lazy(() => import("@/app/admin/work/_components/MiniEditor"));

type WService = { id: string; service_name: string; content: string; sort_order: number };

export default function ServiceApproachForm({ service }: { service?: WService }) {
  const isEdit = !!service;
  const [content, setContent] = useState(service?.content ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("content", content);
      const result = isEdit ? await updateWorkflowService(service.id, formData) : await createWorkflowService(formData);
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

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/workflow/services" className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold text-white">{isEdit ? "Edit Service Approach" : "New Service Approach"}</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Service Name *</label>
              <input name="service_name" defaultValue={service?.service_name} required className={inputCls} placeholder="Mobile & Web Design" />
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input name="sort_order" type="number" defaultValue={service?.sort_order ?? 0} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Approach Content (rich text) *</label>
            <Suspense fallback={<div className="h-32 bg-[#020618] rounded-xl border border-white/[0.08] animate-pulse" />}>
              <MiniEditor value={content} onChange={setContent} placeholder="Describe your approach for this service…" />
            </Suspense>
          </div>
        </section>
        {error && <p className="text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 rounded-xl px-4 py-3">{error}</p>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="bg-[#E5212E] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50">
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create"}
          </button>
          <Link href="/admin/workflow/services" className="text-sm text-gray-500 hover:text-white transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
