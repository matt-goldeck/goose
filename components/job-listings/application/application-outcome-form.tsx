"use client";

import {
    APPLICATION_OUTCOME_TYPES,
  ApplicationOutcome,
} from "@/lib/types/db";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { formatOutcomeTypeString } from "@/utils/text";

const outcomeOptions = APPLICATION_OUTCOME_TYPES.map((type) => ({
  label: formatOutcomeTypeString(type),
  value: type,
}));

export type ApplicationOutcomeFormProps = {
  applicationOutcome?: ApplicationOutcome | null;
  onSubmit?: (outcome: Partial<ApplicationOutcome>) => void;
};

export default function ApplicationOutcomeForm({
  applicationOutcome,
  onSubmit,
}: ApplicationOutcomeFormProps) {
  const [outcome, setOutcome] = useState(
    applicationOutcome?.outcome ?? null
  );
  const [notes, setNotes] = useState(applicationOutcome?.notes ?? "");
  const [createdAt, setCreatedAt] = useState<Date>(
    applicationOutcome?.created_at
      ? new Date(applicationOutcome.created_at)
      : new Date()
  );

  const handleSubmit = () => {
    if (!outcome) return;
    onSubmit?.({
      ...applicationOutcome,
      outcome,
      notes,
      created_at: createdAt.toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Outcome</label>
        <Dropdown
          value={outcome}
          options={outcomeOptions}
          onChange={(e) => setOutcome(e.value)}
          placeholder="Select an outcome"
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