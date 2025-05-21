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
    return <ProgressSpinner />;
  }
  if (!jobListing.application) {
    return (
      <div className="flex flex-col items-center justify-center h-full ">
        <h2 className="text-2xl font-semibold">No Application Found</h2>
        <p className="text-sm">You have not applied for this job yet.</p>
        <Button
          label="Apply to Job"
          className="mt-4 p-3"
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
