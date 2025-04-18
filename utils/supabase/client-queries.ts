"use client";

import { JobListing } from "@/lib/types/db";
import { createClient } from "@/utils/supabase/client";
import {
  createJobListingForSBC,
  getJobCompaniesForSBC,
  getJobListingsForSBC,
  updateJobListingForSBC,
} from "@/utils/supabase/queries";

export const getJobCompanies = () => {
  const supabase = createClient();
  return getJobCompaniesForSBC(supabase);
};

export const getJobListings = () => {
  const supabase = createClient();
  return getJobListingsForSBC(supabase);
};

export const createJobListing = async (jobListing: JobListing) => {
  const supabase = createClient();
  return createJobListingForSBC(supabase, jobListing);
};

export const updateJobListing = async (jobListing: JobListing) => {
  const supabase = createClient();
  return updateJobListingForSBC(supabase, jobListing);
};
