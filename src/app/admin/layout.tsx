import { createSupabaseServer } from "@/lib/supabase-server";
import AdminSidebar from "./_components/AdminSidebar";

export const metadata = { title: "Admin — Satriya Kurniawan" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in — render children (login page) without shell
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#020618] flex">
      <AdminSidebar email={user.email ?? ""} />
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
