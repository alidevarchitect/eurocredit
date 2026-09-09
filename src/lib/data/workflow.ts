export interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  category: "Routing" | "Notification" | "Approval" | "Compliance" | "Collections";
  today: number;
  runs30d: number;
  success: string;
  lastRun: string;
  active: boolean;
}

export const automationRules: AutomationRule[] = [
  { id: "r1", name: "Senior underwriter routing", condition: "Risk Score > 70", action: "Send to Senior Underwriter", category: "Routing", today: 6, runs30d: 142, success: "99.2%", lastRun: "8m ago", active: true },
  { id: "r2", name: "Missing-document follow-up", condition: "Documents = Missing", action: "Notify Customer", category: "Notification", today: 14, runs30d: 318, success: "97.5%", lastRun: "2m ago", active: true },
  { id: "r3", name: "Large-exposure approval", condition: "Loan Amount > €50,000", action: "Manager Approval Required", category: "Approval", today: 4, runs30d: 96, success: "100%", lastRun: "15m ago", active: true },
  { id: "r4", name: "Bureau-failure compliance", condition: "Credit Bureau = Failed", action: "Compliance Review", category: "Compliance", today: 1, runs30d: 11, success: "100%", lastRun: "1h ago", active: true },
  { id: "r5", name: "High-risk manual review", condition: "Customer Segment = High Risk", action: "Manual Review", category: "Routing", today: 3, runs30d: 64, success: "98.4%", lastRun: "44m ago", active: true },
  { id: "r6", name: "Prime auto-approval", condition: "Risk Score ≥ 78 · ≤ €30K", action: "Auto-approve & fund", category: "Approval", today: 41, runs30d: 1284, success: "99.1%", lastRun: "18m ago", active: true },
  { id: "r7", name: "DPD early-warning", condition: "Days Past Due ≥ 15", action: "Flag for Collections", category: "Collections", today: 2, runs30d: 30, success: "100%", lastRun: "8h ago", active: true },
  { id: "r8", name: "KYC refresh reminder", condition: "KYC Expiry ≤ 30 days", action: "Request KYC Refresh", category: "Notification", today: 0, runs30d: 0, success: "—", lastRun: "Paused", active: false },
  { id: "r9", name: "AML transaction monitoring", condition: "Transaction flagged AML rule", action: "Open Compliance Case", category: "Compliance", today: 3, runs30d: 47, success: "100%", lastRun: "1h ago", active: true },
  { id: "r10", name: "Customer complaint SLA", condition: "Complaint age > 48h", action: "Escalate to Ops Manager", category: "Routing", today: 1, runs30d: 22, success: "98%", lastRun: "3h ago", active: true },
];

export interface EscalationTicket {
  id: string;
  title: string;
  appId: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  timeLeft: string;
  overdue: boolean;
  owner: string;
}

export interface EscalationTier {
  key: string;
  label: string;
  hint: string;
  tickets: EscalationTicket[];
}

export const escalationBoard: EscalationTier[] = [
  {
    key: "l1",
    label: "L1 · Team queue",
    hint: "Standard operations",
    tickets: [
      { id: "t1", title: "KYC refresh follow-up", appId: "APP-7691 · Mariam Tsiklauri", priority: "Medium", timeLeft: "1h 40m left", overdue: false, owner: "TN" },
      { id: "t2", title: "Disbursement setup", appId: "APP-7708 · Helios Renewables", priority: "High", timeLeft: "19h 40m left", overdue: false, owner: "TN" },
      { id: "t3", title: "Collect outstanding tax returns", appId: "APP-7725 · Kakheti Wines", priority: "Medium", timeLeft: "23h 40m left", overdue: false, owner: "TN" },
    ],
  },
  {
    key: "l2",
    label: "L2 · Senior underwriting",
    hint: "Specialist review",
    tickets: [
      { id: "t4", title: "Manual review — high-risk segment", appId: "APP-7641 · V. Sturua", priority: "High", timeLeft: "Overdue 50m", overdue: true, owner: "AD" },
      { id: "t5", title: "Senior sign-off", appId: "APP-7733 · Adjara Hospitality", priority: "High", timeLeft: "2h 40m left", overdue: false, owner: "AD" },
      { id: "t6", title: "Founder guarantee paperwork", appId: "APP-7719 · Caucasus AgriTech", priority: "Medium", timeLeft: "1d 21h left", overdue: false, owner: "AD" },
      { id: "t7", title: "Covenant review", appId: "APP-7741 · Kazbegi Energy", priority: "Low", timeLeft: "6d 21h left", overdue: false, owner: "SM" },
    ],
  },
  {
    key: "l3",
    label: "L3 · Manager approval",
    hint: "Authority sign-off",
    tickets: [
      { id: "t8", title: "Manager approval — €2.9M", appId: "APP-7662 · Rustavi Steel", priority: "High", timeLeft: "4h 40m left", overdue: false, owner: "SM" },
    ],
  },
  {
    key: "l4",
    label: "L4 · Compliance",
    hint: "Regulatory & risk",
    tickets: [
      { id: "t9", title: "Compliance review — bureau pull failed", appId: "APP-7669 · Davit Gelashvili", priority: "High", timeLeft: "2h 10m left", overdue: false, owner: "LP" },
      { id: "t10", title: "NPL recovery action", appId: "APP-7669 · Davit Gelashvili", priority: "Urgent", timeLeft: "2h 10m left", overdue: false, owner: "LP" },
    ],
  },
];

export interface WorkflowActivity {
  id: string;
  label: string;
  detail: string;
  time: string;
  code: string;
  tone: "mint" | "amber" | "blue" | "purple" | "red";
}

