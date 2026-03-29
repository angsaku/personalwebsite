"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Briefcase, LogOut, Smile, Users } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    { label: "Blog Posts", href: "/admin/posts", icon: FileText },
    { label: "Selected Work", href: "/admin/work", icon: Briefcase },
    { label: "Beyond Work", href: "/admin/beyond-work", icon: Smile },
    { label: "Communities", href: "/admin/communities", icon: Users },
  ];

  return (
    <aside className="w-56 bg-[#0a1128] border-r border-white/[0.06] flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/[0.06]">
        <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-0.5">
          Admin
        </p>
        <p className="text-sm font-semibold text-white">Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active
                  ? "bg-[#E5212E]/10 text-[#E5212E]"
                  : "text-gray-500 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <p className="text-xs text-gray-600 truncate mb-3">{email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
