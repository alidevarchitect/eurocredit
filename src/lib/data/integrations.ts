export interface Connector {
  id: string;
  name: string;
  provider: string;
  status: "Operational" | "Degraded";
  flow: "Bidirectional" | "Inbound" | "Outbound";
  latency: string;
  requestsToday: number;
  errors24h: number;
  lastSync: string;
  uptime: string;
}

export const connectors: Connector[] = [
  { id: "alta", name: "ALTA LMS", provider: "ALTA Software", status: "Operational", flow: "Bidirectional", latency: "118 ms", requestsToday: 4210, errors24h: 0, lastSync: "2m ago", uptime: "99.98%" },
  { id: "crm", name: "CRM Layer", provider: "Microsoft Dynamics 365", status: "Operational", flow: "Bidirectional", latency: "142 ms", requestsToday: 3180, errors24h: 1, lastSync: "5m ago", uptime: "99.96%" },
  { id: "bureau", name: "Credit Bureau API", provider: "CreditInfo Georgia", status: "Operational", flow: "Inbound", latency: "186 ms", requestsToday: 2610, errors24h: 2, lastSync: "11m ago", uptime: "99.89%" },
  { id: "registry", name: "Debt Registry API", provider: "Revenue Service · Enforcement Bureau", status: "Operational", flow: "Inbound", latency: "488 ms", requestsToday: 1290, errors24h: 3, lastSync: "25m ago", uptime: "99.60%" },
  { id: "ocr", name: "OCR / Document AI", provider: "Eurocredit Document AI", status: "Operational", flow: "Inbound", latency: "640 ms", requestsToday: 6930, errors24h: 0, lastSync: "22m ago", uptime: "99.94%" },
  { id: "notify", name: "Notification Service", provider: "Twilio · SendGrid", status: "Degraded", flow: "Outbound", latency: "720 ms", requestsToday: 5120, errors24h: 14, lastSync: "49m ago", uptime: "98.70%" },
  { id: "warehouse", name: "Reporting Warehouse", provider: "Snowflake", status: "Operational", flow: "Outbound", latency: "310 ms", requestsToday: 980, errors24h: 0, lastSync: "8h ago", uptime: "99.97%" },
];

export const architectureFlow = [
  { id: "crm", label: "CRM Layer", sub: "Customer + case context", icon: "users" },
  { id: "engine", label: "Decision & Workflow Engine", sub: "Rules · AI · orchestration", icon: "sparkles", highlight: true },
  { id: "alta", label: "ALTA LMS", sub: "Core lending system", icon: "database" },
  { id: "external", label: "External Data Sources", sub: "Bureau · registry · KYC", icon: "cloud" },
];

export interface ApiLogEntry {
  id: string;
  source: string;
  method: string;
  endpoint: string;
  activity: string;
  status: number;
  latency: string;
  time: string;
}

export const apiActivityLog: ApiLogEntry[] = [
  { id: "l1", source: "ALTA LMS", method: "POST", endpoint: "/v2/facilities", activity: "Booked facility APP-7738 · Black Sea Shipping", status: 201, latency: "124ms", time: "2m ago" },
  { id: "l2", source: "CRM Layer", method: "GET", endpoint: "/leads/sync", activity: "Synced 142 leads from Dynamics", status: 200, latency: "138ms", time: "4m ago" },
  { id: "l3", source: "Credit Bureau API", method: "GET", endpoint: "/reports/CUS-1008", activity: "Credit report retrieved · Kazbegi Energy", status: 200, latency: "142ms", time: "11m ago" },
  { id: "l4", source: "OCR Service", method: "POST", endpoint: "/extract", activity: "Extracted 6 fields · giorgi_id_front.jpg", status: 200, latency: "612ms", time: "21m ago" },
  { id: "l5", source: "Notification Service", method: "POST", endpoint: "/sms/send", activity: "SMS gateway timeout — queued for retry", status: 502, latency: "720ms", time: "49m ago" },
  { id: "l6", source: "Debt Registry API", method: "GET", endpoint: "/enforcement/CUS-1042", activity: "Active enforcement claim found", status: 200, latency: "583ms", time: "1h ago" },
  { id: "l7", source: "OCR Service", method: "POST", endpoint: "/classify", activity: "Batch BX-2291 · 12 documents classified", status: 200, latency: "588ms", time: "1h ago" },
  { id: "l8", source: "Reporting Warehouse", method: "POST", endpoint: "/load/facilities", activity: "Loaded 18,402 facility rows to Snowflake", status: 200, latency: "310ms", time: "8h ago" },
];

export const integrationKpis = {
  connectorsOnline: "6/7",
  apiRequestsToday: "24,120",
  avgLatency: "366 ms",
  errors24h: "16",
};
