import { createClient } from "@supabase/supabase-js";
// Server-only client. Uses the secret service key from env vars.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
