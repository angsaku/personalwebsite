"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPost, updatePost } from "@/app/admin/actions";

const QuillEditor = lazy(() => import("./QuillEditor"));

type Post = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  read_time: string;
  date: string;
  cover_url: string | null;
  published: boolean;
  content: string | null;
};

export default function PostForm({ post }: { post?: Post }) {
  const isEdit = !!post;
  const [published, setPublished] = useState(post?.published ?? false);
  const [content, setContent] = useState(post?.content ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("published", String(published));
    formData.set("content", content);

    const result = isEdit
      ? await updatePost(post.id, formData)
      : await createPost(formData);

    if (result?.error) {
      setError(result.error);
      setSaving(false);
    }
  }

  const inputCls =
    "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/posts"
          className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? "Edit Blog Post" : "New Blog Post"}
          </h1>
          {isEdit && (
            <p className="text-xs text-gray-600 mt-0.5">/{post.slug}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta */}
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-2">Post Info</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title *</label>
              <input name="title" defaultValue={post?.title} required className={inputCls} placeholder="Post title" />
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <input name="slug" defaultValue={post?.slug} required className={inputCls} placeholder="my-post-slug" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Tag</label>
              <input name="tag" defaultValue={post?.tag} className={inputCls} placeholder="Design, Tips…" />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input name="date" defaultValue={post?.date} className={inputCls} placeholder="Mar 2026" />
            </div>
            <div>
              <label className={labelCls}>Read Time</label>
              <input name="read_time" defaultValue={post?.read_time} className={inputCls} placeholder="5 min read" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Excerpt</label>
            <textarea name="excerpt" defaultValue={post?.excerpt} rows={2} className={inputCls} placeholder="Short summary shown in the blog card…" />
          </div>

          <div>
            <label className={labelCls}>Cover Image URL</label>
            <input name="cover_url" defaultValue={post?.cover_url ?? ""} className={inputCls} placeholder="https://…" />
          </div>

          {/* Published */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm text-white font-medium">Published</p>
              <p className="text-xs text-gray-500">Visible on the live site</p>
            </div>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${published ? "bg-[#E5212E]" : "bg-white/10"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${published ? "translate-x-7" : "translate-x-1"}`} />
            </button>
          </div>
        </section>

        {/* Rich text content */}
        <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Content</h2>
          <Suspense fallback={<div className="h-80 bg-[#020618] rounded-xl border border-white/[0.08] animate-pulse" />}>
            <QuillEditor value={content} onChange={setContent} />
          </Suspense>
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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
          </button>
          <Link href="/admin/posts" className="text-sm text-gray-500 hover:text-white transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
