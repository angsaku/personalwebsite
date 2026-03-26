"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function QuillEditor({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current || !containerRef.current) return;
    initialised.current = true;

    async function init() {
      const Quill = (await import("quill")).default;
      await import("quill/dist/quill.snow.css");

      quillRef.current = new Quill(containerRef.current!, {
        theme: "snow",
        placeholder: "Write your blog post here…",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link"],
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
      <div ref={containerRef} style={{ minHeight: "320px" }} />
    </div>
  );
}
