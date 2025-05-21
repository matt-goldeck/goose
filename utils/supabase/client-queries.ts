"use client";

import {
  ApplicationOutcome,
  ApplicationStep,
  JobCompany,
  JobListing,
} from "@/lib/types/db";
import { createClient } from "@/utils/supabase/client";
import {
  createApplicationForSBC,
  createApplicationOutcomeForSBC,
  createApplicationStepForSBC,
  createJobCompanyForSBC,
  createJobListingForSBC,
  deleteApplicationForSBC,
  deleteApplicationOutcomeForSBC,
  deleteApplicationStepForSBC,
  deleteJobCompanyForSBC,
  deleteJobListingForSBC,
  getCompatibilityScoresForSBC,
  getJobCompaniesForSBC,
  getJobListingByIdForSBC,
  getJobListingsForSBC,
  getResumesForSBC,
  updateAppliationStepForSBC,
  updateApplicationOutcomeForSBC,
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

export const deleteJobCompany = async (id: number) => {
  const supabase = createClient();
  return deleteJobCompanyForSBC(supabase, id);
};

export const getJobListing = async (id: string) => {
  const supabase = createClient();
  return getJobListingByIdForSBC(supabase, id);
};

export const deleteJobListing = async (id: string) => {
  const supabase = createClient();
  return deleteJobListingForSBC(supabase, id);
};

export const getResumes = async () => {
  const supabase = createClient();
  return getResumesForSBC(supabase);
};

export const createApplication = async (jobListingId: string) => {
  const supabase = createClient();
  const userId = await supabase.auth
    .getUser()
    .then((user) => user.data.user?.id);
  if (!userId) {
    // TODO: Handle this error more gracefully
    throw new Error("User not authenticated");
  }
  return createApplicationForSBC(supabase, jobListingId, userId);
};

export const createApplicationStep = async (step: Partial<ApplicationStep>) => {
  const supabase = createClient();
  return createApplicationStepForSBC(supabase, step);
};

export const updateApplicationStep = async (step: Partial<ApplicationStep>) => {
  const supabase = createClient();
  return updateAppliationStepForSBC(supabase, step);
};

export const deleteApplicationStep = async (stepId: number) => {
  const supabase = createClient();
  return deleteApplicationStepForSBC(supabase, stepId);
};

export const createApplicationOutcome = async (
  outcome: Partial<ApplicationOutcome>
) => {
  const supabase = createClient();
  return createApplicationOutcomeForSBC(supabase, outcome);
};

export const updateApplicationOutcome = async (
  outcome: Partial<ApplicationStep>
) => {
  const supabase = createClient();
  return updateApplicationOutcomeForSBC(supabase, outcome);
};

export const deleteApplicationOutcome = (outcomeId: number) => {
  const supabase = createClient();
  return deleteApplicationOutcomeForSBC(supabase, outcomeId);
};

export const deleteApplication = (applicationId: number) => {
  const supabase = createClient();
  return deleteApplicationForSBC(supabase, applicationId);
};

export const getCompatibilityScores = (jobListingId: string) => {
  const supabase = createClient();
  return getCompatibilityScoresForSBC(supabase, jobListingId);
};
