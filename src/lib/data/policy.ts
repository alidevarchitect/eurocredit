export interface PolicyRule {
  id: string;
  ref: string;
  label: string;
  operator: string;
  value: string;
  outcome: string;
  outcomeTone: "mint" | "amber" | "red" | "neutral";
  active: boolean;
}

export const policyRules: PolicyRule[] = [
  { id: "p1", ref: "Rule #001", label: "Debt-to-income", operator: "≤", value: "45%", outcome: "Eligible", outcomeTone: "mint", active: true },
  { id: "p2", ref: "Rule #002", label: "Credit score", operator: "≥", value: "620", outcome: "Eligible", outcomeTone: "mint", active: true },
  { id: "p3", ref: "Rule #003", label: "90+ DPD / 12 months", operator: "=", value: "0", outcome: "Eligible", outcomeTone: "mint", active: true },
  { id: "p4", ref: "Rule #004", label: "Loan amount", operator: ">", value: "€250K", outcome: "Manager approval", outcomeTone: "amber", active: true },
  { id: "p5", ref: "Rule #005", label: "Risk score", operator: "<", value: "55", outcome: "Manual review", outcomeTone: "amber", active: true },
  { id: "p6", ref: "Rule #006", label: "Risk score", operator: "≥", value: "82", outcome: "Auto approve", outcomeTone: "mint", active: true },
  { id: "p7", ref: "Rule #007", label: "Risk score", operator: "<", value: "45", outcome: "Reject", outcomeTone: "red", active: true },
];

export const policySnapshot = {
  production: "CREDIT-12",
  draft: "CREDIT-13",
  draftStatus: "In sync",
};
