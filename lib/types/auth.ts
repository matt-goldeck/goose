import { User } from "@supabase/supabase-js";

export interface Session {
  user: User | null;
  accessToken: string | null;
}
