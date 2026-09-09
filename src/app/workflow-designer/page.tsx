"use client";

import { useRef, useState } from "react";
import { Play, RotateCcw, Save, CheckCircle2, Loader2, Radio, Sparkles } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button } from "@/components/ui/primitives";
import { workflowSteps, liveExecutionContext, demoProof } from "@/lib/data/workflow";

type StepStatus = "pending" | "running" | "done";

const stepFieldMap: Record<string, (keyof typeof liveExecutionContext)[]> = {
  s1: ["application", "customer", "requested"],
  s2: ["crm"],
  s3: ["documents"],
  s7: ["riskPd"],
  s8: ["policy", "model"],
  s10: ["alta"],
  s11: ["workflow"],
};

const contextLabels: Record<keyof typeof liveExecutionContext, string> = {
  application: "Application",
  customer: "Customer",
  requested: "Requested",
  riskPd: "Risk / PD",
  documents: "Documents",
  crm: "CRM",
  alta: "ALTA",
  policy: "Policy",
  model: "Model",
  workflow: "Workflow",
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function WorkflowDesignerPage() {
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>(
    Object.fromEntries(workflowSteps.map((s) => [s.id, "pending"]))
  );
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [running, setRunning] = useState(false);
  const cancelRef = useRef(false);

  async function runDemo() {
    if (running) return;
    setRunning(true);
    cancelRef.current = false;
    setStatuses(Object.fromEntries(workflowSteps.map((s) => [s.id, "pending"])));
    setRevealed(new Set());

    for (const step of workflowSteps) {
      if (cancelRef.current) break;
      setStatuses((prev) => ({ ...prev, [step.id]: "running" }));
      await delay(480);
      setStatuses((prev) => ({ ...prev, [step.id]: "done" }));
      const fields = stepFieldMap[step.id];
      if (fields) {
        setRevealed((prev) => new Set([...prev, ...fields]));
      }
      await delay(140);
    }
    setRunning(false);
  }

  function reset() {
    cancelRef.current = true;
    setRunning(false);
    setStatuses(Object.fromEntries(workflowSteps.map((s) => [s.id, "pending"])));
    setRevealed(new Set());
  }

  const doneCount = Object.values(statuses).filter((s) => s === "done").length;

  return (
    <div>
      <PageHeader
        eyebrow="Orchestration"
        title="End-to-end workflow designer"
        description="A configurable lending workflow where each animated step mutates the same shared state used by ALTA, CRM, documents, AI decisioning and monitoring."
        action={
          <>
            <Button variant="secondary">
              <Save size={14} /> Save draft
            </Button>
            <Button variant="secondary" onClick={reset} disabled={running}>
              <RotateCcw size={14} /> Restore
            </Button>
            <Button variant="primary" onClick={runDemo} disabled={running}>
              {running ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
              {running ? "Running…" : "Run demo flow"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2" padded={false}>
          <div className="flex items-center justify-between p-5 pb-3">
            <CardHeader title="Origination — decision — servicing handoff" sub="Execution highlights each step while mutating shared demo state" />
            <Badge tone={running ? "amber" : doneCount === workflowSteps.length && doneCount > 0 ? "mint" : "neutral"} dot>
              {running ? "Running" : doneCount === workflowSteps.length && doneCount > 0 ? "Complete" : "Ready"}
            </Badge>
          </div>
          <div className="px-5 pb-5">
            <div className="relative border-l border-[var(--border)] pl-5 space-y-1">
              {workflowSteps.map((step) => {
                const status = statuses[step.id];
                return (
                  <div key={step.id} className="relative pb-4 last:pb-0">
                    <span
                      className="absolute -left-[27px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--surface)]"
                      style={{
                        background: status === "done" ? "var(--mint)" : status === "running" ? "var(--amber)" : "var(--surface-3)",
                      }}
                    >
                      {status === "done" && <CheckCircle2 size={12} className="text-[#04140f]" />}
                      {status === "running" && <Loader2 size={11} className="animate-spin text-[#231400]" />}
                    </span>
                    <div
                      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        status === "running"
                          ? "border-[var(--amber)]/40 bg-[var(--amber-dim)]"
                          : status === "done"
                          ? "border-[var(--mint)]/25 bg-[var(--mint-dim)]/40"
                          : "border-[var(--border)] bg-[var(--surface-2)]"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-medium text-[var(--text)]">
                          <span className="mono text-[var(--text-faint)] mr-1.5">{step.order}</span>
                          {step.title}
                        </div>
                        <div className="text-[10.5px] text-[var(--text-faint)] mt-0.5">{step.system}</div>
                      </div>
                      <Badge tone={status === "done" ? "mint" : status === "running" ? "amber" : "neutral"} className="shrink-0">
                        {status === "done" ? "Done" : status === "running" ? "Running" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <CardHeader title="Live execution context" />
              <Badge tone="mint" dot={running}>
                <Radio size={10} className="mr-0.5" /> Synced
              </Badge>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {(Object.keys(liveExecutionContext) as (keyof typeof liveExecutionContext)[]).map((key) => {
                const isRevealed = revealed.has(key);
                return (
                  <div key={key} className="flex items-center justify-between py-2 text-[12.5px]">
                    <span className="text-[var(--text-muted)]">{contextLabels[key]}</span>
                    <span
                      className={`font-medium tabular text-right transition-opacity duration-300 ${
                        isRevealed ? "opacity-100 text-[var(--text)]" : "opacity-40 text-[var(--text-faint)]"
                      }`}
                    >
                      {isRevealed ? liveExecutionContext[key] : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <CardHeader title="What this demo proves" icon={<Sparkles size={14} />} />
            <ul className="space-y-2.5">
              {demoProof.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-[var(--text-muted)] leading-relaxed">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[var(--mint)]" /> {p}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
