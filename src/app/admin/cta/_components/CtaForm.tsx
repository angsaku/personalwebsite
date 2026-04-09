"use client";

import { useState } from "react";
import { upsertCtaContent } from "@/app/admin/actions";

type CtaRow = {
  label: string;
  headline: string;
  body_text: string;
  email: string;
  whatsapp_number: string;
  linkedin_url: string;
  instagram_url: string;
  behance_url: string;
  dribbble_url: string;
  github_url: string;
  twitter_url: string;
  youtube_url: string;
  tiktok_url: string;
};

export default function CtaForm({ cta }: { cta: CtaRow | null }) {
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
      const result = await upsertCtaContent(formData);
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
        <h2 className="text-sm font-semibold text-white mb-2">Copy</h2>

        <div>
          <label className={labelCls}>Label (small text above headline)</label>
          <input
            name="label"
            defaultValue={cta?.label ?? ""}
            className={inputCls}
            placeholder="Let's Collaborate"
          />
        </div>

        <div>
          <label className={labelCls}>Headline *</label>
          <input
            name="headline"
            defaultValue={cta?.headline ?? ""}
            required
            className={inputCls}
            placeholder="Have a project in mind?"
          />
        </div>

        <div>
          <label className={labelCls}>Body Text *</label>
          <textarea
            name="body_text"
            defaultValue={cta?.body_text ?? ""}
            required
            rows={3}
            className={`${inputCls} resize-none`}
            placeholder="I'm always open to discussing new projects…"
          />
        </div>
      </section>

      <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white mb-2">Contact</h2>

        <div>
          <label className={labelCls}>Email *</label>
          <input
            name="email"
            type="email"
            defaultValue={cta?.email ?? ""}
            required
            className={inputCls}
            placeholder="hello@yourname.com"
          />
        </div>

        <div>
          <label className={labelCls}>WhatsApp Number *</label>
          <input
            name="whatsapp_number"
            defaultValue={cta?.whatsapp_number ?? ""}
            required
            className={inputCls}
            placeholder="628xxxxxxxxxx?text=Hi+Satriya,+I'd+love+to+discuss+a+project."
          />
          <p className="text-xs text-gray-600 mt-1.5">
            Format: <code className="text-gray-500">628xxxxxxxxxx?text=Your+pre-filled+message</code>
          </p>
        </div>
      </section>

      <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white mb-2">Social Links</h2>
        <p className="text-xs text-gray-600 -mt-2">Leave a field blank to hide that social link from the CTA section.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>LinkedIn URL</label>
            <input
              name="linkedin_url"
              defaultValue={cta?.linkedin_url ?? ""}
              className={inputCls}
              placeholder="https://linkedin.com/in/yourname"
            />
          </div>
          <div>
            <label className={labelCls}>Instagram URL</label>
            <input
              name="instagram_url"
              defaultValue={cta?.instagram_url ?? ""}
              className={inputCls}
              placeholder="https://instagram.com/yourname"
            />
          </div>
          <div>
            <label className={labelCls}>GitHub URL</label>
            <input
              name="github_url"
              defaultValue={cta?.github_url ?? ""}
              className={inputCls}
              placeholder="https://github.com/yourname"
            />
          </div>
          <div>
            <label className={labelCls}>Twitter / X URL</label>
            <input
              name="twitter_url"
              defaultValue={cta?.twitter_url ?? ""}
              className={inputCls}
              placeholder="https://twitter.com/yourname"
            />
          </div>
          <div>
            <label className={labelCls}>YouTube URL</label>
            <input
              name="youtube_url"
              defaultValue={cta?.youtube_url ?? ""}
              className={inputCls}
              placeholder="https://youtube.com/@yourname"
            />
          </div>
          <div>
            <label className={labelCls}>TikTok URL</label>
            <input
              name="tiktok_url"
              defaultValue={cta?.tiktok_url ?? ""}
              className={inputCls}
              placeholder="https://tiktok.com/@yourname"
            />
          </div>
          <div>
            <label className={labelCls}>Behance URL</label>
            <input
              name="behance_url"
              defaultValue={cta?.behance_url ?? ""}
              className={inputCls}
              placeholder="https://behance.net/yourname"
            />
          </div>
          <div>
            <label className={labelCls}>Dribbble URL</label>
            <input
              name="dribbble_url"
              defaultValue={cta?.dribbble_url ?? ""}
              className={inputCls}
              placeholder="https://dribbble.com/yourname"
            />
          </div>
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
