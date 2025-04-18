import { SupabaseClient } from "@supabase/supabase-js";

export const createUserProfileForSBC = async (
  supabaseClient: SupabaseClient,
  userId: string,
  email: string
) => {
  const { data, error } = await supabaseClient
    .from("user")
    .insert({ id: userId, email: email });
  if (error) {
    throw error;
  }
};
