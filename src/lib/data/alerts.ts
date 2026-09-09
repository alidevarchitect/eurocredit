export interface OperationalAlert {
  tone: "red" | "amber" | "mint" | "blue";
  title: string;
  detail: string;
  time: string;
  action: "Ack" | "Retry" | "Open";
}

export const operationalAlerts: OperationalAlert[] = [
  {
    tone: "red",
    title: "Open Banking connector degraded",
    detail: "Bank of Georgia aggregation latency at 980ms; affordability pulls retrying.",
    time: "49m ago",
    action: "Retry",
  },
  {
    tone: "red",
    title: "Facility moved to non-performing",
    detail: "FAC-6310 · Davit Gelashvili at 95 DPD — routed to collections.",
    time: "8h ago",
    action: "Open",
  },
  {
    tone: "amber",
    title: "Sector concentration approaching limit",
    detail: "Hospitality exposure at 17.2% vs 18% soft limit.",
    time: "38m ago",
    action: "Open",
  },
  {
    tone: "amber",
    title: "SLA breach risk — Underwriting",
    detail: "Stage running at 82% within target (95% threshold). 31 cases at risk.",
    time: "2h ago",
    action: "Open",
  },
  {
    tone: "blue",
    title: "Model retrain scheduled",
    detail: "ec-retail-risk v5.1 → v5.2 candidate enters shadow mode tonight 02:00.",
    time: "3h ago",
    action: "Ack",
  },
  {
    tone: "mint",
    title: "Document batch auto-verified",
    detail: "Batch BX-2291 — 12 documents cleared KYC & income extraction (98.6%).",
    time: "1h ago",
    action: "Ack",
  },
];
