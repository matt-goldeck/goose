import { Tables } from "./supabase";

export type Application = Tables<"application">;
export type ApplicationStep = Tables<"application_step">;
export type ApplicationOutcome = Tables<"application_outcome">;
export type ApplicationWithStepsAndOutcome = Application & {
  application_step: ApplicationStep[];
  application_outcome: ApplicationOutcome | null;
};

export type JobCompany = Tables<"job_company">;
export type JobListing = Tables<"job_listing">;
export type JobListingWithCompanyAndApplication = JobListing & {
  job_company: JobCompany;
  application: ApplicationWithStepsAndOutcome | null;
};

export type Resume = Tables<"resume">;
