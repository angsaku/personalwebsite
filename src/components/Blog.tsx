import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export default async function Blog() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 3);

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
              Blog & Case Studies
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Thoughts & insights<span className="text-[#E5212E]">.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            I write about design processes, case studies, and lessons from
            shipping real products.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="blog-grid">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#E5212E]/30 transition-all duration-300"
              >
                {/* Cover image */}
                <div className="aspect-video bg-[#020618] border-b border-white/[0.06] overflow-hidden flex-shrink-0">
                  {post.coverUrl ? (
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 rounded-lg bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center">
                        <span className="text-[#E5212E] text-xl">✦</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#E5212E] font-medium tracking-wide">
                      {post.tag}
                    </span>
                    <span className="text-xs text-gray-700 flex items-center gap-1">
                      <Calendar size={10} />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-[#E5212E] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-auto">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-gray-600 group-hover:text-[#E5212E] transition-colors flex-shrink-0"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-white/[0.06] rounded-2xl bg-[#0a1128]">
            <p className="text-gray-600 text-sm">No posts published yet.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="border-t border-white/[0.06] pt-10 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            {allPosts.length > 3
              ? `Showing 3 of ${allPosts.length} posts`
              : `${allPosts.length} ${allPosts.length === 1 ? "post" : "posts"} published`}
          </p>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-[#E5212E]/40 text-[#E5212E] text-sm font-medium rounded-full hover:bg-[#E5212E] hover:text-white hover:border-[#E5212E] transition-all duration-300"
          >
            View All Posts
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
