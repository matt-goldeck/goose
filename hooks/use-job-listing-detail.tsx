"use client";

import { JobListingDetail } from "@/lib/types/db";
import { getJobListing } from "@/utils/supabase/client-queries";
import * as React from "react";

interface JobListingDetailContext {
  jobListing: JobListingDetail | null;
  isLoadingJobListing: boolean;
  hasLoadedJobListing: boolean;
  loadJobListing: () => void;
}

const JobListingDetailContext = React.createContext<
  JobListingDetailContext | undefined
>(undefined);

export function useJobListingDetail() {
  const context = React.useContext(JobListingDetailContext);
  if (!context) {
    throw new Error(
      "useJobListingDetail must be used within a JobListingDetailProvider"
    );
  }
  return context;
}

interface JobListingDetailProviderProps {
  jobListingId: string;
  children: React.ReactNode;
}

export function JobListingDetailProvider({
  jobListingId,
  children,
}: JobListingDetailProviderProps) {
  const [jobListing, setJobListing] =
    React.useState<JobListingDetail | null>(null);
  const [isLoadingJobListing, setIsLoadingJobListing] = React.useState(true);
  const [hasLoadedJobListing, setHasLoadedJobListing] = React.useState(false);

  const loadJobListing = async () => {
    setIsLoadingJobListing(true);

    const listing = await getJobListing(jobListingId);
    setJobListing(listing);

    setIsLoadingJobListing(false);
    setHasLoadedJobListing(true);
  };

  React.useEffect(() => {
    if (jobListingId) {
      loadJobListing();
    }
  }, [jobListingId]);

  return (
    <JobListingDetailContext.Provider
      value={{
        jobListing,
        isLoadingJobListing,
        hasLoadedJobListing,
        loadJobListing,
      }}>
      {children}
    </JobListingDetailContext.Provider>
  );
}
