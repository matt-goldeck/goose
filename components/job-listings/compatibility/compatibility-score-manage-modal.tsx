"use client";

import { auth } from "@/auth-client";
import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { useResume } from "@/hooks/use-resume";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export type CompatibilityScoreManageModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onSubmitCallback: () => void;
};

export default function CompatibilityScoreManageModal({
  isVisible,
  setIsVisible,
  onSubmitCallback,
}: CompatibilityScoreManageModalProps) {
  const router = useRouter();
  const { resumes } = useResume();
  const { jobListing } = useJobListingDetail();
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (resumeId: string) => {
    setSelectedResumeId(resumeId);
    setError(null);
  };

  const createScore = async (): Promise<boolean> => {
    try {
      const session = await auth();
      if (!session || !session.accessToken) {
        router.push("/sign-in");
        return false;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ICEMAN_URL}/job_listing/${jobListing!.id}/compatibility/${selectedResumeId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 409) {
          setError("A score already exists for this resume and job listing.");
        } else {
          const errorText = await response.text();
          setError(errorText || "An error occurred while creating the score.");
        }
        return false;
      }

      return true;
    } catch (err) {
      console.error("Error creating score:", err);
      setError("An unexpected error occurred. Please try again.");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!selectedResumeId) {
      setError("Please select a resume.");
      setIsSubmitting(false);
      return;
    }

    const success = await createScore();
    setIsSubmitting(false);

    if (success) {
      onSubmitCallback();
    }
  };

  return (
    <Dialog
      visible={isVisible}
      onHide={() => setIsVisible(false)}
      className="rounded-xl shadow-2xl w-full max-w-2xl"
      header={"Calculate Compatibility Score"}>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex flex-col gap-4">
          <p>Scores are calculated based on the resume you select.</p>
          <Dropdown
            id="resume_id"
            value={selectedResumeId}
            onChange={(e) => handleChange(e.value)}
            options={
              resumes.map((resume) => ({
                label: resume.name,
                value: resume.id,
              })) || []
            }
            placeholder="Select a resume"
            className="w-full"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            label="Calculate"
            className="p-3"
            type="submit"
            loading={isSubmitting}
          />
        </div>
      </form>
    </Dialog>
  );
}
