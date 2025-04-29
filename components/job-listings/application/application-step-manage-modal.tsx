import { ApplicationStep } from "@/lib/types/db";
import { Dialog } from "primereact/dialog";
import ApplicationStepForm from "./application-step-form";

import {
  createApplicationStep,
  updateApplicationStep,
} from "@/utils/supabase/client-queries";
import { useJobListingDetail } from "@/hooks/use-job-listing-detail";

export interface ApplicationStepManageModalProps {
  applicationStep?: ApplicationStep;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function ApplicationStepManageModal({
  applicationStep,
  isVisible,
  setIsVisible,
}: ApplicationStepManageModalProps) {
  const { jobListing, loadJobListing } = useJobListingDetail();

  const onFormSubmit = async (step: Partial<ApplicationStep>) => {
    if (!applicationStep) {
      await createApplicationStep({
        ...step,
        // need to augment w/ the application id
        application_id: jobListing!.application!.id,
      });
    } else {
      await updateApplicationStep(step);
    }
    loadJobListing();
    setIsVisible(false);
  };

  return (
    <Dialog
      visible={isVisible}
      onHide={() => setIsVisible(false)}
      className="rounded-xl shadow-2xl w-full max-w-2xl"
      header={applicationStep ? "Edit Step" : "Add Step"}>
      <ApplicationStepForm
        applicationStep={applicationStep}
        onSubmit={onFormSubmit}
      />
    </Dialog>
  );
}
