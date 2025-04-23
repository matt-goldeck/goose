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

export const getJobListingByIdForSBC = async (
  supabaseClient: SupabaseClient,
  id: string
) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .select("*, job_company(*)")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data as JobListingWithCompany;
};

export const createJobListingForSBC = async (
  supabaseClient: SupabaseClient,
  jobListing: Partial<JobListingWithCompany>
) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .insert(jobListing);
  if (error) {
    throw error;
  }
  return data;
};

export const updateJobListingForSBC = async (
  supabaseClient: SupabaseClient,
  jobListing: Partial<JobListingWithCompany>
) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .update(jobListing)
    .eq("id", jobListing.id);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteJobListingForSBC = async (
  supabaseClient: SupabaseClient,
  id: string
) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

export const getJobCompaniesForSBC = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient.from("job_company").select("*");
  if (error) {
    throw error;
  }
  return data as JobCompany[];
};

export const createJobCompanyForSBC = async (
  supabaseClient: SupabaseClient,
  jobCompany: Partial<JobCompany>
) => {
  const { data, error } = await supabaseClient
    .from("job_company")
    .insert(jobCompany);
  if (error) {
    throw error;
  }
  return data;
};

export const updateJobCompanyForSBC = async (
  supabaseClient: SupabaseClient,
  jobCompany: Partial<JobCompany>
) => {
  const { data, error } = await supabaseClient
    .from("job_company")
    .update(jobCompany)
    .eq("id", jobCompany.id);
  if (error) {
    throw error;
  }
  return data;
};

export const getResumesForSBC = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient.from("resume").select("*");
  if (error) {
    throw error;
  }
  return data;
};
