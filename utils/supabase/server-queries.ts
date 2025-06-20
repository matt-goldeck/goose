import { createClient } from "@/utils/supabase/server";
import {
  createUserProfileForSBC,
  getJobListingByIdForSBC,
  getOrCreateUserProfileForSBC,
} from "@/utils/supabase/queries";

export const createUserProfile = async (userId: string, email: string) => {
  const supabase = await createClient();
  return createUserProfileForSBC(supabase, userId, email);
};

export const getOrCreateUserProfile = async (userId: string, email: string) => {
  const supabase = await createClient();
  return getOrCreateUserProfileForSBC(supabase, userId, email);
};

export const getJobListing = async (id: string) => {
  const supabase = await createClient();
  return getJobListingByIdForSBC(supabase, id);
};
