import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServer } from "@/lib/supabase-server";
import PostRow from "./_components/PostRow";

export const revalidate = 0;

export default async function PostsPage() {
  const supabase = await createSupabaseServer();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, tag, date, published, read_time")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            {posts?.length ?? 0} posts total
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-[#E5212E] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors"
        >
          <Plus size={15} />
          New Post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06]">
          <p className="col-span-5 text-xs text-gray-600 uppercase tracking-wide">Title</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wide">Tag</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wide">Date</p>
          <p className="col-span-1 text-xs text-gray-600 uppercase tracking-wide">Status</p>
          <p className="col-span-2 text-xs text-gray-600 uppercase tracking-wide text-right">Actions</p>
        </div>

        {posts && posts.length > 0 ? (
          posts.map((post) => <PostRow key={post.id} post={post} />)
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-600 text-sm">No posts yet.</p>
            <Link
              href="/admin/posts/new"
              className="text-[#E5212E] text-sm mt-2 inline-block hover:underline"
            >
              Create your first post →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
