import { Settings2, CheckCircle2, Network } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button } from "@/components/ui/primitives";
import { roadmapPhases, discoveryOutputs, architecturePrinciple } from "@/lib/data/roadmap";

export default function RoadmapPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Discovery"
        title="Discovery & implementation roadmap"
        description="A phased roadmap turns discovery outputs into a practical rollout plan across decisioning, document AI, workflow automation and portfolio intelligence."
        action={
          <Button variant="primary">
            <Settings2 size={14} /> Configure discovery
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card padded={false} className="xl:col-span-2">
          <div className="p-5 pb-3">
            <CardHeader title="Recommended implementation sequence" sub="Phased to separate model risk, operational workflow change and core-system integration risk" />
          </div>
          <div className="px-5 pb-5 flex flex-col gap-3">
            {roadmapPhases.map((phase) => (
              <div key={phase.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[13px] font-semibold text-[var(--text)]">
                    {phase.order}. {phase.title}
                  </div>
                  <Badge tone={phase.status === "Active" ? "mint" : "neutral"}>{phase.status}</Badge>
                </div>
                <div className="text-[11px] text-[var(--text-faint)] mono mb-3">{phase.weeks}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {phase.columnA.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                      <CheckCircle2 size={12} className="text-[var(--mint)] shrink-0" /> {item}
                    </div>
                  ))}
                  {phase.columnB.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                      <CheckCircle2 size={12} className="text-[var(--mint)] shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Discovery outputs" />
            <div className="flex flex-col gap-3">
              {discoveryOutputs.map((o) => (
                <div key={o.title} className="rounded-lg bg-[var(--surface-2)] px-3.5 py-2.5">
                  <div className="text-[12.5px] font-medium text-[var(--text)]">{o.title}</div>
                  <div className="text-[11px] text-[var(--text-faint)] mt-0.5">{o.sub}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Architecture principle" icon={<Network size={14} className="text-[var(--mint)]" />} />
            <p className="text-[12.5px] text-[var(--text-muted)] leading-relaxed">{architecturePrinciple}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
