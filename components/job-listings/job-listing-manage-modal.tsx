import { Dialog } from "primereact/dialog";
import { JobListingWithCompany } from "@/lib/types/db";
import JobListingForm from "./job-listing-form";
import { useJobListing } from "@/hooks/use-job-listing";

export interface JobListingManageModalProps {
  jobListing?: JobListingWithCompany;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function JobListingManageModal({
  jobListing,
  isVisible,
  setIsVisible,
}: JobListingManageModalProps) {
  const { loadJobListings } = useJobListing();
  return (
    <Dialog
      visible={isVisible}
      onHide={() => setIsVisible(false)}
      className="bg-white text-black dark:bg-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl w-full max-w-2xl p-6">
      <JobListingForm
        jobListing={jobListing}
        onSubmitCallback={() => {
          loadJobListings();
          setIsVisible(false);
        }}
      />
    </Dialog>
  );
}
