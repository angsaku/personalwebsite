import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let _client: SupabaseClient<Database> | null = null;

export const SUPABASE_CACHE_TAG = "supabase";
const SUPABASE_REVALIDATE_SECONDS = 60;

// Public reads go through Next's Data Cache so every render in the same window
// sees identical data. Admin saves call updateTag(SUPABASE_CACHE_TAG) to bust it.
const cachedFetch: typeof fetch = (input, init) => {
  const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
  if (method !== "GET") return fetch(input, init);
  return fetch(input, {
    ...init,
    next: { revalidate: SUPABASE_REVALIDATE_SECONDS, tags: [SUPABASE_CACHE_TAG] },
  });
};

export function getSupabase(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || url === "your_supabase_project_url" || !key) {
    return null;
  }

  if (!_client) {
    _client = createClient<Database>(url, key, { global: { fetch: cachedFetch } });
  }

  return _client;
}
