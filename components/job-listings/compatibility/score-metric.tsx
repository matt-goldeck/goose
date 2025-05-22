import { Tag } from "primereact/tag";

// TODO: a cleaner way do this entire component, but I'm lazy and it works
export type ScoreMetricProps = {
  label: string;
  value: number;
  maxValue: number;
};

export function ScoreMetric({ label, value, maxValue }: ScoreMetricProps) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  let severity: "success" | "info" | "warning" | "danger" | undefined;

  if (label === "Adjustments") {
    // Adjustments can be +- 10
    if (value > 5) {
      severity = "success";
    } else if (value > 0) {
      severity = "info";
    } else if ((value = 0)) {
      severity = "warning";
    } else {
      severity = "danger";
    }
  } else {
    if (percentage >= 80) {
      severity = "success";
    } else if (percentage >= 60) {
      severity = "info";
    } else if (percentage >= 40) {
      severity = "warning";
    } else {
      severity = "danger";
    }
  }

  return (
    <div key={label} className="flex justify-between items-center">
      <span className="text-sm">{label}</span>
      <Tag
        value={`${value} / ${maxValue}`}
        severity={severity}
        className="ml-2 font-jetBrainsMono"
      />
    </div>
  );
}
