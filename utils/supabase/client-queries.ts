"use client";

import { JobCompany, JobListing } from "@/lib/types/db";
import { createClient } from "@/utils/supabase/client";
import {
  createJobCompanyForSBC,
  createJobListingForSBC,
  getJobCompaniesForSBC,
  getJobListingsForSBC,
  updateJobCompanyForSBC,
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

export const createJobCompany = async (jobCompany: JobCompany) => {
  const supabase = createClient();
  return createJobCompanyForSBC(supabase, jobCompany);
};

export const updateJobCompany = async (jobCompany: JobCompany) => {
  const supabase = createClient();
  return updateJobCompanyForSBC(supabase, jobCompany);
};
