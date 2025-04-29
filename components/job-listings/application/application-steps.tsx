import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { Button } from "primereact/button";
import { useState, useMemo } from "react";
import ApplicationStepManageModal from "./application-step-manage-modal";
import { Timeline } from "primereact/timeline";

import { ApplicationStepTimelineContent } from "./application-step-timeline-content";
import { ApplicationStep, ApplicationStepType } from "@/lib/types/db";

export const ApplicationSteps = () => {
  const { jobListing } = useJobListingDetail();
  const [stepModalOpen, setStepModalOpen] = useState(false);

  const steps = jobListing?.application?.application_step;

  const sortedSteps = useMemo(() => {
    if (!steps) return [];
    return [...steps].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }, [steps]);

  const getStepTypeIcon = (type: ApplicationStepType): string => {
    switch (type) {
      case "phone_screener":
        return "pi pi-phone";
      case "interview":
        return "pi pi-comments";
      case "onsite":
        return "pi pi-building";
      case "final_round":
        return "pi pi-star";
      default:
        return "pi pi-question";
    }
  };

  const customizedMarker = (step: ApplicationStep) => {
    return (
      <span className="flex w-2rem h-2rem align-items-center justify-content-center text-primary">
        <i className={getStepTypeIcon(step.step_type)}></i>
      </span>
    );
  };

  return (
    <div>
      <Timeline
        value={sortedSteps}
        align="alternate"
        marker={customizedMarker}
        content={(item) => {
          return <ApplicationStepTimelineContent step={item} />;
        }}
      />
      <Button
        icon="pi pi-plus"
        tooltip="Add Step"
        className="p-button-rounded p-button-text text-primary dark:text-primary"
        onClick={() => setStepModalOpen(true)}
      />
      <ApplicationStepManageModal
        isVisible={stepModalOpen}
        setIsVisible={setStepModalOpen}
      />
    </div>
  );
};