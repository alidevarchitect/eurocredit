import { Download } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button, CircularGauge } from "@/components/ui/primitives";
import { DonutChart, TrendLineChart, VerticalBarChart, HorizontalBarChart } from "@/components/charts";
import {
  portfolioKpis,
  portfolioQualityScore,
  defaultRiskTrend,
  goodBadSegments,
  approvalBreakdown,
  riskByRegion,
  riskByLoanType,
} from "@/lib/data/portfolio";

const loanTypeColors: Record<string, string> = {
  mint: "var(--mint)",
  amber: "var(--amber)",
  red: "var(--red)",
};

export default function PortfolioIntelligencePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Risk intelligence"
        title="Portfolio intelligence"
        description="Period-specific portfolio quality, segment analytics, early-warning signals and active-model monitoring across the lending book."
        action={
          <>
            <select className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-[12.5px] text-[var(--text)] outline-none">
              <option>Q2 2026</option>
              <option>Q1 2026</option>
              <option>Q4 2025</option>
            </select>
            <Button variant="primary">
              <Download size={14} /> Board pack
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5">
        {portfolioKpis.map((kpi) => (
          <Card key={kpi.label}>
            <div className="text-[11.5px] text-[var(--text-muted)]">{kpi.label}</div>
            <div className="mt-2 text-[19px] font-semibold tabular text-[var(--text)]">{kpi.value}</div>
            <div className={`mt-1.5 text-[11px] font-medium mono ${kpi.positive ? "text-[var(--mint)]" : "text-[var(--red)]"}`}>
              {kpi.positive ? "↗" : "↘"} {kpi.delta}
            </div>
            <div className="text-[10px] text-[var(--text-faint)] mt-0.5">{kpi.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader title="Portfolio quality score" sub="Composite health index" />
          <div className="flex justify-center py-2">
            <CircularGauge value={portfolioQualityScore.score} max={100} label={String(portfolioQualityScore.score)} sub={`Grade ${portfolioQualityScore.grade}`} color="var(--mint)" size={140} />
          </div>
          <div className="flex justify-center mb-4">
            <Badge tone="mint">{portfolioQualityScore.delta}</Badge>
          </div>
          <ul className="space-y-1.5">
            {portfolioQualityScore.notes.map((n, i) => (
              <li key={i} className="text-[12px] text-[var(--text-muted)] flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--text-faint)]" /> {n}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Default risk trend" sub="Portfolio 90+ DPD default rate, trailing 12 months" />
          <TrendLineChart data={defaultRiskTrend} dataKey="rate" color="var(--amber)" unit="%" domain={[1.5, 2.8]} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader title="Good vs bad segments" sub="Share of book by standing" />
          <DonutChart data={goodBadSegments} centerValue={`${goodBadSegments[0].value}%`} centerLabel="good standing" />
          <div className="flex flex-col gap-1.5 mt-3">
            {goodBadSegments.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-[11.5px]">
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} /> {s.label}
                </span>
                <span className="tabular text-[var(--text)] font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Approval / rejection breakdown" sub="Decision mix this quarter" />
          <DonutChart data={approvalBreakdown} centerValue={`${approvalBreakdown[0].value}%`} centerLabel="auto-approved" />
          <div className="flex flex-col gap-1.5 mt-3">
            {approvalBreakdown.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-[11.5px]">
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} /> {s.label}
                </span>
                <span className="tabular text-[var(--text)] font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Risk by region" sub="Exposure (€M)" />
          <VerticalBarChart data={riskByRegion} dataKey="exposure" labelKey="region" color="var(--mint)" />
        </Card>
      </div>

      <Card>
        <CardHeader title="Risk by loan type" sub="Default rate by product (%)" />
        <HorizontalBarChart
          data={riskByLoanType}
          dataKey="defaultRate"
          labelKey="type"
          height={280}
          colorByTone={loanTypeColors}
        />
      </Card>
    </div>
  );
}
