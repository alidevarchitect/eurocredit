export const portfolioKpis = [
  { label: "Gross loan book", value: "€1.84B", sub: "Total outstanding principal", delta: "+12.4%", positive: true },
  { label: "Active facilities", value: "18,402", sub: "Currently servicing", delta: "+5.6%", positive: true },
  { label: "NPL ratio", value: "1.84%", sub: "90+ DPD / gross book", delta: "-0.4pp", positive: true },
  { label: "Weighted avg. yield", value: "8.7%", sub: "Portfolio interest yield", delta: "+0.3pp", positive: true },
  { label: "Average ticket", value: "€99.9K", sub: "Mean facility size", delta: "+2.1%", positive: true },
  { label: "Cost of risk", value: "0.92%", sub: "Annualised provisions", delta: "+0.1pp", positive: false },
];

export const portfolioQualityScore = {
  score: 82,
  grade: "A-",
  delta: "+2.4 pts QoQ",
  notes: [
    "NPL ratio trending down 0.4pp",
    "Approval quality up 3.1pp",
    "Construction-SME concentration (watch)",
  ],
};

export const defaultRiskTrend = [
  { month: "Jul", rate: 2.6 },
  { month: "Aug", rate: 2.45 },
  { month: "Sep", rate: 2.3 },
  { month: "Oct", rate: 2.2 },
  { month: "Nov", rate: 2.1 },
  { month: "Dec", rate: 2.05 },
  { month: "Jan", rate: 1.95 },
  { month: "Feb", rate: 1.9 },
  { month: "Mar", rate: 1.87 },
  { month: "Apr", rate: 1.85 },
  { month: "May", rate: 1.84 },
  { month: "Jun", rate: 1.84 },
];

export const goodBadSegments = [
  { label: "Good standing", value: 88.2, color: "var(--mint)" },
  { label: "Watch", value: 7.9, color: "var(--amber)" },
  { label: "Non-performing", value: 3.9, color: "var(--red)" },
];

export const approvalBreakdown = [
  { label: "Auto-approved", value: 58.0, color: "var(--mint)" },
  { label: "Manual review", value: 27.0, color: "var(--amber)" },
  { label: "Auto-declined", value: 15.0, color: "var(--red)" },
];

export const predictedDefaultRate = [
  { month: "Jan", actual: 2.1, predicted: 2.05 },
  { month: "Feb", actual: 2.02, predicted: 1.98 },
  { month: "Mar", actual: 1.97, predicted: 1.93 },
  { month: "Apr", actual: 1.91, predicted: 1.89 },
  { month: "May", actual: 1.86, predicted: 1.85 },
  { month: "Jun", actual: 1.84, predicted: 1.82 },
  { month: "Jul", actual: 1.82, predicted: 1.8 },
  { month: "Aug", actual: 1.8, predicted: 1.79 },
  { month: "Sep", actual: null, predicted: 1.79 },
];

export const riskByRegion = [
  { region: "Tbilisi", exposure: 780 },
  { region: "Adjara", exposure: 210 },
  { region: "Kvemo Kartli", exposure: 165 },
  { region: "Imereti", exposure: 140 },
  { region: "Kakheti", exposure: 95 },
  { region: "Samegrelo", exposure: 55 },
  { region: "Other", exposure: 120 },
];

export const riskByLoanType = [
  { type: "Mortgage", defaultRate: 0.9, tone: "mint" },
  { type: "Asset finance", defaultRate: 1.6, tone: "mint" },
  { type: "Term loan", defaultRate: 1.9, tone: "mint" },
  { type: "Auto loan", defaultRate: 3.1, tone: "amber" },
  { type: "Revolving", defaultRate: 3.8, tone: "amber" },
  { type: "Working capital", defaultRate: 4.6, tone: "amber" },
  { type: "Personal loan", defaultRate: 5.4, tone: "amber" },
  { type: "Venture debt", defaultRate: 8.2, tone: "red" },
];

export const modelAccuracy = {
  accuracy: 94.2,
  auc: 0.91,
  gini: 0.82,
  precision: 89,
  recall: 86,
};

export const collectionAlerts = [
  { id: "c1", name: "Davit Gelashvili", ref: "FAC-6310 · 95 DPD", amount: "€6.2K", severity: "Critical", action: "Initiate recovery & legal notice" },
  { id: "c2", name: "Adjara Hospitality Group", ref: "FAC-5402 · 12 DPD", amount: "€2.1M", severity: "High", action: "Restructure review with RM" },
  { id: "c3", name: "Vakhtang Sturua", ref: "APP-7641 · 34 DPD", amount: "€3.3K", severity: "High", action: "Payment-plan outreach" },
  { id: "c4", name: "Caucasus AgriTech", ref: "FAC-5588 · Covenant watch", amount: "€1.8M", severity: "Medium", action: "DSCR < 1.0x — monitor" },
  { id: "c5", name: "Meridian Foods SA", ref: "FAC-5611 · Seasonal cash flow", amount: "€1.4M", severity: "Medium", action: "Behavioral monitoring" },
];
