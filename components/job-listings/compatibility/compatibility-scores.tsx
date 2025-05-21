"use client";

import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { ScoreMetric } from "./score-metric";
import { Button } from "primereact/button";
import { useState } from "react";
import CompatibilityScoreManageModal from "./compatibility-score-manage-modal";

const BREAKDOWN_FIELDS: { key: string; label: string; maxValue: number }[] = [
  { key: "skills_match", label: "Skills match", maxValue: 35 },
  { key: "experience_alignment", label: "Experience alignment", maxValue: 25 },
  { key: "education_match", label: "Education match", maxValue: 10 },
  { key: "keyword_overlap", label: "Keyword overlap", maxValue: 15 },
  { key: "resume_quality", label: "Resume quality", maxValue: 15 },
  { key: "adjustments", label: "Adjustments", maxValue: 10 },
];

export function CompatibilityScores() {
  const { jobListing, loadJobListing } = useJobListingDetail();
  const compatibilityScores = jobListing?.compatibility_score;
  const [isAddScoreModalVisible, setIsAddScoreModalVisible] = useState(false);

  if (!compatibilityScores || compatibilityScores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          No Scores Found
        </h2>
        <p className="text-sm text-zinc-500">
          You have not calculated any compatibility scores for this job listing.
        </p>
        <Button
          label="Calculate Score"
          className="mt-4 p-3 font-jetBrainsMono"
          onClick={() => setIsAddScoreModalVisible(true)}
        />
        <CompatibilityScoreManageModal
          isVisible={isAddScoreModalVisible}
          setIsVisible={setIsAddScoreModalVisible}
          onSubmitCallback={() => {
            loadJobListing();
            setIsAddScoreModalVisible(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {compatibilityScores.map((score) => {
        const breakdown = score.score_breakdown as Record<string, number>;

        return (
          <Card
            key={score.id}
            title={score.resume.name}
            subTitle={`Score: ${score.total_score}/100`}>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {BREAKDOWN_FIELDS.map(({ key, label, maxValue }) => {
                const value = breakdown?.[key];
                if (value === undefined || value === null) return null;
                return (
                  <ScoreMetric
                    key={key}
                    label={label}
                    value={value}
                    maxValue={maxValue}
                  />
                );
              })}
            </div>

            {score.explanation && (
              <Panel header="Explanation" toggleable collapsed>
                <p className="text-sm text-gray-700">{score.explanation}</p>
              </Panel>
            )}
          </Card>
        );
      })}
      <Button
        label="Add a Score"
        className="mt-4 p-3"
        onClick={() => setIsAddScoreModalVisible(true)}
      />
      <CompatibilityScoreManageModal
        isVisible={isAddScoreModalVisible}
        setIsVisible={setIsAddScoreModalVisible}
        onSubmitCallback={() => {
          loadJobListing();
          setIsAddScoreModalVisible(false);
        }}
      />
    </div>
  );
}
