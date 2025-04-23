import { Tables } from "./supabase";

export type JobCompany = Tables<"job_company">;
export type JobListing = Tables<"job_listing">;
export type JobListingWithCompany = JobListing & {
  job_company: JobCompany;
};

export type Resume = Tables<"resume">;