export const workflowActivity: WorkflowActivity[] = [
  { id: "a1", label: "Customer notified — documents missing", detail: "Kakheti Wines · 2 documents requested", time: "2m ago", code: "AR-02", tone: "blue" },
  { id: "a2", label: "Routed to senior underwriting", detail: "APP-7733 Adjara Hospitality · risk-score rule", time: "8m ago", code: "AR-01", tone: "purple" },
  { id: "a3", label: "Escalated to manager approval", detail: "APP-7662 Rustavi Steel · €2.9M exposure", time: "15m ago", code: "AR-03", tone: "amber" },
  { id: "a4", label: "Manual review triggered", detail: "APP-7641 V. Sturua · high-risk segment", time: "44m ago", code: "AR-05", tone: "amber" },
  { id: "a5", label: "Compliance review opened", detail: "APP-7669 · credit bureau pull failed", time: "1h ago", code: "AR-04", tone: "red" },
  { id: "a6", label: "12 applications auto-approved", detail: "Prime retail · straight-through funding", time: "1h ago", code: "AR-06", tone: "mint" },
  { id: "a7", label: "SLA breach warning", detail: "WT-3311 manual review · under 1h remaining", time: "3h ago", code: "AR-01", tone: "red" },
  { id: "a8", label: "Task completed", detail: "WT-3304 ID re-submitted · Tamar Lomidze", time: "4h ago", code: "AR-02", tone: "mint" },
  { id: "a9", label: "DPD early-warning swept portfolio", detail: "2 facilities flagged for collections", time: "6h ago", code: "AR-07", tone: "amber" },
];

export interface TaskQueueItem {
  id: string;
  title: string;
  meta: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In progress" | "Blocked";
  timeLeft: string;
  overdue: boolean;
  owner: string;
}

export const taskQueue: TaskQueueItem[] = [
  { id: "q1", title: "Manual review — high-risk segment (V. Sturua)", meta: "Underwriting · Open", priority: "High", status: "Open", timeLeft: "Overdue 50m", overdue: true, owner: "AD-05" },
  { id: "q2", title: "KYC refresh follow-up — Mariam Tsiklauri", meta: "Compliance · Open", priority: "Medium", status: "Open", timeLeft: "1h 40m left", overdue: false, owner: "TN-02" },
  { id: "q3", title: "Compliance review — credit bureau pull failed", meta: "Compliance · Open", priority: "High", status: "Open", timeLeft: "2h 10m left", overdue: false, owner: "LP-04" },
  { id: "q4", title: "NPL recovery action — Davit Gelashvili", meta: "Collections · In progress", priority: "Urgent", status: "In progress", timeLeft: "2h 10m left", overdue: false, owner: "LP-07" },
  { id: "q5", title: "Senior sign-off — Adjara Hospitality", meta: "Credit approval · In progress", priority: "High", status: "In progress", timeLeft: "2h 40m left", overdue: false, owner: "AD-01" },
  { id: "q6", title: "Manager approval — Rustavi Steel €2.9M", meta: "Approval · Open", priority: "High", status: "Open", timeLeft: "4h 40m left", overdue: false, owner: "SM-03" },
  { id: "q7", title: "Disbursement setup — Helios Renewables", meta: "Funding · In progress", priority: "High", status: "In progress", timeLeft: "19h 40m left", overdue: false, owner: "TN-06" },
  { id: "q8", title: "Collect outstanding tax returns — Kakheti Wines", meta: "Document request · Open", priority: "Medium", status: "Open", timeLeft: "23h 40m left", overdue: false, owner: "TN-02" },
  { id: "q9", title: "Founder guarantee paperwork — Caucasus AgriTech", meta: "Underwriting · Blocked", priority: "Medium", status: "Blocked", timeLeft: "1d 21h left", overdue: false, owner: "AD-06" },
  { id: "q10", title: "Covenant review — Kazbegi Energy", meta: "Monitoring · Open", priority: "Low", status: "Open", timeLeft: "6d 21h left", overdue: false, owner: "SM-08" },
];

export interface WorkflowStep {
  id: string;
  order: string;
  title: string;
  system: string;
}

export const workflowSteps: WorkflowStep[] = [
  { id: "s1", order: "01", title: "Application received", system: "ALTA LMS" },
  { id: "s2", order: "02", title: "Create CRM case", system: "CRM" },
  { id: "s3", order: "03", title: "Collect & classify documents", system: "Document AI" },
  { id: "s4", order: "04", title: "KYC / identity verification", system: "External API" },
  { id: "s5", order: "05", title: "Credit bureau check", system: "Credit Bureau" },
  { id: "s6", order: "06", title: "Debt registry check", system: "Debt Registry" },
  { id: "s7", order: "07", title: "Risk scoring & explainability", system: "AI Decision Engine" },
  { id: "s8", order: "08", title: "Policy evaluation & decision", system: "Policy Studio" },
  { id: "s9", order: "09", title: "Manager approval (if required)", system: "Workflow Automation" },
  { id: "s10", order: "10", title: "Disbursement & ALTA sync", system: "ALTA LMS" },
  { id: "s11", order: "11", title: "Servicing handoff", system: "CRM + ALTA" },
];

export const liveExecutionContext = {
  application: "APP-7741",
  customer: "Kazbegi Energy JSC",
  requested: "€2,400,000",
  riskPd: "86 / 0.9%",
  documents: "100% complete",
  crm: "Approved",
  alta: "Approved",
  policy: "CREDIT-12",
  model: "Credit Model v4.2",
  workflow: "LENDING-ORCH-v8",
};

export const demoProof = [
  "Real-time state sync across ALTA, CRM, document AI and decisioning.",
  "One orchestration layer instead of nine manual handoffs.",
  "Full audit trail generated automatically as the workflow executes.",
];
