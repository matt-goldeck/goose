import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { Button } from "primereact/button";
import { useState, useMemo } from "react";
import ApplicationStepManageModal from "./application-step-manage-modal";
import { Timeline } from "primereact/timeline";

import { ApplicationStepTimelineContent } from "./application-step-timeline-content";
import {
  ApplicationStep,
  ApplicationStepType,
  ApplicationWithStepsAndOutcome,
} from "@/lib/types/db";
import { ApplicationTimelineComponent } from "./application-timeline-component";
import { Divider } from "primereact/divider";

export const ApplicationSteps = () => {
  const { jobListing } = useJobListingDetail();
  const [stepModalOpen, setStepModalOpen] = useState(false);

  const application = jobListing?.application;
  const steps = jobListing?.application?.application_step;
  const outcome = jobListing?.application?.application_outcome;

  const sortedSteps = useMemo(() => {
    if (!steps) return [];
    return [...steps].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
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

  const customizedMarker = (
    step: ApplicationStep | ApplicationWithStepsAndOutcome
  ) => {
    const isApplicationStep = "step_type" in step;

    const iconClass = isApplicationStep
      ? getStepTypeIcon(step.step_type)
      : "pi pi-check-circle";

    return (
      <span className="flex w-2rem h-2rem align-items-center justify-content-center text-primary">
        <i className={iconClass}></i>
      </span>
    );
  };

  const getTimelineContentForItem = (
    item: ApplicationStep | ApplicationWithStepsAndOutcome
  ): React.ReactNode => {
    const isApplicationStep = "step_type" in item;
    if (isApplicationStep) {
      return (
        <ApplicationStepTimelineContent
          key={item.id}
          step={item as ApplicationStep}
        />
      );
    }
    return (
      <ApplicationTimelineComponent
        key={item.id}
        application={item as ApplicationWithStepsAndOutcome}
      />
    );
  };

  return (
    <div>
      <Timeline
        value={[application, ...sortedSteps]}
        align="alternate"
        marker={customizedMarker}
        content={getTimelineContentForItem}
      />
      <Divider className="mt-4 mb-6 border-t border-zinc-300 dark:border-zinc-700" />
      <Button
        icon="pi pi-plus"
        tooltip="Add Step"
        className="p-button-rounded p-button-text text-primary dark:text-primary"
        onClick={() => setStepModalOpen(true)}
      />
      <Button
        icon="pi pi-check-circle"
        tooltip="Add Outcome"
        className="p-button-rounded p-button-text text-primary dark:text-primary"
      />
      <ApplicationStepManageModal
        isVisible={stepModalOpen}
        setIsVisible={setStepModalOpen}
      />
    </div>
  );
};
