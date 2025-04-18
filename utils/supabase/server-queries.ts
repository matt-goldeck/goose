import { createClient } from "@/utils/supabase/server";
import { createUserProfileForSBC } from "@/utils/supabase/queries";

export const createUserProfile = async (userId: string, email: string) => {
  const supabase = await createClient();
  return createUserProfileForSBC(supabase, userId, email);
};
