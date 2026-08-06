"use client";

import { useEffect, useRef, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { TABLE_TOOLBAR_GROUP, registerTableIcons, tableToolbarHandlers, titleTableButtons } from "@/app/admin/_components/quillTable";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function MiniEditor({ value, onChange, placeholder }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  const initialised = useRef(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialised.current || !containerRef.current) return;
    initialised.current = true;

    async function init() {
      const Quill = (await import("quill")).default;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await import("quill/dist/quill.snow.css");

      registerTableIcons(Quill);

      quillRef.current = new Quill(containerRef.current!, {
        theme: "snow",
        placeholder: placeholder ?? "Write here…",
        modules: {
          table: true,
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote"],
              ["image"],
              TABLE_TOOLBAR_GROUP,
              ["clean"],
            ],
            handlers: tableToolbarHandlers,
          },
        },
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      quillRef.current.on("text-change", () => {
        onChange(quillRef.current.root.innerHTML);
      });

      quillRef.current
        .getModule("toolbar")
        .addHandler("image", () => uploadImage(quillRef.current, "work-content", setUploading, setError));

      titleTableButtons(quillRef.current);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="quill-wrapper rounded-xl border border-white/[0.08]">
      <div ref={containerRef} style={{ minHeight: "120px" }} />
      {uploading && <p className="px-3 py-1.5 text-xs text-gray-500">Uploading image…</p>}
      {error && <p className="px-3 py-1.5 text-xs text-[#E5212E]">{error}</p>}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function uploadImage(
  quill: any,
  folder: string,
  setUploading: (v: boolean) => void,
  setError: (v: string) => void
) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/png,image/jpeg,image/webp,image/gif");
  input.click();

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const range = quill.getSelection(true);
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

    quill.insertEmbed(range.index, "image", publicUrl, "user");
    quill.setSelection(range.index + 1, 0, "user");
    setUploading(false);
  };
}
