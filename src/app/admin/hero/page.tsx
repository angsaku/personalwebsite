export const revalidate = 0;

import { createSupabaseServer } from "@/lib/supabase-server";
import HeroForm from "./_components/HeroForm";

export default async function HeroAdminPage() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("hero_content")
    .select("*")
    .limit(1)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hero = data as any ?? null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Hero Section</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit the headline tagline, stats, and OG image.
        </p>
      </div>
      <HeroForm hero={hero} />
    </div>
  );
}
