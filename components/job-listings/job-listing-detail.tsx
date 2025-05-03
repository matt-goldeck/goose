import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import JobListingManageModal from "./job-listing-manage-modal";
import { Button } from "primereact/button";
import { deleteJobListing } from "@/utils/supabase/client-queries";
import { useRouter } from "next/navigation";
import { Divider } from "primereact/divider";
import { ApplicationDetail } from "./application/application-detail";
import { TabPanel, TabView } from "primereact/tabview";
import { CompatibilityScores } from "./compatibility/compatibility-scores";

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
    <div className="w-full px-4 py-10">
      <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 shadow-sm rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
        <header className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
            {jobListing.title}
          </h1>
          <h2 className="text-md font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            {jobListing.job_company.name}
          </h2>
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              tooltip="Edit"
              className="p-button-rounded p-button-text text-primary dark:text-primary"
              onClick={() => setEditModalVisible(true)}
            />
            <Button
              icon="pi pi-trash"
              tooltip="Delete"
              className="p-button-rounded p-button-text text-primary dark:text-primary"
              severity="danger"
              onClick={handleDelete}
            />
          </div>
          {jobListing.url && (
            <a
              href={jobListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 text-sm underline mt-2 inline-block hover:underline-offset-2">
              View listing
            </a>
          )}

          <p className="text-xs text-zinc-400 mt-1">
            Created: {new Date(jobListing.created_at).toLocaleString()}
          </p>
        </header>

        <section className="flex flex-col items-center text-center mb-6">
          <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Description
          </p>
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-4 text-sm text-zinc-800 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed text-left w-full">
            {jobListing.description}
          </div>
        </section>

        {jobListing.user_notes && (
          <section className="flex flex-col items-center text-center mb-6">
            <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Notes
            </p>
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md p-4 text-sm text-zinc-800 dark:text-zinc-100 leading-relaxed text-left w-full">
              {jobListing.user_notes}
            </div>
          </section>
        )}

        <Divider className="mt-4 mb-6 border-t border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-col text-center">
          <TabView className="text-primary">
            <TabPanel header="Application">
              <ApplicationDetail />
            </TabPanel>
            <TabPanel header="Compatibility">
              <CompatibilityScores />
            </TabPanel>
          </TabView>
        </section>
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
    </div>
  );
}
