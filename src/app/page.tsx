import Link from "next/link";
import {
  FileStack,
  CheckCircle2,
  UserCheck,
  XCircle,
  Timer,
  ShieldCheck,
  Download,
  Play,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  RefreshCw,
} from "lucide-react";
import { PageHeader, Card, CardHeader, KpiCard, Badge, Button } from "@/components/ui/primitives";
import { ApplicationVolumeChart, ApprovalRateChart, HorizontalBarChart } from "@/components/charts";
import { executiveKpis, applicationVolume, approvalRateTrend, riskDistribution } from "@/lib/data/dashboard";
import { applications, formatEUR } from "@/lib/data/applications";
import { operationalAlerts } from "@/lib/data/alerts";

const kpiIcons = [FileStack, CheckCircle2, UserCheck, XCircle, Timer, ShieldCheck];

const toneIcon = { red: ShieldAlert, amber: Clock, mint: CheckCircle2, blue: RefreshCw };
const toneColor: Record<string, string> = {
  red: "text-[var(--red)] bg-[var(--red-dim)]",
  amber: "text-[var(--amber)] bg-[var(--amber-dim)]",
  mint: "text-[var(--mint)] bg-[var(--mint-dim)]",
  blue: "text-[var(--blue)] bg-[var(--blue-dim)]",
};

const decisionBadge: Record<string, { tone: "mint" | "amber" | "red" | "blue"; label: string }> = {
  new: { tone: "amber", label: "New" },
  ai_review: { tone: "blue", label: "AI Review" },
  manual_review: { tone: "amber", label: "Manual Review" },
  approved: { tone: "mint", label: "Approved" },
  rejected: { tone: "red", label: "Rejected" },
  disbursed: { tone: "mint", label: "Disbursed" },
};

const statusLabel: Record<string, string> = {
  new: "New application",
  ai_review: "AI review",
  manual_review: "Referred",
  approved: "Approved",
  rejected: "Declined",
  disbursed: "Funded",
};

export default function ExecutiveDashboardPage() {
  const highRisk = [...applications].sort((a, b) => a.riskScore - b.riskScore).slice(0, 5);

  return (
    <div>
      <PageHeader
        eyebrow="Operations control tower"
        title="Executive command center"
        description="A real-time control tower that unifies application throughput, approval mix, portfolio signals, manual review load and automation health in one executive view."
        action={
          <>
            <Button variant="secondary">
              <Download size={14} /> Export
            </Button>
            <Link href="/workflow-designer">
              <Button variant="primary">
                <Play size={13} /> Run demo flow
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-5">
        {executiveKpis.map((kpi, i) => {
          const Icon = kpiIcons[i];
          return <KpiCard key={kpi.label} {...kpi} icon={<Icon size={14} />} />;
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Application volume"
            sub="Monthly submissions by decision outcome"
            action={
              <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] mono">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--mint)]" />Approved</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--amber)]" />Review</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--red)]" />Rejected</span>
              </div>
            }
          />
          <ApplicationVolumeChart data={applicationVolume} />
        </Card>
        <Card>
          <CardHeader title="Approval rate" sub="Share of applications approved, trailing 12m" />
          <ApprovalRateChart data={approvalRateTrend} />
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        <Card>
          <CardHeader title="Risk distribution" sub="Outstanding exposure by rating band (€M)" />
          <HorizontalBarChart
            data={riskDistribution}
            dataKey="exposure"
            labelKey="band"
            colorByTone={{}}
            color="var(--mint)"
          />
        </Card>

        <Card className="xl:col-span-2" padded={false}>
          <div className="p-5 pb-3 flex items-center justify-between">
            <CardHeader
              title="Recent high-risk applications"
              sub="Score ≤ 70 · ordered by ascending risk score"
            />
            <Link href="/applications" className="text-[11.5px] text-[var(--mint)] hover:underline flex items-center gap-1 shrink-0 -mt-4">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="text-left text-[var(--text-faint)] border-y border-[var(--border)]">
                  <th className="font-medium py-2 px-5">Borrower</th>
                  <th className="font-medium py-2 px-3">Amount</th>
                  <th className="font-medium py-2 px-3">Risk score</th>
                  <th className="font-medium py-2 px-3">PD (12m)</th>
                  <th className="font-medium py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {highRisk.map((a) => (
                  <tr key={a.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="py-2.5 px-5">
                      <div className="font-medium text-[var(--text)]">{a.borrower}</div>
                      <div className="text-[11px] text-[var(--text-faint)] mono">{a.appId} · {a.sector}</div>
                    </td>
                    <td className="py-2.5 px-3 tabular">{formatEUR(a.amount)}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 rounded-full bg-[var(--surface-3)] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${a.riskScore}%`, background: a.riskScore < 55 ? "var(--red)" : "var(--amber)" }}
                          />
                        </div>
                        <span className="tabular">{a.riskScore}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 tabular">{a.pd.toFixed(1)}%</td>
                    <td className="py-2.5 px-3">
                      <Badge tone={decisionBadge[a.stage].tone}>{statusLabel[a.stage]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card padded={false}>
        <div className="p-5 pb-3 flex items-center justify-between">
          <CardHeader title="Operational alerts" sub="System health, risk & SLA signals" />
          <Badge tone="red">{operationalAlerts.length} open</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-[var(--border)]">
          {operationalAlerts.map((alert, i) => {
            const Icon = toneIcon[alert.tone];
            return (
              <div
                key={i}
                className={`flex gap-3 px-5 py-3 ${i % 2 === 0 ? "md:border-r md:border-[var(--border)]" : ""} ${
                  i < operationalAlerts.length - 2 ? "md:border-b md:border-[var(--border)]" : ""
                }`}
              >
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${toneColor[alert.tone]}`}>
                  <Icon size={13} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[12.5px] font-medium text-[var(--text)]">{alert.title}</div>
                    <span className="text-[10.5px] text-[var(--text-faint)] mono shrink-0">{alert.time}</span>
                  </div>
                  <div className="text-[11.5px] text-[var(--text-muted)] mt-0.5 leading-snug">{alert.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
