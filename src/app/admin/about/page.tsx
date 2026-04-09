export const revalidate = 0;

import { createSupabaseServer } from "@/lib/supabase-server";
import AboutForm from "./_components/AboutForm";

export default async function AboutAdminPage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("about_content")
    .select("*")
    .limit(1)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const about = data as any ?? null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">About Section</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit your bio, skills, photo, and resume link.
        </p>
      </div>
      <AboutForm about={about} />
    </div>
  );
}
