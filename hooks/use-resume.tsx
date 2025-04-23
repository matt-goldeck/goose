"use client";

import { Resume } from "@/lib/types/db";
import { getResumes } from "@/utils/supabase/client-queries";
import * as React from "react";

interface ResumeContext {
  resumes: Resume[];
  isLoadingResumes: boolean;
  hasLoadedResumes: boolean;
  loadResumes: () => Promise<void>;
}

const ResumeContext = React.createContext<ResumeContext | undefined>(undefined);

export function useResume() {
  const context = React.useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}

interface ResumeProviderProps {
  children: React.ReactNode;
}

export function ResumeProvider({ children }: ResumeProviderProps) {
  const [isLoadingResumes, setIsLoadingResumes] = React.useState(true);
  const [hasLoadedResumes, setHasLoadedResumes] = React.useState(false);
  const [resumes, setResumes] = React.useState<Resume[]>([]);

  const loadResumes = async () => {
    setIsLoadingResumes(true);

    const jobListings = await getResumes();
    setResumes(jobListings);

    setIsLoadingResumes(false);
    setHasLoadedResumes(true);
  };

  React.useEffect(() => {
    loadResumes();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        isLoadingResumes,
        hasLoadedResumes,
        loadResumes,
      }}>
      {children}
    </ResumeContext.Provider>
  );
}
