import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ListChecks,
  Sparkles,
  SlidersHorizontal,
  FlaskConical,
  FileText,
  Workflow,
  GitBranch,
  ShieldAlert,
  LineChart,
  Plug,
  DatabaseZap,
  Map,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  crumb: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/", label: "Executive Dashboard", icon: LayoutDashboard, crumb: "Executive Dashboard" },
      { href: "/applications", label: "Applications Pipeline", icon: ListChecks, crumb: "Applications Pipeline" },
    ],
  },
  {
    label: "Decision Intelligence",
    items: [
      { href: "/decisioning", label: "AI Decisioning", icon: Sparkles, crumb: "AI Decisioning" },
      { href: "/policy-studio", label: "Policy Studio", icon: SlidersHorizontal, crumb: "Policy Studio" },
      { href: "/historical-ai-lab", label: "Historical AI Lab", icon: FlaskConical, crumb: "Historical AI Lab" },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/document-ai", label: "Document Processing", icon: FileText, crumb: "Document Processing" },
      { href: "/workflow-automation", label: "Workflow Automation", icon: Workflow, crumb: "Workflow Automation" },
      { href: "/workflow-designer", label: "Workflow Designer", icon: GitBranch, crumb: "Workflow Designer" },
      { href: "/exceptions", label: "Exceptions & Cases", icon: ShieldAlert, crumb: "Exceptions & Cases" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/portfolio-intelligence", label: "Portfolio Intelligence", icon: LineChart, crumb: "Portfolio Intelligence" },
      { href: "/integrations", label: "Integrations", icon: Plug, crumb: "Integrations" },
    ],
  },
  {
    label: "Discovery",
    items: [
      { href: "/data-readiness", label: "Data Readiness", icon: DatabaseZap, crumb: "Data Readiness" },
      { href: "/roadmap", label: "Delivery Roadmap", icon: Map, crumb: "Delivery Roadmap" },
    ],
  },
];

export const flatNav = navGroups.flatMap((g) => g.items);
