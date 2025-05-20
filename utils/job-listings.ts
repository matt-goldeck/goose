import { JobListingWithCompanyAndApplication } from "@/lib/types/db";

export type JobListingFilters = {
  status?: "active" | "inactive";
  companyId?: number;
};

export const filterJobListings = (
  jobListings: JobListingWithCompanyAndApplication[],
  filters: JobListingFilters
) => {
  return jobListings.filter((listing) => {
    // Status filter
    if (filters.status) {
      const outcome = listing.application?.application_outcome?.outcome;
      const isActive = !outcome;
      if (filters.status === "active" && !isActive) return false;
      if (filters.status === "inactive" && isActive) return false;
    }

    // Company filter
    if (
      filters.companyId !== undefined &&
      listing.job_company?.id !== filters.companyId
    ) {
      return false;
    }

    return true;
  });
};
