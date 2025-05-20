import {
  ApplicationOutcome,
  ApplicationStep,
  CompatibilityScore,
  CompatibilityScoreWithResume,
  JobCompany,
  JobListingDetail,
  JobListingWithCompanyAndApplication,
} from "@/lib/types/db";
import { SupabaseClient } from "@supabase/supabase-js";

export const createUserProfileForSBC = async (
  supabaseClient: SupabaseClient,
  userId: string,
  email: string
) => {
  const { data, error } = await supabaseClient
    .from("users")
    .insert({ id: userId, email: email });
  if (error) {
    throw error;
  }
};

export const getOrCreateUserProfileForSBC = async (
  supabaseClient: SupabaseClient,
  userId: string,
  email: string
) => {
  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      await createUserProfileForSBC(supabaseClient, userId, email);
    } else {
      throw error;
    }
  }

  return data;
};

export const getJobListingsForSBC = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .select("*, job_company(*), application(*, application_outcome(*))");
  if (error) {
    throw error;
  }

  // Reshape application and its outcome
  data.forEach((jobListing) => {
    if (jobListing.application?.[0]) {
      jobListing.application = {
        ...jobListing.application[0],
        application_outcome:
          jobListing.application[0].application_outcome?.[0] ?? null,
      };
    } else {
      jobListing.application = null;
    }
  });

  return data as JobListingWithCompanyAndApplication[];
};

export const getJobListingByIdForSBC = async (
  supabaseClient: SupabaseClient,
  id: string
) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .select(
      "*, job_company(*), application(*, application_outcome(*), application_step(*)), compatibility_score(*, resume(*))"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  // Reshape application and its outcome
  const application = data.application?.[0]
    ? {
        ...data.application[0],
        application_outcome:
          data.application[0].application_outcome?.[0] ?? null,
      }
    : null;

  return {
    ...data,
    application,
  } as JobListingDetail;
};

export const createJobListingForSBC = async (
  supabaseClient: SupabaseClient,
  jobListing: Partial<JobListingWithCompanyAndApplication>
) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .insert(jobListing)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const updateJobListingForSBC = async (
  supabaseClient: SupabaseClient,
  jobListing: Partial<JobListingWithCompanyAndApplication>
) => {
  const { data, error } = await supabaseClient
    .from("job_listing")
    .update(jobListing)
    .eq("id", jobListing.id)
    .select()
    .single();
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

export const createApplicationForSBC = async (
  supabaseClient: SupabaseClient,
  jobListingId: string,
  userId: string
) => {
  const { data, error } = await supabaseClient.from("application").insert({
    job_listing_id: jobListingId,
    user_id: userId,
    applied_on: new Date(),
  });
  if (error) {
    throw error;
  }
  return data;
};

export const createApplicationStepForSBC = async (
  supabaseClient: SupabaseClient,
  step: Partial<ApplicationStep>
) => {
  const { data, error } = await supabaseClient
    .from("application_step")
    .insert(step);
  if (error) {
    throw error;
  }
  return data;
};

export const updateAppliationStepForSBC = async (
  supabaseClient: SupabaseClient,
  step: Partial<ApplicationStep>
) => {
  const { data, error } = await supabaseClient
    .from("application_step")
    .update(step)
    .eq("id", step.id);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteApplicationStepForSBC = async (
  supabaseClient: SupabaseClient,
  stepId: number
) => {
  const { data, error } = await supabaseClient
    .from("application_step")
    .delete()
    .eq("id", stepId);
  if (error) {
    throw error;
  }
  return data;
};

export const createApplicationOutcomeForSBC = async (
  supabaseClient: SupabaseClient,
  outcome: Partial<ApplicationOutcome>
) => {
  const { data, error } = await supabaseClient
    .from("application_outcome")
    .insert(outcome);
  if (error) {
    throw error;
  }
  return data;
};

export const updateApplicationOutcomeForSBC = async (
  supabaseClient: SupabaseClient,
  outcome: Partial<ApplicationStep>
) => {
  const { data, error } = await supabaseClient
    .from("application_outcome")
    .update(outcome)
    .eq("id", outcome.id);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteApplicationOutcomeForSBC = async (
  supabaseClient: SupabaseClient,
  outcomeId: number
) => {
  const { data, error } = await supabaseClient
    .from("application_outcome")
    .delete()
    .eq("id", outcomeId);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteApplicationForSBC = async (
  supabaseClient: SupabaseClient,
  applicationId: number
) => {
  const { data, error } = await supabaseClient
    .from("application")
    .delete()
    .eq("id", applicationId);
  if (error) {
    throw error;
  }
  return data;
};

export const getCompatibilityScoresForSBC = async (
  supabaseClient: SupabaseClient,
  jobListingId: string
) => {
  const { data, error } = await supabaseClient
    .from("compatibility_score")
    .select("*")
    .eq("job_listing_id", jobListingId);
  if (error) {
    throw error;
  }
  return data as CompatibilityScore[];
};
