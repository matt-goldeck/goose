import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { createApplication } from "@/utils/supabase/client-queries";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import { ApplicationSteps } from "./application-steps";

export const ApplicationDetail = () => {
  const { jobListing, isLoadingJobListing, loadJobListing } =
    useJobListingDetail();

  console.log("jobListing", jobListing);
  if (isLoadingJobListing || !jobListing) {
    return <ProgressSpinner />;
  }
  if (!jobListing.application) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          No Application Found
        </h2>
        <p className="text-sm text-zinc-500">
          You have not applied for this job yet.
        </p>
        <Button
          label="Apply to Job"
          className="mt-4 bg-zinc-700 p-3"
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
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
        Application
      </h2>
      <p className="text-sm text-zinc-500">
        Applied at:{" "}
        {new Date(jobListing.application.applied_on).toLocaleString()}
      </p>
      <TabView className="text-primary">
        <TabPanel header="Steps">
          <ApplicationSteps/>
        </TabPanel>
        <TabPanel header="Outcome"></TabPanel>
      </TabView>
    </div>
  );
};
