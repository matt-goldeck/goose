"use client";

import {
  APPLICATION_STEP_TYPES,
  ApplicationStep,
  ApplicationStepType,
} from "@/lib/types/db";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { formatTypeString } from "@/utils/text";

const stepTypeOptions = APPLICATION_STEP_TYPES.map((type) => ({
  label: formatTypeString(type),
  value: type,
}));

export interface ApplicationStepFormProps {
  applicationStep?: ApplicationStep;
  onSubmit?: (step: Partial<ApplicationStep>) => void;
}

export default function ApplicationStepForm({
  applicationStep,
  onSubmit,
}: ApplicationStepFormProps) {
  const [stepType, setStepType] = useState(applicationStep?.step_type ?? "");
  const [notes, setNotes] = useState(applicationStep?.notes ?? "");
  const [createdAt, setCreatedAt] = useState<Date>(
    applicationStep?.created_at
      ? new Date(applicationStep.created_at)
      : new Date()
  );

  const handleSubmit = () => {
    if (!stepType) return;
    onSubmit?.({
      ...applicationStep,
      step_type: stepType as ApplicationStepType,
      notes,
      created_at: createdAt.toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Step Type</label>
        <Dropdown
          value={stepType}
          options={stepTypeOptions}
          onChange={(e) => setStepType(e.value)}
          placeholder="Select a step"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Calendar
          value={createdAt}
          onChange={(e) => setCreatedAt(e.value as Date)}
          showIcon
          showTime
          hourFormat="12"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <InputTextarea
          value={notes ?? ""}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full"
        />
      </div>
      <div className="flex justify-end">
        <Button label="Save" onClick={handleSubmit} />
      </div>
    </div>
  );
}
