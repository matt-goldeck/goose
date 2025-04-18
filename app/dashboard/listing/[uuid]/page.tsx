"use client";

import JobListingDetail from "@/components/job-listings/job-listing-detail";
import JobListingManageModal from "@/components/job-listings/job-listing-manage-modal";
import { JobListingWithCompany } from "@/lib/types/db";
import {
  deleteJobListing,
  getJobListing,
} from "@/utils/supabase/client-queries";
import { useParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import { useEffect, useState } from "react";

export default function JobListingDetailPage() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobListing, setJobListing] = useState<JobListingWithCompany | null>(
    null
  );

  // get the uuid from the URL
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  if (!uuid) {
    return router.push("/dashboard");
  }

  const fetchJobListing = async () => {
    try {
      const data = await getJobListing(uuid);
      setJobListing(data);
    } catch (error) {
      router.push("/dashboard");
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobListing();
  }, []);

  if (isLoading || !jobListing) {
    return <ProgressSpinner />;
  }

  const onDeleteCallback = async () => {
    await deleteJobListing(jobListing.id);
    router.push("/dashboard");
  };

  return (
    <>
      <JobListingDetail job={jobListing} />
      <div className="mt-6 flex gap-4">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          onClick={() => {
            setEditModalVisible(true);
          }}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={onDeleteCallback}
        />
      </div>
      <JobListingManageModal
        isVisible={editModalVisible}
        setIsVisible={setEditModalVisible}
        jobListing={jobListing}
        onSubmitCallback={() => {
          setEditModalVisible(false);
          // Refetch the job listing after editing
          setIsLoading(true);
          fetchJobListing();
        }}
      />
    </>
  );
}
