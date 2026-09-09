"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  FolderOpen,
  RefreshCw,
  UserCog,
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Loader2,
} from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button, ProgressBar, CircularGauge } from "@/components/ui/primitives";
import { decisionPackets } from "@/lib/data/decisions";
import type { PolicyCheck } from "@/lib/types";

const decisionTone: Record<string, "mint" | "amber" | "red"> = {
  Approved: "mint",
  "Manual Review": "amber",
  Rejected: "red",
};

const policyIcon: Record<PolicyCheck["status"], typeof CheckCircle2> = {
  Passed: CheckCircle2,
  Triggered: AlertTriangle,
  Failed: XCircle,
  "Not applicable": CheckCircle2,
};

const policyTone: Record<PolicyCheck["status"], string> = {
  Passed: "text-[var(--mint)]",
  Triggered: "text-[var(--amber)]",
  Failed: "text-[var(--red)]",
  "Not applicable": "text-[var(--text-faint)]",
};

function KeyValueList({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="divide-y divide-[var(--border)]">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between py-2 text-[12.5px]">
          <span className="text-[var(--text-muted)]">{r.label}</span>
          <span className="font-medium text-[var(--text)] tabular text-right">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function riskMatrixCell(riskScore: number) {
  const col = Math.min(4, Math.floor(((100 - riskScore) / 100) * 5));
  const row = Math.min(4, Math.floor(((100 - riskScore) / 100) * 5 * 0.8));
  return { row, col };
}

const matrixColors = [
  ["#1f4d3d", "#1f4d3d", "#5a4a1f", "#5a4a1f", "#5a2020"],
  ["#1f4d3d", "#1f4d3d", "#5a4a1f", "#5a4a1f", "#5a2020"],
  ["#1f4d3d", "#5a4a1f", "#5a4a1f", "#5a2020", "#5a2020"],
  ["#5a4a1f", "#5a4a1f", "#5a2020", "#5a2020", "#5a2020"],
  ["#5a4a1f", "#5a2020", "#5a2020", "#5a2020", "#5a2020"],
];

export default function AIDecisioningPage() {
  const [index, setIndex] = useState(0);
  const [evaluating, setEvaluating] = useState(false);
  const packet = decisionPackets[index];
  const highlight = riskMatrixCell(packet.riskScore);

  function runEvaluation() {
    setEvaluating(true);
    setTimeout(() => setEvaluating(false), 1100);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Decision Intelligence"
        title="AI Decisioning"
        description="Model-driven credit decisions with full evidence — bureau, registry, affordability, repayment behavior, and explainable risk."
        action={
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" onClick={() => setIndex((i) => (i - 1 + decisionPackets.length) % decisionPackets.length)}>
              <ChevronLeft size={15} />
            </Button>
            <select
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-[12.5px] text-[var(--text)] outline-none mono"
            >
              {decisionPackets.map((p, i) => (
                <option key={p.appId} value={i}>
                  {p.appId} · {p.borrower}
                </option>
              ))}
            </select>
            <Button variant="ghost" onClick={() => setIndex((i) => (i + 1) % decisionPackets.length)}>
              <ChevronRight size={15} />
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <Card className="xl:col-span-2 relative overflow-hidden">
          {evaluating && (
            <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-[var(--surface)]/90 text-[13px] text-[var(--text-muted)] backdrop-blur-sm">
              <Loader2 size={16} className="animate-spin text-[var(--mint)]" /> Re-running decision engine…
            </div>
          )}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
              <Sparkles size={13} className="text-[var(--mint)]" /> AI recommended decision
            </div>
            <div className="text-right text-[11px] text-[var(--text-faint)] mono">{packet.model}</div>
          </div>

          <div className="mt-2.5 flex items-center gap-3">
            <Badge tone={decisionTone[packet.decision]} className="text-[13px] px-3 py-1">
              {packet.decision}
            </Badge>
          </div>
          <p className="mt-2 text-[13px] text-[var(--text-muted)] leading-relaxed max-w-2xl">{packet.headline}</p>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-[var(--surface-2)] p-3.5">
            <div>
              <div className="text-[10.5px] text-[var(--text-faint)] uppercase tracking-wide">Borrower</div>
              <div className="text-[13px] font-medium text-[var(--text)] mt-0.5">{packet.borrower}</div>
            </div>
            <div>
              <div className="text-[10.5px] text-[var(--text-faint)] uppercase tracking-wide">Requested</div>
              <div className="text-[13px] font-medium text-[var(--text)] mt-0.5 tabular">€{packet.requested.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10.5px] text-[var(--text-faint)] uppercase tracking-wide">Recommended</div>
              <div className="text-[13px] font-medium text-[var(--text)] mt-0.5 tabular">€{packet.recommended.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10.5px] text-[var(--text-faint)] uppercase tracking-wide">Risk band</div>
              <div className="text-[13px] font-medium text-[var(--text)] mt-0.5">{packet.riskBand}</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--mint-dim)]/40 p-3.5">
            <div className="text-[11.5px] font-semibold text-[var(--text)] mb-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-[var(--mint)]" /> Decision rationale
            </div>
            <ul className="space-y-1.5">
              {packet.rationale.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[12.5px] text-[var(--text-muted)]">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[var(--mint)]" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button variant="primary" onClick={runEvaluation}>
              <Play size={13} /> Run AI evaluation
            </Button>
            <Button variant="secondary">
              <FolderOpen size={13} /> Open document pack
            </Button>
            <Button variant="secondary">
              <RefreshCw size={13} /> Sync decision to ALTA
            </Button>
            <Button variant="secondary">
              <UserCog size={13} /> Force manual review
            </Button>
            <Button variant="secondary">
              <FileCheck2 size={13} /> View audit package
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Decision scores" />
          <div className="grid grid-cols-2 gap-3">
            <CircularGauge
              value={packet.riskScore}
              label={String(packet.riskScore)}
              sub="Risk score / 100"
              color={packet.riskScore >= 78 ? "var(--mint)" : packet.riskScore >= 55 ? "var(--amber)" : "var(--red)"}
              size={104}
            />
            <CircularGauge value={packet.confidence} label={`${packet.confidence}%`} sub="Model confidence" color="var(--blue)" size={104} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-[var(--surface-2)] py-2.5">
              <div className="text-[13px] font-semibold tabular text-[var(--text)]">{packet.riskBand}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Band</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] py-2.5">
              <div className="text-[13px] font-semibold tabular text-[var(--text)]">{packet.pd}%</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">PD 12m</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] py-2.5">
              <div className="text-[13px] font-semibold tabular text-[var(--text)]">{packet.dscr ? `${packet.dscr}x` : `${packet.ltv}%`}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">{packet.dscr ? "DSCR" : "LTV"}</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader
          title="Why did the AI make this recommendation?"
          sub="Plain-language attribution for each factor the model weighed"
          action={
            <div className="flex items-center gap-3 text-[11px] mono">
              <span className="text-[var(--mint)]">↗ {packet.supportCount} support</span>
              <span className="text-[var(--red)]">↘ {packet.detractCount} detract</span>
            </div>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {packet.factors.map((f) => (
            <div key={f.label}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-[var(--text)]">
                  {f.label}
                  <Badge tone={f.direction === "support" ? "mint" : "red"} className="text-[10px] px-1.5 py-0">
                    {f.direction === "support" ? "↗" : "↘"} {f.weight}
                  </Badge>
                </div>
                <span className="text-[12px] tabular text-[var(--text-muted)]">{f.value}</span>
              </div>
              <ProgressBar value={f.value} tone={f.direction === "support" ? "mint" : "red"} />
              <div className="text-[11.5px] text-[var(--text-faint)] mt-1">{f.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card padded={false}>
          <div className="p-5 pb-2">
            <CardHeader title="Event timeline" sub="Immutable event log" />
          </div>
          <div className="max-h-80 overflow-y-auto px-5 pb-5">
            <div className="relative border-l border-[var(--border)] pl-4 space-y-4">
              {packet.auditTrail.map((e, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)] bg-[var(--mint)]" />
                  <div className="text-[12.5px] font-medium text-[var(--text)]">{e.label}</div>
                  <div className="text-[11.5px] text-[var(--text-faint)] mt-0.5">{e.detail}</div>
                  <div className="text-[10.5px] text-[var(--text-faint)] mt-0.5 mono">{e.time}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card padded={false}>
          <div className="p-5 pb-2 flex items-center justify-between">
            <CardHeader title="Policy rule checks" sub="Published policy snapshot CREDIT-12" />
            <Badge tone="mint">{packet.policyChecks.filter((c) => c.status === "Passed").length} pass</Badge>
          </div>
          <div className="px-5 pb-5 divide-y divide-[var(--border)]">
            {packet.policyChecks.map((c) => {
              const Icon = policyIcon[c.status];
              return (
                <div key={c.label} className="flex items-center justify-between py-2.5 gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon size={14} className={`shrink-0 ${policyTone[c.status]}`} />
                    <span className="text-[12.5px] text-[var(--text)] truncate">{c.label}</span>
                  </div>
                  <Badge tone={c.status === "Passed" ? "mint" : c.status === "Triggered" ? "amber" : c.status === "Failed" ? "red" : "neutral"}>
                    {c.detail}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader title="Existing risk matrix result" sub="Governed risk-matrix logic informs automated decisioning" />
          <div className="flex gap-3">
            <div className="flex flex-col justify-around text-[9.5px] text-[var(--text-faint)] mono py-1">
              {["Band 1", "Band 2", "Band 3", "Band 4", "Band 5"].map((b) => (
                <div key={b}>{b}</div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1.5 flex-1">
              {matrixColors.map((row, r) =>
                row.map((color, c) => {
                  const isHighlight = r === highlight.row && c === highlight.col;
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="aspect-square rounded-md flex items-center justify-center text-[9px] font-semibold mono"
                      style={{
                        background: isHighlight ? "var(--mint)" : color,
                        color: isHighlight ? "#04140f" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {isHighlight ? "HERE" : ""}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[10.5px] text-[var(--text-faint)]">
            <span>Likelihood — probability of default →</span>
            <span className="mono">EAD €{packet.requested.toLocaleString()} · PD {packet.pd}%</span>
          </div>
        </Card>

        <Card>
          <CardHeader title="Key risk factors" sub="Signed contribution to the risk score" />
          <div className="space-y-3.5 mt-1">
            {packet.riskFactors.map((rf) => (
              <div key={rf.label}>
                <div className="flex items-center justify-between text-[12.5px] mb-1">
                  <span className="text-[var(--text)]">{rf.label}</span>
                  <span className={`tabular font-medium ${rf.contribution > 0 ? "text-[var(--mint)]" : "text-[var(--red)]"}`}>
                    {rf.contribution > 0 ? "+" : ""}
                    {rf.contribution}
                  </span>
                </div>
                <ProgressBar value={Math.abs(rf.contribution)} max={16} tone={rf.contribution > 0 ? "mint" : "red"} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader title="Customer profile" />
          <KeyValueList
            rows={[
              { label: "Name", value: packet.customer.name },
              { label: "Type", value: packet.customer.type },
              { label: "Customer ID", value: packet.customer.customerId },
              { label: "Sector", value: packet.customer.sector },
              { label: "Location", value: packet.customer.location },
              { label: "Relationship since", value: packet.customer.relationshipSince },
              { label: "KYC status", value: packet.customer.kycStatus },
              { label: packet.customer.annualFigure.label, value: packet.customer.annualFigure.value },
              { label: "Existing exposure", value: packet.customer.existingExposure },
            ]}
          />
        </Card>
        <Card>
          <CardHeader title="Loan request details" />
          <KeyValueList
            rows={[
              { label: "Application ID", value: packet.loan.appId },
              { label: "Product", value: packet.loan.product },
              { label: "Amount requested", value: packet.loan.amount },
              { label: "Term", value: packet.loan.term },
              { label: "Interest rate", value: packet.loan.rate },
              { label: "Loan-to-value", value: packet.loan.ltv },
              { label: "Purpose", value: packet.loan.purpose },
              { label: "Submitted", value: packet.loan.submitted },
              { label: "Assigned to", value: packet.loan.assignedTo },
            ]}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader title="Credit bureau result" sub="CreditInfo Georgia" />
          <div className="flex items-end justify-between mb-3">
            <div className="text-[30px] font-semibold tabular text-[var(--text)]">{packet.bureau.score}</div>
            <Badge tone="mint">{packet.bureau.rating}</Badge>
          </div>
          <ProgressBar value={packet.bureau.score} max={900} tone="mint" className="mb-4" />
          <KeyValueList
            rows={[
              { label: "Open accounts", value: String(packet.bureau.openAccounts) },
              { label: "Total exposure", value: packet.bureau.totalExposure },
              { label: "Inquiries (6m)", value: String(packet.bureau.inquiries6m) },
              { label: "Worst arrears", value: packet.bureau.worstArrears },
              { label: "Defaults (12m)", value: String(packet.bureau.defaults12m) },
              { label: "Utilisation", value: `${packet.bureau.utilisation}%` },
            ]}
          />
        </Card>
        <Card>
          <CardHeader title="Debt registry result" sub="Public Registry / Revenue Service" />
          <div className="mb-3">
            <Badge tone={packet.registry.status === "Clear" ? "mint" : "amber"}>{packet.registry.status}</Badge>
          </div>
          <KeyValueList
            rows={[
              { label: "Active claims", value: String(packet.registry.activeClaims) },
              { label: "Claims amount", value: packet.registry.claimsAmount },
              { label: "Tax arrears", value: packet.registry.taxArrears },
              { label: "Note", value: packet.registry.note },
              { label: "Checked", value: packet.registry.checked },
            ]}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Income & debt analysis" />
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <div className="rounded-lg bg-[var(--surface-2)] p-2.5">
              <div className="text-[13.5px] font-semibold tabular text-[var(--text)]">{packet.income.monthlyTurnover}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Monthly turnover</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-2.5">
              <div className="text-[13.5px] font-semibold tabular text-[var(--text)]">{packet.income.newObligation}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">New obligation</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-2.5">
              <div className="text-[13.5px] font-semibold tabular text-[var(--text)]">{packet.income.existingObligations}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Existing obligations</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-2.5">
              <div className="text-[13.5px] font-semibold tabular text-[var(--text)]">{packet.income.disposable}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Disposable</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-2.5">
              <div className="text-[13.5px] font-semibold tabular text-[var(--text)]">{packet.income.dti}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">Total DTI</div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-2.5">
              <div className="text-[13.5px] font-semibold tabular text-[var(--text)]">{packet.income.dscr}</div>
              <div className="text-[10px] text-[var(--text-faint)] mt-0.5">DSCR</div>
            </div>
          </div>
          <div className="text-[11.5px] text-[var(--text-muted)] mb-1.5">Monthly income allocation</div>
          <div className="flex h-2.5 w-full overflow-hidden rounded-full">
            {packet.income.allocation.map((seg) => (
              <div key={seg.label} style={{ width: `${seg.value}%`, background: seg.color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-2.5">
            {packet.income.allocation.map((seg) => (
              <div key={seg.label} className="flex items-center gap-1.5 text-[11px] text-[var(--text-faint)]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: seg.color }} /> {seg.label}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Historical repayment behavior" sub={packet.repayment.facility} />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12.5px] text-[var(--text-muted)]">{packet.repayment.outstanding}</span>
            <Badge tone={packet.repayment.status === "Performing" ? "mint" : "red"}>{packet.repayment.status}</Badge>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {packet.repayment.months.map((m) => (
              <div key={m.label} className="text-center">
                <div
                  className="h-9 rounded-md"
                  style={{
                    background:
                      m.status === "on_time" ? "var(--mint)" : m.status === "late" ? "var(--red)" : "var(--surface-3)",
                  }}
                />
                <div className="text-[9.5px] text-[var(--text-faint)] mt-1 mono">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="text-[11.5px] text-[var(--text-faint)] mt-3">{packet.repayment.note}</div>
        </Card>
      </div>
    </div>
  );
}
