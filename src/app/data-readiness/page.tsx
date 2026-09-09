import { RefreshCw, ClipboardList, HelpCircle, Lightbulb } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button, ProgressBar } from "@/components/ui/primitives";
import { readinessKpis, dataSources, modelReadyOutcome, discoveryQuestions, readinessRecommendation } from "@/lib/data/readiness";

export default function DataReadinessPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Discovery"
        title="Data readiness & quality"
        description="Profile the historical data required for scoring, explainability, workflow automation and portfolio intelligence before model development."
        action={
          <Button variant="primary">
            <RefreshCw size={14} /> Run data profiling
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {readinessKpis.map((k) => (
          <Card key={k.label}>
            <div className="text-[12.5px] text-[var(--text-muted)]">{k.label}</div>
            <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">{k.value}</div>
            <div className="text-[11px] text-[var(--text-faint)] mt-1">{k.sub}</div>
          </Card>
        ))}
      </div>

      <Card padded={false} className="mb-4">
        <div className="p-5 pb-3">
          <CardHeader
            title="Source readiness matrix"
            sub="Demo discovery view showing the type of profiling performed before model and integration work"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-left text-[var(--text-faint)] border-y border-[var(--border)]">
                <th className="font-medium py-2 px-5">Data source</th>
                <th className="font-medium py-2 px-3 text-right">Rows</th>
                <th className="font-medium py-2 px-3">Completeness</th>
                <th className="font-medium py-2 px-3 text-right">Quality</th>
                <th className="font-medium py-2 px-3">Status</th>
                <th className="font-medium py-2 px-5 hidden md:table-cell">Discovery note</th>
              </tr>
            </thead>
            <tbody>
              {dataSources.map((s) => (
                <tr key={s.name} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 px-5 font-medium text-[var(--text)]">{s.name}</td>
                  <td className="py-3 px-3 text-right tabular text-[var(--text-muted)]">{s.rows}</td>
                  <td className="py-3 px-3 w-40">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={s.completeness} tone={s.completeness >= 90 ? "mint" : "amber"} />
                      <span className="text-[11px] tabular text-[var(--text-faint)] shrink-0">{s.completeness}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right tabular text-[var(--text-muted)]">{s.quality}%</td>
                  <td className="py-3 px-3">
                    <Badge tone={s.status === "Ready" ? "mint" : "amber"}>{s.status}</Badge>
                  </td>
                  <td className="py-3 px-5 text-[var(--text-faint)] hidden md:table-cell">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Model-ready outcome definition" icon={<ClipboardList size={14} />} />
          <p className="text-[12.5px] text-[var(--text-muted)] leading-relaxed">{modelReadyOutcome}</p>
        </Card>
        <Card>
          <CardHeader title="Key discovery questions" icon={<HelpCircle size={14} />} />
          <ul className="space-y-2">
            {discoveryQuestions.map((q, i) => (
              <li key={i} className="text-[12.5px] text-[var(--text-muted)] flex items-start gap-2 leading-relaxed">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--text-faint)]" /> {q}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Readiness recommendation" icon={<Lightbulb size={14} className="text-[var(--mint)]" />} />
          <p className="text-[12.5px] text-[var(--text-muted)] leading-relaxed">{readinessRecommendation}</p>
        </Card>
      </div>
    </div>
  );
}
