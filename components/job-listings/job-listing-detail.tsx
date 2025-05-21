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
    if (
      window.confirm(`Are you sure you want to delete "${jobListing.title}"?`)
    ) {
      await deleteJobListing(jobListing.id);
      router.push("/dashboard");
    }
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
      <Card className="w-full max-w-3xl mx-auto shadow-sm rounded-2xl p-6 outline">
        <header className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-semibold font-tourney">{jobListing.title}</h1>
          <h2 className="text-md font-semibold mb-2 font-tourney">
            {jobListing.job_company.name}
          </h2>
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              tooltip="Edit"
              className="p-button-rounded p-button-text"
              onClick={() => setEditModalVisible(true)}
            />
            <Button
              icon="pi pi-trash"
              tooltip="Delete"
              className="p-button-rounded p-button-text"
              severity="danger"
              onClick={handleDelete}
            />
          </div>
          {jobListing.url && (
            <a
              href={jobListing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-harvest text-sm underline mt-2 inline-block hover:underline-offset-2">
              View listing
            </a>
          )}

          <p className="text-xs mt-1">
            Created: {new Date(jobListing.created_at).toLocaleString()}
          </p>
        </header>

        <section className="flex flex-col items-center text-center mb-6">
          <p className="font-semibold mb-2 font-tourney">Description</p>
          <div className="rounded-md p-4 text-sm whitespace-pre-wrap leading-relaxed text-left w-full">
            {jobListing.description}
          </div>
        </section>

        {jobListing.user_notes && (
          <section className="flex flex-col items-center text-center mb-6">
            <p className="font-semibold mb-2 font-tourney">Notes</p>
            <div className="rounded-md p-4 text-sm leading-relaxed text-left w-full">
              {jobListing.user_notes}
            </div>
          </section>
        )}

        <Divider className="mt-4 mb-6 border-t" />
        <section className="flex flex-col text-center">
          <TabView>
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
