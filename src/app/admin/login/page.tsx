import { createSupabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import LoginForm from "./_components/LoginForm";

export default async function LoginPage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/admin/posts");

  return <LoginForm />;
}
