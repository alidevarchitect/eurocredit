export interface DocField {
  label: string;
  value: string;
  confidence: number;
}

export interface DocRecord {
  id: string;
  name: string;
  file: string;
  size: string;
  status: "Verified" | "Needs review" | "Action needed";
  confidence: number;
  fields: DocField[];
  warning?: string;
}

export const documentDossier = {
  appId: "APP-7702",
  borrower: "Giorgi Beridze",
};

export const documents: DocRecord[] = [
  {
    id: "d1",
    name: "ID Card",
    file: "giorgi_id_front.jpg · 1.2 MB",
    size: "1.2 MB",
    status: "Verified",
    confidence: 99,
    fields: [
      { label: "Full name", value: "Giorgi Beridze", confidence: 99 },
      { label: "ID number", value: "01024056789", confidence: 99 },
      { label: "Date of birth", value: "14 Mar 1990", confidence: 98 },
      { label: "Address", value: "27 Chavchavadze Ave, Tbilisi", confidence: 97 },
      { label: "Expiry", value: "08 Aug 2031", confidence: 99 },
      { label: "Nationality", value: "Georgian", confidence: 97 },
    ],
  },
  {
    id: "d2",
    name: "Salary Slip",
    file: "silknet_payslip_may26.pdf · 240 KB",
    size: "240 KB",
    status: "Verified",
    confidence: 96,
    fields: [
      { label: "Employer", value: "Silknet JSC", confidence: 97 },
      { label: "Net monthly income", value: "€2,840", confidence: 96 },
      { label: "Position", value: "Network Engineer", confidence: 94 },
      { label: "Pay period", value: "May 2026", confidence: 95 },
    ],
  },
  {
    id: "d3",
    name: "Bank Statement",
    file: "bog_statement_q2.pdf · 860 KB",
    size: "860 KB",
    status: "Action needed",
    confidence: 92,
    fields: [
      { label: "Account holder", value: "Giorgi Beridze", confidence: 98 },
      { label: "Bank", value: "Bank of Georgia", confidence: 99 },
      { label: "Closing balance", value: "€7,420", confidence: 93 },
      { label: "Average balance", value: "€5,180", confidence: 90 },
      { label: "Statement period", value: "Mar–May 2026", confidence: 92 },
    ],
    warning: "Statement appears truncated — page 3 of 3 is missing. 2 of 3 pages received.",
  },
  {
    id: "d4",
    name: "Utility Bill",
    file: "telasi_bill_apr26.pdf · 180 KB",
    size: "180 KB",
    status: "Needs review",
    confidence: 88,
    fields: [
      { label: "Account name", value: "Giorgi Beridze", confidence: 90 },
      { label: "Address", value: "14 Abashidze St, Tbilisi 0179", confidence: 88 },
      { label: "Provider", value: "Telasi (electricity)", confidence: 90 },
      { label: "Issue date", value: "Apr 2026", confidence: 90 },
    ],
    warning: "Address differs from ID document (27 Chavchavadze Ave).",
  },
];

export const extractedProfile = [
  { label: "Full name", value: "Giorgi Beridze", source: "ID Card", confidence: 99 },
  { label: "ID number", value: "01024056789", source: "ID Card", confidence: 99 },
  { label: "Monthly income", value: "€2,840", source: "Salary Slip", confidence: 96 },
  { label: "Employer", value: "Silknet JSC", source: "Salary Slip", confidence: 97 },
  { label: "Address", value: "27 Chavchavadze Ave, Tbilisi", source: "ID Card", confidence: 88, flagged: true },
  { label: "Bank balance", value: "€7,420", source: "Bank Statement", confidence: 93 },
];

export interface ValidationResult {
  label: string;
  detail: string;
  status: "pass" | "warn" | "fail";
}

export const validationResults: ValidationResult[] = [
  { label: "ID matched", detail: "Name and ID number consistent across ID, salary slip and bank statement.", status: "pass" },
  { label: "Income verified", detail: "Declared €2,840/mo corroborated by salary slip and bank inflows.", status: "pass" },
  { label: "Address mismatch", detail: "Utility bill (14 Abashidze St) differs from ID address (27 Chavchavadze Ave).", status: "fail" },
  { label: "Missing page warning", detail: "Bank statement provided 2 of 3 pages; page 3 required for the full period.", status: "warn" },
];
