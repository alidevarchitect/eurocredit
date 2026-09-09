"use client";

import { useState } from "react";
import { AlertOctagon, FolderOpen, FileStack, ThumbsUp, FileQuestion, XCircle, Sparkles } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button } from "@/components/ui/primitives";
import { exceptionCases } from "@/lib/data/exceptions";

const evidenceTone: Record<string, "mint" | "amber" | "red"> = {
  Passed: "mint",
  Medium: "amber",
  High: "red",
};

const priorityFromReason = (reasonShort: string) => reasonShort;

export default function ExceptionsPage() {
  const [selectedId, setSelectedId] = useState(exceptionCases[0].id);
  const selected = exceptionCases.find((c) => c.id === selectedId) ?? exceptionCases[0];

  return (
    <div>
      <PageHeader
        eyebrow="Human-in-the-loop"
        title="Exceptions & manual review"
        description="A connected case-management workspace where AI/manual-review routing, human decisions, ALTA status and CRM follow-up stay synchronized."
        action={
          <>
            <Badge tone="amber" className="text-[12px] px-2.5 py-1">
              {exceptionCases.length} active
            </Badge>
            <Badge tone="mint" className="text-[12px] px-2.5 py-1">
              0 resolved
            </Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padded={false} className="lg:col-span-1">
          <div className="flex items-center justify-between p-4 pb-2">
            <CardHeader title="Review queue" sub={`${exceptionCases.length} active · ${exceptionCases.length} total`} />
          </div>
          <div className="divide-y divide-[var(--border)]">
            {exceptionCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full text-left px-4 py-3.5 transition-colors ${
                  selectedId === c.id ? "bg-[var(--surface-2)]" : "hover:bg-[var(--surface-2)]/60"
                }`}
                style={{ borderLeft: selectedId === c.id ? "2.5px solid var(--amber)" : "2.5px solid transparent" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold text-[var(--text)]">{c.borrower}</span>
                  <Badge tone="amber">{c.status}</Badge>
                </div>
                <div className="text-[11px] text-[var(--text-faint)] mono mt-1">{c.appId} · {c.amount}</div>
                <div className="text-[11.5px] text-[var(--text-muted)] mt-1.5 leading-snug">{priorityFromReason(c.reasonShort)}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10.5px] text-[var(--text-faint)]">{c.owner}</span>
                  <span className="text-[10.5px] text-[var(--red)] mono">SLA {c.sla}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[13.5px] font-semibold text-[var(--text)]">{selected.appId} · {selected.borrower}</div>
              <div className="text-[11.5px] text-[var(--text-faint)] mt-0.5">{selected.amount} · owner {selected.owner}</div>
            </div>
            <Badge tone="amber">{selected.status}</Badge>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-[var(--amber)]/30 bg-[var(--amber-dim)] p-3.5 mb-4">
            <AlertOctagon size={15} className="mt-0.5 shrink-0 text-[var(--amber)]" />
            <div>
              <div className="text-[12px] font-semibold text-[var(--amber)] mb-1">Escalation reason</div>
              <p className="text-[12.5px] text-[var(--text-muted)] leading-relaxed">{selected.escalationReason}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {selected.metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-[var(--surface-2)] p-2.5 text-center">
                <div className="text-[14px] font-semibold tabular text-[var(--text)]">{m.value}</div>
                <div className="text-[10px] text-[var(--text-faint)] mt-0.5 uppercase tracking-wide">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-[12px] font-semibold text-[var(--text)] mb-2">Evidence requiring review</div>
              <div className="space-y-2">
                {selected.evidence.map((e) => (
                  <div key={e.label} className="flex items-center justify-between text-[12px]">
                    <span className="text-[var(--text-muted)]">{e.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-faint)] text-[11px]">{e.detail}</span>
                      <Badge tone={evidenceTone[e.status]}>{e.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[12px] font-semibold text-[var(--text)] mb-2 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[var(--mint)]" /> Suggested action
              </div>
              <p className="text-[12px] text-[var(--text-muted)] leading-relaxed rounded-lg bg-[var(--surface-2)] p-3">
                {selected.suggestedAction}
              </p>
              <div className="text-[10.5px] text-[var(--mint)] mt-1.5">Recommendation uses this case&apos;s live dummy data</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--border)]">
            <Button variant="secondary">
              <FolderOpen size={13} /> Open application
            </Button>
            <Button variant="secondary">
              <FileStack size={13} /> Document pack
            </Button>
            <Button variant="primary">
              <ThumbsUp size={13} /> Approve with conditions
            </Button>
            <Button variant="secondary">
              <FileQuestion size={13} /> Request documents
            </Button>
            <Button variant="secondary" className="text-[var(--red)] border-[var(--red)]/30 hover:bg-[var(--red-dim)]">
              <XCircle size={13} /> Reject
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
