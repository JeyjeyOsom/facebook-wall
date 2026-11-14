import { createClient } from "@supabase/supabase-js"

// Fall back to inert placeholders instead of throwing: a missing env var
// must not kill `next build` (prerender imports this module). At runtime the
// UI surfaces the failure through the wall's error banner.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"

export const supabase = createClient(supabaseUrl, supabaseKey)
