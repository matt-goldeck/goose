"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageContainer from "@/components/ui/page-container";
import JobListingDetail from "@/components/job-listings/job-listing-detail";

import { JobListingDetailProvider } from "@/hooks/use-job-listing-detail";

export default function JobListingDetailPage() {
  const router = useRouter();
  const { uuid } = useParams();

  useEffect(() => {
    if (!uuid) return router.push("/dashboard");
  }, [uuid, router]);

  return (
    <PageContainer>
      <JobListingDetailProvider jobListingId={uuid as string}>
        <JobListingDetail />
      </JobListingDetailProvider>
    </PageContainer>
  );
}
