import { ApplicationOutcomeType, ApplicationStepType } from "@/lib/types/db";

export const formatTypeString = (typeString: ApplicationStepType) => {
  return typeString.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export const formatOutcomeTypeString = (typeString: ApplicationOutcomeType) => {
  return typeString.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
