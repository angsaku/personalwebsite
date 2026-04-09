"use client";

import { useState } from "react";
import { upsertHeroContent } from "@/app/admin/actions";

type HeroRow = {
  short_description: string;
  years_experience: string;
  projects_delivered: string;
  happy_clients: string;
  og_image_url: string | null;
};

export default function HeroForm({ hero }: { hero: HeroRow | null }) {
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
      const result = await upsertHeroContent(formData);
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
        <h2 className="text-sm font-semibold text-white mb-2">Headline & Description</h2>

        <div>
          <label className={labelCls}>Short Description *</label>
          <textarea
            name="short_description"
            defaultValue={hero?.short_description ?? ""}
            required
            rows={3}
            className={`${inputCls} resize-none`}
            placeholder="I design digital to tangible solutions that are intuitive, intentional, and built to last."
          />
        </div>
      </section>

      <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white mb-2">Stats</h2>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Years of Experience</label>
            <input
              name="years_experience"
              defaultValue={hero?.years_experience ?? ""}
              className={inputCls}
              placeholder="6+"
            />
          </div>
          <div>
            <label className={labelCls}>Projects Delivered</label>
            <input
              name="projects_delivered"
              defaultValue={hero?.projects_delivered ?? ""}
              className={inputCls}
              placeholder="12+"
            />
          </div>
          <div>
            <label className={labelCls}>Happy Clients</label>
            <input
              name="happy_clients"
              defaultValue={hero?.happy_clients ?? ""}
              className={inputCls}
              placeholder="7+"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white mb-2">OG Image</h2>
        <div>
          <label className={labelCls}>OG Image URL (optional)</label>
          <input
            name="og_image_url"
            defaultValue={hero?.og_image_url ?? ""}
            className={inputCls}
            placeholder="https://..."
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
