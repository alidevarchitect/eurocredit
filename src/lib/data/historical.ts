export const historicalKpis = [
  { label: "Historical records", value: "284,002", delta: "+12.4%" },
  { label: "Good loans", value: "88.2%", delta: "+1.1%" },
  { label: "Champion AUC", value: "0.940", delta: "+3.2%" },
  { label: "Drift index", value: "0.031", delta: "+0.8%", warn: true },
];

export const segmentPerformance = [
  { segment: "Returning salaried", good: 92, bad: 8 },
  { segment: "SME trade", good: 85, bad: 15 },
  { segment: "Transport SME", good: 80, bad: 20 },
  { segment: "Hospitality", good: 75, bad: 25 },
  { segment: "New-to-credit", good: 68, bad: 32 },
];

export const modelQualityEvolution = [
  { version: "v3.8", auc: 0.855 },
  { version: "v3.9", auc: 0.87 },
  { version: "v4.0", auc: 0.885 },
  { version: "v4.1", auc: 0.91 },
  { version: "v4.2", auc: 0.94 },
];

export const featureImportance = [
  { feature: "Repayment history", score: 96 },
  { feature: "Bureau score", score: 91 },
  { feature: "Debt-to-income", score: 87 },
  { feature: "Verified income stability", score: 81 },
  { feature: "Existing exposure", score: 75 },
  { feature: "Account inflow consistency", score: 69 },
  { feature: "Customer tenure", score: 61 },
  { feature: "Sector volatility", score: 54 },
];

export const championChallenger = {
  champion: {
    name: "Credit Model v4.2",
    status: "Live · 90%",
    acc: "94.2%",
    auc: "0.91",
    gini: "0.82",
  },
  challenger: {
    name: "Behavioral v4.3",
    status: "Candidate",
    acc: "94.9%",
    auc: "0.93",
    gini: "0.84",
    description: "Adds cash-flow consistency and CRM behavioral signals for stronger discrimination.",
    validationSample: "24,000 records",
  },
};
