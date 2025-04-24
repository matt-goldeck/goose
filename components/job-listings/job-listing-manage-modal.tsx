import { Dialog } from "primereact/dialog";
import { JobListingWithCompany } from "@/lib/types/db";
import JobListingForm from "./job-listing-form";

export interface JobListingManageModalProps {
  jobListing?: JobListingWithCompany;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onSubmitCallback: () => void;
}

export default function JobListingManageModal({
  jobListing,
  isVisible,
  setIsVisible,
  onSubmitCallback,
}: JobListingManageModalProps) {
  return (
    <Dialog
      visible={isVisible}
      onHide={() => setIsVisible(false)}
      className="rounded-xl shadow-2xl w-full max-w-2xl"
      header={
        jobListing ? "Edit Job Listing" : "Add Job Listing"
      }
      >
      <JobListingForm
        jobListing={jobListing}
        onSubmitCallback={onSubmitCallback}
      />
    </Dialog>
  );
}
