"use client";

import { useState } from "react";
import { submitInquiry } from "@/app/admin/actions";

const PROJECT_TYPES = ["Product Design", "Brand Identity", "UX Research", "Design System", "Other"];
const BUDGETS = ["< $1,000", "$1,000 – $5,000", "$5,000 – $10,000", "$10,000+", "Let's discuss"];

export default function InquiryForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const result = await submitInquiry(new FormData(e.currentTarget));
    if (result?.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }
  }

  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-[0.12em] uppercase";

  if (status === "success") {
    return (
      <div className="text-center py-12 px-6 border border-[#E5212E]/20 rounded-2xl bg-[#E5212E]/5">
        <p className="text-[#E5212E] text-xs tracking-[0.2em] uppercase mb-3">★ Received</p>
        <p className="text-white font-semibold text-lg mb-2">Thanks for reaching out.</p>
        <p className="text-gray-500 text-sm">I&apos;ll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Name *</label>
          <input name="name" required placeholder="Your name" className={inputCls} data-gramm="false" suppressHydrationWarning />
        </div>
        <div>
          <label className={labelCls}>Email *</label>
          <input name="email" type="email" required placeholder="your@email.com" className={inputCls} data-gramm="false" suppressHydrationWarning />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Project Type</label>
          <select name="project_type" className={`${inputCls} cursor-pointer`} defaultValue={defaultService ?? ""}>
            <option value="" disabled>Select type</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Budget</label>
          <select name="budget" className={`${inputCls} cursor-pointer`} defaultValue="">
            <option value="" disabled>Select range</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Message *</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell me about your project…"
          className={`${inputCls} resize-none`}
          data-gramm="false"
          suppressHydrationWarning
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#E5212E] text-white py-3.5 rounded-xl text-sm font-medium hover:bg-[#c41c28] transition-colors disabled:opacity-50 tracking-wide"
      >
        {status === "loading" ? "Sending…" : "Send Inquiry →"}
      </button>
    </form>
  );
}
