import { ApplicationStep } from "@/lib/types/db";
import { formatTypeString } from "@/utils/text";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";
import ApplicationStepManageModal from "./application-step-manage-modal";
import { deleteApplicationStep } from "@/utils/supabase/client-queries";
import { useJobListingDetail } from "@/hooks/use-job-listing-detail";

export type ApplicationStepTimelineContentProps = {
  step: ApplicationStep;
};

export const ApplicationStepTimelineContent = ({
  step,
}: ApplicationStepTimelineContentProps) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { loadJobListing } = useJobListingDetail();

  const handleDelete = async () => {
    if (!step) return;
    await deleteApplicationStep(step.id);
    loadJobListing();
  };

  return (
    <Card
      title={formatTypeString(step.step_type)}
      subTitle={new Date(step.created_at).toLocaleString()}
      className="bg-zinc-600 dark:bg-zinc-800">
      <p className="text-sm">{step.notes}</p>
      <div>
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
      <ApplicationStepManageModal
        applicationStep={step}
        isVisible={editModalVisible}
        setIsVisible={setEditModalVisible}
      />
    </Card>
  );
};
