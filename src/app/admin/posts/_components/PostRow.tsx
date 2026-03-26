"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deletePost, togglePublish } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Post = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  date: string;
  published: boolean;
  read_time: string;
};

export default function PostRow({ post }: { post: Post }) {
  const router = useRouter();
  const [published, setPublished] = useState(post.published);
  const [deleting, setDeleting] = useState(false);

  async function handleToggle() {
    setPublished(!published);
    await togglePublish(post.id, published);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await deletePost(post.id);
    router.refresh();
  }

  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
      {/* Title */}
      <div className="col-span-5">
        <p className="text-sm text-white font-medium line-clamp-1">{post.title}</p>
        <p className="text-xs text-gray-600 mt-0.5">/{post.slug}</p>
      </div>

      {/* Tag */}
      <div className="col-span-2">
        <span className="text-xs text-[#E5212E] bg-[#E5212E]/10 px-2 py-0.5 rounded-full">
          {post.tag}
        </span>
      </div>

      {/* Date */}
      <p className="col-span-2 text-xs text-gray-500">{post.date}</p>

      {/* Published toggle */}
      <div className="col-span-1">
        <button
          onClick={handleToggle}
          className={`w-10 h-5 rounded-full transition-colors relative ${
            published ? "bg-[#E5212E]" : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
              published ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <Link
          href={`/admin/posts/${post.id}`}
          className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          <Pencil size={14} />
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 text-gray-500 hover:text-[#E5212E] hover:bg-[#E5212E]/10 rounded-lg transition-colors disabled:opacity-40"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
