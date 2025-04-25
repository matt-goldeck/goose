import { createClient } from "@/utils/supabase/server";
import { Session } from "@/lib/types/auth";

export const auth = async (): Promise<Session> => {
  const supabase = await createClient();
  const userResult = await supabase.auth.getUser();
  const sessionResult = await supabase.auth.getSession();

  return {
    accessToken: sessionResult.data.session?.access_token || null,
    user: userResult.data?.user || null,
  };
};

export const getIsUserAuthorized = async () => {
  const supabase = await createClient();
  const userResult = await supabase.auth.getUser();
  return !!userResult.data?.user;
};
