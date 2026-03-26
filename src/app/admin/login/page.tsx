"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#020618] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E5212E] rounded-full blur-[200px] opacity-[0.04] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-[#0a1128] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E5212E]/10 border border-[#E5212E]/20 mb-4">
              <Shield size={20} className="text-[#E5212E]" />
            </div>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-1">
              Admin Portal
            </p>
            <h1 className="text-xl font-bold text-white">Sign in to continue</h1>
            <p className="text-xs text-gray-600 mt-1">Restricted access — authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#E5212E]/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 pr-11 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#E5212E]/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 rounded-lg px-4 py-2.5">
                <Lock size={12} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E5212E] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-700 mt-6">
          Protected by Supabase Auth
        </p>
      </div>
    </div>
  );
}
