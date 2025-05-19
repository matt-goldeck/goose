import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { Button } from "primereact/button";
import { useState, useMemo } from "react";
import ApplicationStepManageModal from "./application-step-manage-modal";
import { Timeline } from "primereact/timeline";
import { ApplicationStepTimelineContent } from "./application-step-timeline-content";
import {
  ApplicationOutcome,
  ApplicationStep,
  ApplicationStepType,
  ApplicationWithStepsAndOutcome,
} from "@/lib/types/db";
import { ApplicationTimelineComponent } from "./application-timeline-component";
import { Divider } from "primereact/divider";
import ApplicationOutcomeManageModal from "./application-outcome-manage-modal";
import { ApplicationOutlineTimelineComponent } from "./application-outcome-timeline-component";

export const ApplicationSteps = () => {
  const { jobListing } = useJobListingDetail();
  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [outcomeModalOpen, setOutcomeModalOpen] = useState(false);

  const application = jobListing?.application;
  const steps = jobListing?.application?.application_step;
  const outcome = jobListing?.application?.application_outcome;

  const isOutcomeEmpty = !outcome || Object.keys(outcome).length === 0;

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
    step: ApplicationStep | ApplicationWithStepsAndOutcome | ApplicationOutcome
  ) => {
    const isApplicationStep = "step_type" in step;
    const isApplicationOutcome = "outcome" in step;

    const iconClass = (
      isApplicationStep
        ? getStepTypeIcon((step as ApplicationStep).step_type)
        : isApplicationOutcome
        ? "pi pi-flag"
        : "pi pi-calendar"
    )


    return (
      <span className="flex w-2rem h-2rem align-items-center justify-content-center text-primary">
        <i className={iconClass}></i>
      </span>
    );
  };

  const getTimelineContentForItem = (
    item: ApplicationStep | ApplicationWithStepsAndOutcome | ApplicationOutcome
  ): React.ReactNode => {
    const isApplicationStep = "step_type" in item;
    const isApplicationOutcome = "outcome" in item;
    if (isApplicationStep) {
      return (
        <ApplicationStepTimelineContent
          key={item.id}
          step={item as ApplicationStep}
        />
      );
    } else if (isApplicationOutcome) {
      return (
        <ApplicationOutlineTimelineComponent
          key={item.id}
          applicationOutcome={item as ApplicationOutcome}
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

  // If there is an outcome, include it in the timeline
  const items = isOutcomeEmpty
    ? [application, ...sortedSteps]
    : [application, ...sortedSteps, outcome];

  return (
    <div>
      <Timeline
        value={items}
        align="alternate"
        marker={customizedMarker}
        content={getTimelineContentForItem}
      />
      <Divider className="mt-4 mb-6 border-t" />
      {/* Only show add buttons if outcome is empty */}
      {isOutcomeEmpty && (
        <div>
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
            onClick={() => setOutcomeModalOpen(true)}
          />
        </div>
      )}

      <ApplicationStepManageModal
        isVisible={stepModalOpen}
        setIsVisible={setStepModalOpen}
      />
      <ApplicationOutcomeManageModal
        isVisible={outcomeModalOpen}
        setIsVisible={setOutcomeModalOpen}
      />
    </div>
  );
};
