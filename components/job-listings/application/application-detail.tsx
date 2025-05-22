import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { createApplication } from "@/utils/supabase/client-queries";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import { ApplicationSteps } from "./application-steps";

export const ApplicationDetail = () => {
  const { jobListing, isLoadingJobListing, loadJobListing } =
    useJobListingDetail();

  if (isLoadingJobListing || !jobListing) {
    return (
      <div className="flex justify-center items-center py-10">
        <ProgressSpinner />
      </div>
    );
  }

  if (!jobListing.application) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <h2 className="text-xl font-semibold">No Application Found</h2>
        <p className="max-w-xs text-sm text-zinc-500">
          You haven't submitted an application for this job listing yet.
        </p>
        <Button
          label="Apply to Job"
          icon="pi pi-send"
          className="font-jetBrainsMono"
          onClick={async () => {
            await createApplication(jobListing.id);
            loadJobListing();
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ApplicationSteps />
    </div>
  );
};