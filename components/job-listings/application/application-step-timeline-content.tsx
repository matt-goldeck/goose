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

  const footer = (
    <>
      <Button
        icon="pi pi-pencil"
        tooltip="Edit"
        onClick={() => setEditModalVisible(true)}
        text
        rounded
      />
      <Button
        icon="pi pi-trash"
        tooltip="Delete"
        severity="danger"
        onClick={handleDelete}
        text
        rounded
      />
    </>
  );

  return (
    <Card
      title={formatTypeString(step.step_type)}
      subTitle={new Date(step.created_at).toLocaleString()}
      footer={footer}
      className="outline-harvest outline"
    >
      {step.notes}
      <ApplicationStepManageModal
        applicationStep={step}
        isVisible={editModalVisible}
        setIsVisible={setEditModalVisible}
      />
    </Card>
  );
};
