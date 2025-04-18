import { JobCompany, JobListingWithCompany } from "@/lib/types/db";
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

export const getJobListingsForSBC = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .select("*, job_company(*)");
  if (error) {
    throw error;
  }
  return data as JobListingWithCompany[];
};

export const getJobCompaniesForSBC = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient.from("job_company").select("*");
  if (error) {
    throw error;
  }
  return data as JobCompany[];
};
