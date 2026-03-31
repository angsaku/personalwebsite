"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createExperience, updateExperience } from "@/app/admin/actions";

const MiniEditor = lazy(() => import("@/app/admin/work/_components/MiniEditor"));

type Exp = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  sort_order: number;
};

export default function ExperienceForm({ experience }: { experience?: Exp }) {
  const isEdit = !!experience;
  const [description, setDescription] = useState(experience?.description ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("description", description);
      const result = isEdit
        ? await updateExperience(experience.id, formData)
        : await createExperience(formData);
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
          href="/admin/experience"
          className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold text-white">
          {isEdit ? "Edit Experience" : "New Experience"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-2">Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Role *</label>
              <input
                name="role"
                defaultValue={experience?.role}
                required
                className={inputCls}
                placeholder="Senior Product Designer"
              />
            </div>
            <div>
              <label className={labelCls}>Company *</label>
              <input
                name="company"
                defaultValue={experience?.company}
                required
                className={inputCls}
                placeholder="Company Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Period *</label>
              <input
                name="period"
                defaultValue={experience?.period}
                required
                className={inputCls}
                placeholder="2023 — Present"
              />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input
                name="location"
                defaultValue={experience?.location}
                className={inputCls}
                placeholder="Jakarta, ID"
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <Suspense
              fallback={
                <div className="h-32 bg-[#020618] rounded-xl border border-white/[0.08] animate-pulse" />
              }
            >
              <MiniEditor
                value={description}
                onChange={setDescription}
                placeholder="Describe your responsibilities and achievements…"
              />
            </Suspense>
          </div>

          <div>
            <label className={labelCls}>Highlights (comma-separated)</label>
            <input
              name="highlights"
              defaultValue={experience?.highlights?.join(", ")}
              className={inputCls}
              placeholder="Design System, Mobile App, B2B Platform"
            />
          </div>

          <div>
            <label className={labelCls}>Sort Order</label>
            <input
              name="sort_order"
              type="number"
              defaultValue={experience?.sort_order ?? 0}
              className={`${inputCls} w-32`}
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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Experience"}
          </button>
          <Link
            href="/admin/experience"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
