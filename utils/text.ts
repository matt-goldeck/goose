import { ApplicationStepType } from "@/lib/types/db";

export const formatTypeString = (typeString: ApplicationStepType) => {
  return typeString.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
