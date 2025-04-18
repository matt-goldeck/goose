"use client";

import { JobListingWithCompany } from "@/lib/types/db";
import { getJobListings } from "@/utils/supabase/client-queries";
import * as React from "react";

interface JobListingContext {
  jobListings: JobListingWithCompany[];
  isLoadingJobListings: boolean;
  hasLoadedJobListings: boolean;
  loadJobListings: () => Promise<void>;
}

const JobListingContext = React.createContext<JobListingContext | undefined>(
  undefined
);

export function useJobListing() {
  const context = React.useContext(JobListingContext);
  if (!context) {
    throw new Error("useJobListing must be used within a JobListingProvider");
  }
  return context;
}

interface JobListingProviderProps {
  children: React.ReactNode;
}

export function JobListingProvider({ children }: JobListingProviderProps) {
  const [isLoadingJobListings, setIsLoadingJobListings] = React.useState(true);
  const [hasLoadedJobListings, setHasLoadedJobListings] = React.useState(false);
  const [jobListings, setJobListings] = React.useState<JobListingWithCompany[]>(
    []
  );

  const loadJobListings = async () => {
    setIsLoadingJobListings(true);

    const jobListings = await getJobListings();
    setJobListings(jobListings);

    setIsLoadingJobListings(false);
    setHasLoadedJobListings(true);
  };

  React.useEffect(() => {
    loadJobListings();
  }, []);

  return (
    <JobListingContext.Provider
      value={{
        jobListings,
        isLoadingJobListings,
        hasLoadedJobListings,
        loadJobListings,
      }}>
      {children}
    </JobListingContext.Provider>
  );
}
