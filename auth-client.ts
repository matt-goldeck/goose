import { createClient } from "@/utils/supabase/client";

export const auth = async () => {
  const supabase = createClient();
  const sessionResult = await supabase.auth.getSession();

  return {
    accessToken: sessionResult.data.session?.access_token || null,
    user: sessionResult.data?.session?.user || null,
  };
};
