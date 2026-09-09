export type RiskBand = "AAA-AA" | "A" | "BBB" | "BB" | "B & below";

export type PipelineStage =
  | "new"
  | "ai_review"
  | "manual_review"
  | "approved"
  | "rejected"
  | "disbursed";

export type SlaStatus = "on_track" | "at_risk" | "breached" | "complete" | "pending";

export interface Owner {
  initials: string;
  name: string;
}

export interface Application {
  id: string;
  appId: string;
  borrower: string;
  sector: string;
  product: string;
  amount: number;
  riskScore: number;
  riskBand: RiskBand;
  stage: PipelineStage;
  owner: Owner;
  sla: SlaStatus;
  slaLabel: string;
  pd: number;
  documentsComplete: boolean;
  missingDocs?: string;
  submitted: string;
}

export interface ExplainabilityFactor {
  label: string;
  value: number;
  weight: "High" | "Medium" | "Low";
  direction: "support" | "detract";
  detail: string;
}

export interface PolicyCheck {
  label: string;
  status: "Passed" | "Triggered" | "Failed" | "Not applicable";
  detail: string;
}

export interface AuditEvent {
  time: string;
  label: string;
  detail: string;
}

export interface RiskFactor {
  label: string;
  contribution: number;
}

export interface RepaymentBar {
  label: string;
  status: "on_time" | "late" | "upcoming";
}

export interface DecisionPacket {
  appId: string;
  borrower: string;
  decision: "Approved" | "Manual Review" | "Rejected";
  headline: string;
  model: string;
  requested: number;
  recommended: number;
  rate?: string;
  term: string;
  riskScore: number;
  riskBand: RiskBand;
  confidence: number;
  pd: number;
  dscr?: number;
  ltv?: number;
  rationale: string[];
  nextAction: string;
  nextActionCta: string;
  supportCount: number;
  detractCount: number;
  factors: ExplainabilityFactor[];
  policyChecks: PolicyCheck[];
  auditTrail: AuditEvent[];
  riskFactors: RiskFactor[];
  customer: {
    name: string;
    type: string;
    customerId: string;
    sector: string;
    location: string;
    relationshipSince: string;
    kycStatus: string;
    contact: string;
    annualFigure: { label: string; value: string };
    existingExposure: string;
  };
  loan: {
    appId: string;
    product: string;
    amount: string;
    term: string;
    rate: string;
    ltv: string;
    purpose: string;
    submitted: string;
    assignedTo: string;
  };
  bureau: {
    score: number;
    rating: string;
    openAccounts: number;
    totalExposure: string;
    inquiries6m: number;
    worstArrears: string;
    defaults12m: number;
    utilisation: number;
  };
  registry: {
    status: "Clear" | "Review";
    activeClaims: number;
    claimsAmount: string;
    taxArrears: string;
    note: string;
    checked: string;
  };
  income: {
    monthlyTurnover: string;
    newObligation: string;
    existingObligations: string;
    disposable: string;
    dti: string;
    dscr: string;
    allocation: { label: string; value: number; color: string }[];
  };
  repayment: {
    facility: string;
    outstanding: string;
    status: string;
    note: string;
    months: RepaymentBar[];
  };
}
