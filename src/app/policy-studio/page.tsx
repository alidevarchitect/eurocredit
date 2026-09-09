"use client";

import { useMemo, useState } from "react";
import { Save, BadgeCheck, Plus, Pencil, Trash2, Workflow } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button, Switch } from "@/components/ui/primitives";
import { policyRules, policySnapshot } from "@/lib/data/policy";
import { applications } from "@/lib/data/applications";

export default function PolicyStudioPage() {
  const [threshold, setThreshold] = useState(82);
  const [applied, setApplied] = useState(82);

  const projectedApproval = useMemo(() => {
    const raw = 150 - threshold * 1.12;
    return Math.max(20, Math.min(96, raw)).toFixed(0);
  }, [threshold]);

  const expectedDefault = useMemo(() => {
    const raw = (100 - threshold) * 0.172;
    return Math.max(0.4, raw).toFixed(2);
  }, [threshold]);

  const affectedApps = useMemo(() => {
    const lo = Math.min(applied, threshold);
    const hi = Math.max(applied, threshold);
    return applications.filter((a) => a.riskScore >= lo && a.riskScore < hi).length;
  }, [threshold, applied]);

  return (
    <div>
      <PageHeader
        eyebrow="Decision Intelligence"
        title="Policy & decision studio"
        description="Business teams configure underwriting policies, simulate portfolio impact and publish a versioned policy snapshot that AI Decisioning actually uses."
        action={
          <>
            <Button variant="secondary">
              <Save size={14} /> Save draft
            </Button>
            <Button variant="primary">
              <BadgeCheck size={14} /> Published
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2.5 mb-5 text-[12px]">
        <Badge tone="mint" dot>
          Production {policySnapshot.production}
        </Badge>
        <span className="text-[var(--text-faint)]">—</span>
        <Badge tone="amber" dot>
          Draft {policySnapshot.draft}
        </Badge>
        <span className="text-[var(--text-faint)]">{policySnapshot.draftStatus}</span>
        <span className="ml-auto text-[11.5px] text-[var(--text-faint)] flex items-center gap-1.5">
          <Workflow size={13} /> Decisioning reads only the published snapshot
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card padded={false}>
          <div className="flex items-center justify-between p-5 pb-3">
            <CardHeader title="Decision rules" sub={`${policySnapshot.draft} · editable draft`} />
            <Button variant="secondary">
              <Plus size={13} /> Add rule
            </Button>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {policyRules.map((rule) => (
              <div key={rule.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3">
                <Switch checked={rule.active} />
                <div className="min-w-[140px] flex-1">
                  <div className="text-[12.5px] font-medium text-[var(--text)]">{rule.label}</div>
                  <div className="text-[10.5px] text-[var(--text-faint)] mono mt-0.5">
                    {rule.ref} · {rule.operator} {rule.value}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-auto">
                  <Badge tone={rule.outcomeTone} className="shrink-0">
                    {rule.outcome}
                  </Badge>
                  <div className="flex items-center gap-1 text-[var(--text-faint)]">
                    <button className="p-1 hover:text-[var(--text)]">
                      <Pencil size={13} />
                    </button>
                    <button className="p-1 hover:text-[var(--red)]">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Policy simulator" sub="Estimate a threshold change, then apply it to the draft" />
          <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-faint)] mono mb-2">
            Auto-approval threshold
          </div>
          <div className="flex items-center gap-3 mb-5">
            <input
              type="range"
              min={45}
              max={100}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="flex-1 accent-[var(--mint)]"
            />
            <span className="w-12 text-right text-[15px] font-semibold tabular text-[var(--text)]">{threshold}</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-5">
            <div className="rounded-lg bg-[var(--surface-2)] p-3 text-center">
              <div className="text-[16px] font-semibold tabular text-[var(--mint)]">{projectedApproval}%</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-1">Projected approval</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-3 text-center">
              <div className="text-[16px] font-semibold tabular text-[var(--amber)]">{expectedDefault}%</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-1">Expected default</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-3 text-center">
              <div className="text-[16px] font-semibold tabular text-[var(--text)]">{affectedApps}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-1">Applications affected</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <Button variant="secondary" className="flex-1 justify-center" onClick={() => setThreshold(applied)}>
              Reset
            </Button>
            <Button variant="primary" className="flex-1 justify-center" onClick={() => setApplied(threshold)}>
              Apply to draft
            </Button>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3.5">
            <div className="text-[11.5px] font-semibold text-[var(--text)] flex items-center gap-1.5 mb-1.5">
              <Workflow size={12} className="text-[var(--mint)]" /> Connected policy behavior
            </div>
            <p className="text-[11.5px] text-[var(--text-muted)] leading-relaxed">
              After publishing, every application preview and AI evaluation immediately uses the new rule
              snapshot. Old decisions retain their audit version in the activity trail.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
