import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button, CircularGauge } from "@/components/ui/primitives";
import { StackedSegmentBar, TrendLineChart, HorizontalBarChart } from "@/components/charts";
import {
  historicalKpis,
  segmentPerformance,
  modelQualityEvolution,
  featureImportance,
  championChallenger,
} from "@/lib/data/historical";
import { modelAccuracy, collectionAlerts } from "@/lib/data/portfolio";

const severityTone: Record<string, "red" | "amber" | "neutral"> = {
  Critical: "red",
  High: "amber",
  Medium: "neutral",
};

export default function HistoricalAiLabPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Decision Intelligence"
        title="Historical AI & portfolio lab"
        description="Historical data is used to benchmark good vs. bad loan outcomes, track model quality evolution and measure portfolio-level learning performance."
        action={
          <Button variant="primary">
            <ArrowUpRight size={14} /> Start backtest
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {historicalKpis.map((kpi) => (
          <Card key={kpi.label}>
            <div className="text-[12.5px] text-[var(--text-muted)]">{kpi.label}</div>
            <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">{kpi.value}</div>
            <div
              className={`mt-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium mono ${
                kpi.warn ? "bg-[var(--amber-dim)] text-[var(--amber)]" : "bg-[var(--mint-dim)] text-[var(--mint)]"
              }`}
            >
              ↗ {kpi.delta}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader title="Good vs bad performance by segment" sub="Share of book by standing" />
          <StackedSegmentBar data={segmentPerformance} />
        </Card>
        <Card>
          <CardHeader title="Model quality evolution" sub="AUC improvement across successive production candidates" />
          <TrendLineChart data={modelQualityEvolution} dataKey="auc" xKey="version" color="var(--mint)" domain={[0.8, 1]} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader title="Feature importance" sub="Top behavioral and underwriting variables in the champion model" />
          <HorizontalBarChart data={featureImportance} dataKey="score" labelKey="feature" color="var(--mint)" height={260} />
        </Card>

        <Card>
          <CardHeader title="Champion / challenger" sub="Feature importance and validation govern model promotion" />
          <div className="rounded-xl border border-[var(--mint)]/30 bg-[var(--mint-dim)]/30 p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--mint)] mono flex items-center gap-1.5">
                <ShieldCheck size={13} /> Production champion
              </span>
              <Badge tone="mint">{championChallenger.champion.status}</Badge>
            </div>
            <div className="text-[15px] font-semibold text-[var(--text)] mb-2.5">{championChallenger.champion.name}</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[15px] font-semibold tabular text-[var(--text)]">{championChallenger.champion.acc}</div>
                <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Accuracy</div>
              </div>
              <div>
                <div className="text-[15px] font-semibold tabular text-[var(--text)]">{championChallenger.champion.auc}</div>
                <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Precision</div>
              </div>
              <div>
                <div className="text-[15px] font-semibold tabular text-[var(--text)]">{championChallenger.champion.gini}</div>
                <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Recall</div>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-[var(--text-faint)] uppercase tracking-wide mb-3 mono">vs</div>

          <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--purple)] mono">Challenger model</span>
              <Badge tone="purple">{championChallenger.challenger.status}</Badge>
            </div>
            <div className="text-[15px] font-semibold text-[var(--text)] mb-1.5">{championChallenger.challenger.name}</div>
            <p className="text-[11.5px] text-[var(--text-muted)] leading-relaxed mb-3">
              {championChallenger.challenger.description}
            </p>
            <div className="flex items-center justify-between text-[11px] text-[var(--text-faint)] mb-3">
              <span>Validation sample</span>
              <span className="mono">{championChallenger.challenger.validationSample}</span>
            </div>
            <Button variant="primary" className="w-full justify-center">
              Validate challenger
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Model accuracy" sub="ec-risk-ensemble v4.2 · out-of-sample" />
          <div className="flex items-center justify-center py-2">
            <CircularGauge value={modelAccuracy.accuracy} label={`${modelAccuracy.accuracy}%`} sub="Out-of-sample accuracy" color="var(--blue)" size={128} />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="rounded-lg bg-[var(--surface-2)] py-2.5 text-center">
              <div className="text-[13px] font-semibold tabular text-[var(--text)]">{modelAccuracy.auc}</div>
              <div className="text-[10px] text-[var(--text-faint)]">AUC</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] py-2.5 text-center">
              <div className="text-[13px] font-semibold tabular text-[var(--text)]">{modelAccuracy.gini}</div>
              <div className="text-[10px] text-[var(--text-faint)]">Gini</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] py-2.5 text-center">
              <div className="text-[13px] font-semibold tabular text-[var(--text)]">{modelAccuracy.precision}%</div>
              <div className="text-[10px] text-[var(--text-faint)]">Precision</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] py-2.5 text-center">
              <div className="text-[13px] font-semibold tabular text-[var(--text)]">{modelAccuracy.recall}%</div>
              <div className="text-[10px] text-[var(--text-faint)]">Recall</div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2" padded={false}>
          <div className="p-5 pb-3 flex items-center justify-between">
            <CardHeader title="Collection risk alerts" sub="Early-warning accounts requiring action" />
            <Badge tone="red">{collectionAlerts.length} active</Badge>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {collectionAlerts.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="text-[12.5px] font-medium text-[var(--text)]">{c.name}</div>
                  <div className="text-[11px] text-[var(--text-faint)] mt-0.5">{c.ref} · {c.action}</div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[12.5px] tabular text-[var(--text)]">{c.amount}</span>
                  <Badge tone={severityTone[c.severity]}>{c.severity}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
