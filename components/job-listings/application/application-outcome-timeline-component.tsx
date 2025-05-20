import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { ApplicationOutcome } from "@/lib/types/db";
import { deleteApplicationOutcome } from "@/utils/supabase/client-queries";
import { formatOutcomeTypeString } from "@/utils/text";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ApplicationOutcomeManageModal from "./application-outcome-manage-modal";
import { useState } from "react";

export type ApplicationOutcomeTimelineComponentProps = {
  applicationOutcome: ApplicationOutcome;
};

export const ApplicationOutlineTimelineComponent = ({
  applicationOutcome,
}: ApplicationOutcomeTimelineComponentProps) => {
  const { loadJobListing } = useJobListingDetail();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleDelete = async () => {
    if (!applicationOutcome) return;
    await deleteApplicationOutcome(applicationOutcome.id);
    loadJobListing();
  };

  const footer = (
    <>
      {" "}
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
    </>
  );
  return (
    <Card
      title={formatOutcomeTypeString(applicationOutcome.outcome)}
      subTitle={new Date(applicationOutcome.created_at).toLocaleString()}
      footer={footer}
      className="outline-harvest outline">
      <p className="text-sm">{applicationOutcome.notes}</p>
      <ApplicationOutcomeManageModal
        isVisible={editModalVisible}
        setIsVisible={setEditModalVisible}
      />
    </Card>
  );
};
