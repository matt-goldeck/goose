import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { JobListingWithCompanyAndApplication } from "@/lib/types/db";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import JobListingManageModal from "./job-listing-manage-modal";
import { Button } from "primereact/button";
import { deleteJobListing } from "@/utils/supabase/client-queries";
import { useRouter } from "next/navigation";

export default function JobListingDetail() {
  const router = useRouter();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { isLoadingJobListing, jobListing, loadJobListing } =
    useJobListingDetail();

  const handleDelete = async () => {
    if (!jobListing) return;
    await deleteJobListing(jobListing.id);
    router.push("/dashboard");
  };

  if (isLoadingJobListing || !jobListing) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <Card className="w-full bg-white dark:bg-zinc-900 shadow-sm rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            {jobListing.title}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {jobListing.job_company.name}
          </p>
          <p className="text-xs text-zinc-400 mt-1">
            Created: {new Date(jobListing.created_at).toLocaleString()}
          </p>
          {jobListing.url && (
            <a
              href={jobListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 text-sm underline mt-2 inline-block hover:underline-offset-2">
              View job post
            </a>
          )}
        </header>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Description
          </h2>
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-4 text-sm text-zinc-800 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed">
            {jobListing.description}
          </div>
        </section>

        {jobListing.user_notes && (
          <section>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Your Notes
            </h2>
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-4 text-sm text-zinc-800 dark:text-zinc-100 leading-relaxed">
              {jobListing.user_notes}
            </div>
          </section>
        )}
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
      </Card>
      <JobListingManageModal
        isVisible={editModalVisible}
        setIsVisible={setEditModalVisible}
        jobListing={jobListing}
        onSubmitCallback={() => {
          loadJobListing();
          setEditModalVisible(false);
        }}
      />
    </>
  );
}
