export interface ExceptionEvidence {
  label: string;
  detail: string;
  status: "Passed" | "High" | "Medium";
}

export interface ExceptionCase {
  id: string;
  appId: string;
  borrower: string;
  amount: string;
  reasonShort: string;
  owner: string;
  sla: string;
  status: "Open" | "Resolved";
  escalationReason: string;
  metrics: { label: string; value: string }[];
  evidence: ExceptionEvidence[];
  suggestedAction: string;
}

export const exceptionCases: ExceptionCase[] = [
  {
    id: "case-192",
    appId: "CASE-192",
    borrower: "Adjara Hospitality Group",
    amount: "€1.1M",
    reasonShort: "Sector concentration threshold",
    owner: "Risk Manager",
    sla: "01:18:42",
    status: "Open",
    escalationReason: "Sector concentration approaching the 18% portfolio soft limit; DSCR headroom is thin at 1.28x. Automated workflow is paused for a governed human action.",
    metrics: [
      { label: "Risk score", value: "61" },
      { label: "PD", value: "3.8%" },
      { label: "DTI", value: "22.9%" },
      { label: "Bureau", value: "706" },
    ],
    evidence: [
      { label: "Document completeness", detail: "92%", status: "Passed" },
      { label: "Debt-to-income", detail: "22.9% vs 45% baseline", status: "Passed" },
      { label: "Bureau history", detail: "706 · 0 past due", status: "Passed" },
      { label: "Sector concentration", detail: "17.2% vs 18% limit", status: "High" },
    ],
    suggestedAction: "Validate seasonal revenue evidence. If bank inflows reconcile with declared turnover, consider conditional approval at €900,000 with a quarterly covenant review.",
  },
  {
    id: "case-190",
    appId: "CASE-190",
    borrower: "Vakhtang Sturua",
    amount: "€11.5K",
    reasonShort: "High DTI + income variance",
    owner: "Senior Underwriting",
    sla: "00:42:13",
    status: "Open",
    escalationReason: "Debt-to-income sits above the 45% ceiling and declared income shows a variance against bureau records. Automated approval is blocked pending manual verification.",
    metrics: [
      { label: "Risk score", value: "49" },
      { label: "PD", value: "12.7%" },
      { label: "DTI", value: "51%" },
      { label: "Bureau", value: "641" },
    ],
    evidence: [
      { label: "Document completeness", detail: "100%", status: "Passed" },
      { label: "Debt-to-income", detail: "51% vs 45% baseline", status: "High" },
      { label: "Bureau history", detail: "641 · 1x 20 DPD", status: "Medium" },
      { label: "Income consistency", detail: "9% variance vs bank inflows", status: "Medium" },
    ],
    suggestedAction: "Request updated payslip and 3 months of bank statements before re-scoring the application.",
  },
  {
    id: "case-188",
    appId: "CASE-188",
    borrower: "Caucasus AgriTech",
    amount: "€1.8M",
    reasonShort: "Document mismatch",
    owner: "Compliance",
    sla: "00:26:09",
    status: "Open",
    escalationReason: "Founder guarantee document references a different registered entity name than the loan application. Compliance sign-off required before proceeding.",
    metrics: [
      { label: "Risk score", value: "57" },
      { label: "PD", value: "6.4%" },
      { label: "DTI", value: "31%" },
      { label: "Bureau", value: "689" },
    ],
    evidence: [
      { label: "Document completeness", detail: "83%", status: "Medium" },
      { label: "Entity name match", detail: "Guarantee vs registry mismatch", status: "High" },
      { label: "Bureau history", detail: "689 · 0 past due", status: "Passed" },
      { label: "Debt-to-income", detail: "31% vs 45% baseline", status: "Passed" },
    ],
    suggestedAction: "Request corrected founder guarantee referencing the registered entity name, then re-submit for compliance sign-off.",
  },
  {
    id: "case-185",
    appId: "CASE-185",
    borrower: "Rustavi Steel JSC",
    amount: "€2.9M",
    reasonShort: "Manager override required",
    owner: "Manager Approval",
    sla: "04:40:00",
    status: "Open",
    escalationReason: "Loan amount exceeds the €250K manager-approval threshold. Facility otherwise meets all policy gates.",
    metrics: [
      { label: "Risk score", value: "71" },
      { label: "PD", value: "4.8%" },
      { label: "DTI", value: "28%" },
      { label: "Bureau", value: "744" },
    ],
    evidence: [
      { label: "Document completeness", detail: "100%", status: "Passed" },
      { label: "Debt-to-income", detail: "28% vs 45% baseline", status: "Passed" },
      { label: "Bureau history", detail: "744 · 0 past due", status: "Passed" },
      { label: "Exposure threshold", detail: "€2.9M exceeds €250K auto-limit", status: "Medium" },
    ],
    suggestedAction: "Route to credit committee for sign-off; all underlying risk indicators are within policy.",
  },
];
