export const readinessKpis = [
  { label: "Data quality score", value: "90%", sub: "Good" },
  { label: "Sources ready", value: "3/6", sub: "3 require review" },
  { label: "Historical rows", value: "3.7M", sub: "Across 6 domains" },
  { label: "Critical blockers", value: "0", sub: "No blockers" },
];

export interface DataSource {
  name: string;
  rows: string;
  completeness: number;
  quality: number;
  status: "Ready" | "Review";
  note: string;
}

export const dataSources: DataSource[] = [
  { name: "ALTA loan applications", rows: "284,002", completeness: 98, quality: 96, status: "Ready", note: "2% optional fields missing" },
  { name: "Repayment history", rows: "1,874,932", completeness: 99, quality: 97, status: "Ready", note: "Strong outcome coverage" },
  { name: "Credit bureau snapshots", rows: "266,418", completeness: 94, quality: 92, status: "Ready", note: "Legacy records have partial history" },
  { name: "Debt registry", rows: "251,883", completeness: 91, quality: 90, status: "Review", note: "Older applications need backfill" },
  { name: "CRM behavioral events", rows: "148,902", completeness: 62, quality: 78, status: "Review", note: "CRM rollout not yet complete" },
  { name: "Borrower documents", rows: "918,447", completeness: 88, quality: 85, status: "Review", note: "Mixed scan quality and formats" },
];

export const modelReadyOutcome =
  '"Good" = 0x 30+ DPD in the first 12 months. "Bad" = 90+ DPD or written-off within 24 months. Indeterminate accounts are excluded from training.';

export const discoveryQuestions = [
  "Which CRM behavioral fields are populated pre-2024?",
  "Can debt registry backfill reach 95% coverage before model training?",
  "What is the target SLA for document OCR turnaround?",
];

export const readinessRecommendation =
  "Data is sufficient to begin decisioning-model development on ALTA and bureau sources today. Prioritize CRM behavioral backfill in parallel — it is the primary blocker to the challenger model's target Q4 accuracy uplift.";
