import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { ApplicationWithStepsAndOutcome } from "@/lib/types/db";
import { deleteApplication } from "@/utils/supabase/client-queries";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export type ApplicationTimelineComponentProps = {
  application: ApplicationWithStepsAndOutcome;
};

export const ApplicationTimelineComponent = ({
  application,
}: ApplicationTimelineComponentProps) => {
  const { loadJobListing } = useJobListingDetail();
  const handleDelete = async () => {
    if (!application) return;
    await deleteApplication(application.id);
    loadJobListing();
  };

  return (
    <Card
      title="Applied"
      subTitle={new Date(application.created_at).toLocaleString()}>
      <Button
        icon="pi pi-trash"
        tooltip="Delete"
        className="dark:text-primary"
        severity="danger"
        text
        rounded
        onClick={handleDelete}
      />
    </Card>
  );
};
