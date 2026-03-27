"use client";

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (initialised.current || !containerRef.current) return;
    initialised.current = true;

    async function init() {
      const Quill = (await import("quill")).default;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await import("quill/dist/quill.snow.css");

      quillRef.current = new Quill(containerRef.current!, {
        theme: "snow",
        placeholder: placeholder ?? "Write here…",
        modules: {
          toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      quillRef.current.on("text-change", () => {
        onChange(quillRef.current.root.innerHTML);
      });
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="quill-wrapper rounded-xl overflow-hidden border border-white/[0.08]">
      <div ref={containerRef} style={{ minHeight: "120px" }} />
    </div>
  );
}
