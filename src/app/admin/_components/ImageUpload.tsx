"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "covers",
  label = "Cover Image",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const supabase = createSupabaseBrowser();
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;

    const { data, error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("portfolio")
      .getPublicUrl(data.path);

    onChange(publicUrl);
    setUploading(false);

    // reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleRemove() {
    onChange(null);
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 tracking-wide">{label}</p>

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <Upload size={12} />
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 text-xs bg-[#E5212E]/80 hover:bg-[#E5212E] text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <X size={12} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full aspect-video border-2 border-dashed border-white/[0.08] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#E5212E]/40 hover:bg-[#E5212E]/[0.02] transition-all disabled:opacity-50 cursor-pointer"
        >
          {uploading ? (
            <>
              <span className="w-6 h-6 border-2 border-white/20 border-t-[#E5212E] rounded-full animate-spin" />
              <span className="text-xs text-gray-600">Uploading…</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <ImageIcon size={18} className="text-gray-600" />
              </div>
              <span className="text-xs text-gray-500">Click to upload</span>
              <span className="text-[11px] text-gray-700">PNG, JPG, WEBP · Max 5MB</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-[#E5212E]">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
