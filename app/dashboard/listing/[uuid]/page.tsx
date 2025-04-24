"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import PageContainer from "@/components/ui/page-container";
import JobListingDetail from "@/components/job-listings/job-listing-detail";
import JobListingManageModal from "@/components/job-listings/job-listing-manage-modal";
import {
  getJobListing,
  deleteJobListing,
} from "@/utils/supabase/client-queries";
import { JobListingWithCompany } from "@/lib/types/db";

export default function JobListingDetailPage() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobListing, setJobListing] = useState<JobListingWithCompany | null>(
    null
  );

  const router = useRouter();
  const { uuid } = useParams();

  useEffect(() => {
    if (!uuid) return router.push("/dashboard");

    const fetchData = async () => {
      try {
        const data = await getJobListing(uuid as string);
        setJobListing(data);
      } catch {
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uuid, router]);

  const handleDelete = async () => {
    if (!jobListing) return;
    await deleteJobListing(jobListing.id);
    router.push("/dashboard");
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    const data = await getJobListing(uuid as string);
    setJobListing(data);
    setIsLoading(false);
  };

  if (isLoading || !jobListing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col items-center gap-8">
        <JobListingDetail job={jobListing} />
        <div className="flex gap-4">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            onClick={() => setEditModalVisible(true)}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            onClick={handleDelete}
          />
        </div>
      </div>

      <JobListingManageModal
        isVisible={editModalVisible}
        setIsVisible={setEditModalVisible}
        jobListing={jobListing}
        onSubmitCallback={handleRefresh}
      />
    </PageContainer>
  );
}
