export interface RoadmapPhase {
  id: string;
  order: number;
  title: string;
  weeks: string;
  status: "Active" | "Planned";
  columnA: string[];
  columnB: string[];
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "phase1",
    order: 1,
    title: "Discovery & data assessment",
    weeks: "Weeks 1–2",
    status: "Active",
    columnA: ["ALTA API inventory", "Historical data profiling", "Process discovery workshops"],
    columnB: ["CRM integration contract", "Risk policy / matrix mapping"],
  },
  {
    id: "phase2",
    order: 2,
    title: "Decisioning foundation",
    weeks: "Weeks 3–6",
    status: "Planned",
    columnA: ["Rules engine", "Explainability & audit model", "Manual-review routing"],
    columnB: ["External bureau / registry adapters", "Baseline historical model"],
  },
  {
    id: "phase3",
    order: 3,
    title: "Workflow & Document AI",
    weeks: "Weeks 7–10",
    status: "Planned",
    columnA: ["Document extraction", "Task orchestration", "CRM-triggered communications"],
    columnB: ["Validation workflows", "Escalation & SLA engine"],
  },
  {
    id: "phase4",
    order: 4,
    title: "Portfolio intelligence",
    weeks: "Weeks 11–13",
    status: "Planned",
    columnA: ["Portfolio monitoring", "Segment & regional analytics"],
    columnB: ["Model monitoring", "Champion / challenger governance"],
  },
  {
    id: "phase5",
    order: 5,
    title: "Hardening & rollout",
    weeks: "Weeks 14–16",
    status: "Planned",
    columnA: ["Security & compliance review", "UAT with underwriting team"],
    columnB: ["Production cutover", "Hypercare support"],
  },
];

export const discoveryOutputs = [
  { title: "System architecture", sub: "Target-state ALTA + CRM + AI topology" },
  { title: "Integration specification", sub: "API events, ownership and retry behavior" },
  { title: "Data assessment", sub: "Availability, quality and model readiness" },
  { title: "Scoring approach", sub: "Rules + baseline + challenger methodology" },
  { title: "Automation backlog", sub: "Prioritized manual processes to automate" },
  { title: "Delivery plan", sub: "Pilot roadmap · 14–16 weeks" },
];

export const architecturePrinciple =
  "ALTA remains the lending system of record. The intelligence layer consumes events, orchestrates external checks and workflows, then writes governed decisions and outcomes back to ALTA and CRM.";
