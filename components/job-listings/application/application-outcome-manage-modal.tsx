import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { Dialog } from "primereact/dialog";
import ApplicationOutcomeForm from "./application-outcome-form";
import {
  createApplicationOutcome,
  updateApplicationOutcome,
} from "@/utils/supabase/client-queries";
import { ApplicationOutcome } from "@/lib/types/db";

export type ApplicationOutcomeManageModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

export default function ApplicationOutcomeManageModal({
  isVisible,
  setIsVisible,
}: ApplicationOutcomeManageModalProps) {
  const { jobListing, loadJobListing } = useJobListingDetail();
  const applicationOutcome = jobListing?.application?.application_outcome;

  const onFormSubmit = async (outcome: Partial<ApplicationOutcome>) => {
    const isNewOutcome = !applicationOutcome || !applicationOutcome.id;
    if (isNewOutcome) {
      await createApplicationOutcome({
        ...outcome,
        // need to augment w/ the application id
        application_id: jobListing!.application!.id,
      });
    } else {
      await updateApplicationOutcome(outcome);
    }
    loadJobListing();
    setIsVisible(false);
  };

  return (
    <Dialog
      visible={isVisible}
      onHide={() => {
        setIsVisible(false);
      }}
      className="rounded-xl shadow-2xl w-full max-w-2xl"
      header={applicationOutcome ? "Edit Outcome" : "Log Outcome"}>
      <ApplicationOutcomeForm
        applicationOutcome={applicationOutcome}
        onSubmit={onFormSubmit}
      />
    </Dialog>
  );
}
