import { Tables } from "./supabase";

export type Resume = Tables<"resume">;

export type Application = Tables<"application">;
export type ApplicationStep = Tables<"application_step">;
export type ApplicationOutcome = Tables<"application_outcome">;
export type ApplicationWithStepsAndOutcome = Application & {
  application_step: ApplicationStep[];
  application_outcome: ApplicationOutcome | null;
};
export type CompatibilityScore = Tables<"compatibility_score">;
export type CompatibilityScoreWithResume = CompatibilityScore & {
  resume: Resume;
};

export type JobCompany = Tables<"job_company">;
export type JobListing = Tables<"job_listing">;
export type JobListingWithCompanyAndApplication = JobListing & {
  job_company: JobCompany;
  application: ApplicationWithStepsAndOutcome | null;
};
export type JobListingDetail = JobListing & {
  job_company: JobCompany;
  application: ApplicationWithStepsAndOutcome | null;
  compatibility_score: CompatibilityScoreWithResume[];
};

export const APPLICATION_STEP_TYPES = [
  "phone_screener",
  "interview",
  "onsite",
  "final_round",
] as const;
export type ApplicationStepType = (typeof APPLICATION_STEP_TYPES)[number];

export const APPLICATION_OUTCOME_TYPES = [
  "ghosted",
  "rejected",
  "turned_down",
  "accepted",
] as const;
export type ApplicationOutcomeType = (typeof APPLICATION_OUTCOME_TYPES)[number];
