"use client";

import { JobCompany } from "@/lib/types/db";
import { getJobCompanies } from "@/utils/supabase/client";
import * as React from "react";

interface JobCompanyContext {
  jobCompanies: JobCompany[];
  isLoadingJobCompanies: boolean;
  hasLoadedJobCompanies: boolean;
  loadJobCompanies: () => Promise<void>;
}

const JobCompanyContext = React.createContext<JobCompanyContext | undefined>(
  undefined
);

export function useJobCompany() {
  const context = React.useContext(JobCompanyContext);
  if (!context) {
    throw new Error("useJobCompany must be used within a JobCompanyProvider");
  }
  return context;
}

interface JobCompanyProviderProps {
  children: React.ReactNode;
}

export function JobCompanyProvider({ children }: JobCompanyProviderProps) {
  const [isLoadingJobCompanies, setIsLoadingJobCompanies] =
    React.useState(true);
  const [hasLoadedJobCompanies, setHasLoadedJobCompanies] =
    React.useState(false);
  const [jobCompanies, setJobCompanies] = React.useState<JobCompany[]>([]);

  const loadJobCompanies = async () => {
    setIsLoadingJobCompanies(true);

    const jobCompanies = await getJobCompanies();
    setJobCompanies(jobCompanies);

    setIsLoadingJobCompanies(false);
    setHasLoadedJobCompanies(true);
  };

  return (
    <JobCompanyContext.Provider
      value={{
        jobCompanies,
        isLoadingJobCompanies,
        hasLoadedJobCompanies,
        loadJobCompanies,
      }}>
      {children}
    </JobCompanyContext.Provider>
  );
}
