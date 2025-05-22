"use client";

import { useState } from "react";
import { useJobListingDetail } from "@/hooks/use-job-listing-detail";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import CompatibilityScoreManageModal from "./compatibility-score-manage-modal";
import { ScoreMetric } from "./score-metric";

const BREAKDOWN_FIELDS = [
  { key: "skills_match", label: "Skills match", maxValue: 35 },
  { key: "experience_alignment", label: "Experience alignment", maxValue: 25 },
  { key: "education_match", label: "Education match", maxValue: 10 },
  { key: "keyword_overlap", label: "Keyword overlap", maxValue: 15 },
  { key: "resume_quality", label: "Resume quality", maxValue: 15 },
  { key: "adjustments", label: "Adjustments", maxValue: 10 },
] as const;

export function CompatibilityScores() {
  const { jobListing, loadJobListing } = useJobListingDetail();
  const compatibilityScores = jobListing?.compatibility_score ?? [];
  const [showModal, setShowModal] = useState(false);

  if (!compatibilityScores.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <h2 className="text-xl font-semibold">No Scores Found</h2>
        <p className="max-w-xs text-sm text-zinc-500">
          You haven't calculated any compatibility scores for this job yet.
        </p>
        <Button
          label="Calculate Score"
          icon="pi pi-calculator"
          className="font-jetBrainsMono"
          onClick={() => setShowModal(true)}
        />

        <CompatibilityScoreManageModal
          isVisible={showModal}
          setIsVisible={setShowModal}
          onSubmitCallback={() => {
            loadJobListing();
            setShowModal(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {compatibilityScores.map((score) => {
        const breakdown = score.score_breakdown as Record<string, number>;

        return (
          <Card
            key={score.id}
            className="relative border border-zinc-700/40 rounded-2xl shadow-sm">
            {/* Title & total score tag */}
            <header className="mb-4 flex items-start gap-2">
              <h3 className="text-lg font-semibold leading-tight font-tourney">
                {score.resume.name}
              </h3>
              <Tag
                value={`${score.total_score}/100`}
                severity={
                  score.total_score >= 80
                    ? "success"
                    : score.total_score >= 60
                      ? "info"
                      : "warning"
                }
                className="font-jetBrainsMono"
              />
            </header>

            {/* Metric grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 mb-4">
              {BREAKDOWN_FIELDS.map(({ key, label, maxValue }) =>
                breakdown[key] != null ? (
                  <ScoreMetric
                    key={key}
                    label={label}
                    value={breakdown[key]}
                    maxValue={maxValue}
                  />
                ) : null
              )}
            </section>

            {/* Explanation panel */}
            {score.explanation && (
              <Panel
                header="Context"
                toggleable
                collapsed
                className="font-tourney bg-transparent border-none">
                <p className="text-sm leading-relaxed font-jetBrainsMono">
                  {score.explanation}
                </p>
              </Panel>
            )}
          </Card>
        );
      })}

      {/* FAB-style add button */}
      <Button
        label="Add Score"
        icon="pi pi-plus"
        className="self-end mt-2 font-jetBrainsMono"
        onClick={() => setShowModal(true)}
      />

      <CompatibilityScoreManageModal
        isVisible={showModal}
        setIsVisible={setShowModal}
        onSubmitCallback={() => {
          loadJobListing();
          setShowModal(false);
        }}
      />
    </div>
  );
}
