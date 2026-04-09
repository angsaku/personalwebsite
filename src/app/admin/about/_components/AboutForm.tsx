"use client";

import { useState } from "react";
import { upsertAboutContent } from "@/app/admin/actions";

type AboutRow = {
  heading: string;
  bio_paragraph_1: string;
  bio_paragraph_2: string;
  skills: string[];
  photo_url: string | null;
  resume_url: string | null;
};

export default function AboutForm({ about }: { about: AboutRow | null }) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await upsertAboutContent(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white mb-2">Content</h2>

        <div>
          <label className={labelCls}>Heading *</label>
          <input
            name="heading"
            defaultValue={about?.heading ?? ""}
            required
            className={inputCls}
            placeholder="Designing with purpose"
          />
        </div>

        <div>
          <label className={labelCls}>Bio Paragraph 1 *</label>
          <textarea
            name="bio_paragraph_1"
            defaultValue={about?.bio_paragraph_1 ?? ""}
            required
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="I'm a Product Designer with 6+ years of experience…"
          />
        </div>

        <div>
          <label className={labelCls}>Bio Paragraph 2 *</label>
          <textarea
            name="bio_paragraph_2"
            defaultValue={about?.bio_paragraph_2 ?? ""}
            required
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="Based in Jakarta, Indonesia…"
          />
        </div>

        <div>
          <label className={labelCls}>Skills (comma-separated)</label>
          <input
            name="skills"
            defaultValue={about?.skills?.join(", ") ?? ""}
            className={inputCls}
            placeholder="Mobile App, Web App, SaaS Design, UX Research, Design System, Brand Identity"
          />
          <p className="text-xs text-gray-600 mt-1.5">Tip: keep it to 6 core skills for best visual impact.</p>
        </div>
      </section>

      <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white mb-2">Media & Links</h2>

        <div>
          <label className={labelCls}>Photo URL</label>
          <input
            name="photo_url"
            defaultValue={about?.photo_url ?? ""}
            className={inputCls}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelCls}>Resume URL</label>
          <input
            name="resume_url"
            defaultValue={about?.resume_url ?? ""}
            className={inputCls}
            placeholder="https://drive.google.com/..."
          />
        </div>
      </section>

      {error && (
        <p className="text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      {saved && (
        <p className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3">
          Saved successfully. The homepage has been revalidated.
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-[#E5212E] text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
