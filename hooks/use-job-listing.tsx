"use client";

import { JobListingWithCompanyAndApplication } from "@/lib/types/db";
import { filterJobListings, JobListingFilters } from "@/utils/job-listings";
import { getJobListings } from "@/utils/supabase/client-queries";
import * as React from "react";

interface JobListingContext {
  jobListings: JobListingWithCompanyAndApplication[];
  isLoadingJobListings: boolean;
  hasLoadedJobListings: boolean;
  loadJobListings: () => Promise<void>;
  filters: JobListingFilters;
  setFilters: React.Dispatch<React.SetStateAction<JobListingFilters>>;
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
  const [jobListings, setJobListings] = React.useState<
    JobListingWithCompanyAndApplication[]
  >([]);
  const [filters, setFilters] = React.useState<JobListingFilters>({
    status: undefined,
    companyId: undefined,
  });

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

  // Memoize filtered results so they update when filters change
  const filteredJobListings = React.useMemo(() => {
    return filterJobListings(jobListings, filters);
  }, [jobListings, filters]);

  return (
    <JobListingContext.Provider
      value={{
        jobListings: filteredJobListings,
        isLoadingJobListings,
        hasLoadedJobListings,
        loadJobListings,
        filters,
        setFilters,
      }}>
      {children}
    </JobListingContext.Provider>
  );
}
