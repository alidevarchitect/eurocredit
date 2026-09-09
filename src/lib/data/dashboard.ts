export const executiveKpis = [
  { label: "Total applications", value: "2,860", sub: "This month", delta: "+5.5%", positive: true },
  { label: "Auto approved", value: "1,659", sub: "58% of volume", delta: "+6.2%", positive: true },
  { label: "Manual review", value: "772", sub: "27% of volume", delta: "+3.4%", positive: false },
  { label: "Rejected", value: "429", sub: "15% of volume", delta: "+2.1%", positive: false },
  { label: "Avg. decision time", value: "4.2 min", sub: "Down from 6.8 min", delta: "-38.0%", positive: true },
  { label: "Portfolio risk score", value: "74", sub: "Band A- · low risk", delta: "+1.2%", positive: true },
];

export const applicationVolume = [
  { month: "Jul", approved: 1180, review: 520, rejected: 240 },
  { month: "Aug", approved: 1240, review: 540, rejected: 250 },
  { month: "Sep", approved: 1310, review: 560, rejected: 260 },
  { month: "Oct", approved: 1290, review: 600, rejected: 270 },
  { month: "Nov", approved: 1360, review: 610, rejected: 265 },
  { month: "Dec", approved: 1330, review: 640, rejected: 280 },
  { month: "Jan", approved: 1400, review: 660, rejected: 290 },
  { month: "Feb", approved: 1450, review: 670, rejected: 300 },
  { month: "Mar", approved: 1490, review: 690, rejected: 310 },
  { month: "Apr", approved: 1540, review: 710, rejected: 320 },
  { month: "May", approved: 1600, review: 740, rejected: 400 },
  { month: "Jun", approved: 1659, review: 772, rejected: 429 },
];

export const approvalRateTrend = [
  { month: "Jul", rate: 55 },
  { month: "Aug", rate: 57 },
  { month: "Sep", rate: 58 },
  { month: "Oct", rate: 57 },
  { month: "Nov", rate: 60 },
  { month: "Dec", rate: 61 },
  { month: "Jan", rate: 63 },
  { month: "Feb", rate: 65 },
  { month: "Mar", rate: 66 },
  { month: "Apr", rate: 68 },
  { month: "May", rate: 69 },
  { month: "Jun", rate: 69 },
];

export const riskDistribution = [
  { band: "AAA-AA", exposure: 620, color: "var(--mint)" },
  { band: "A", exposure: 540, color: "var(--blue)" },
  { band: "BBB", exposure: 410, color: "var(--amber)" },
  { band: "BB", exposure: 210, color: "var(--purple)" },
  { band: "B & below", exposure: 70, color: "var(--red)" },
];
