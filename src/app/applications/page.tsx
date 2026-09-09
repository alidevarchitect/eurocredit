"use client";

import { useMemo, useState } from "react";
import { Download, Plus, Search, FileWarning } from "lucide-react";
import { PageHeader, Badge, Button, Avatar } from "@/components/ui/primitives";
import { applications, pipelineStages, formatEUR } from "@/lib/data/applications";
import type { Application, RiskBand } from "@/lib/types";

const riskBandOptions: RiskBand[] = ["AAA-AA", "A", "BBB", "BB", "B & below"];

const slaTone: Record<Application["sla"], "mint" | "amber" | "red" | "neutral"> = {
  on_track: "mint",
  at_risk: "amber",
  breached: "red",
  complete: "mint",
  pending: "neutral",
};

const stageDot: Record<Application["stage"], string> = {
  new: "var(--blue)",
  ai_review: "var(--purple)",
  manual_review: "var(--amber)",
  approved: "var(--mint)",
  rejected: "var(--red)",
  disbursed: "var(--mint)",
};

function ApplicationCard({ app }: { app: Application }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3.5 hover:border-[var(--border-strong)] transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-[var(--text)] truncate">{app.borrower}</div>
          <div className="text-[10.5px] text-[var(--text-faint)] mono mt-0.5">{app.appId} · {app.sector}</div>
        </div>
        <Badge tone={app.riskScore >= 78 ? "mint" : app.riskScore >= 55 ? "amber" : "red"}>
          RISK {app.riskScore}
        </Badge>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-[16px] font-semibold tabular text-[var(--text)]">{formatEUR(app.amount)}</span>
        <span className="text-[11px] text-[var(--text-faint)]">{app.product}</span>
      </div>

      <div className="mt-2.5">
        {app.documentsComplete ? (
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--mint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)]" /> Documents complete
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--amber)]">
            <FileWarning size={11} /> {app.missingDocs}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-2.5">
        <div className="flex items-center gap-1.5">
          <Avatar initials={app.owner.initials} className="h-5 w-5 text-[9.5px]" />
          <span className="text-[10.5px] text-[var(--text-faint)]">{app.submitted}</span>
        </div>
        <Badge tone={slaTone[app.sla]} dot>
          {app.slaLabel}
        </Badge>
      </div>
    </div>
  );
}

export default function ApplicationsPipelinePage() {
  const [query, setQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskBand | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((a) => {
      const matchesQuery =
        !q || a.borrower.toLowerCase().includes(q) || a.appId.toLowerCase().includes(q) || a.sector.toLowerCase().includes(q);
      const matchesRisk = riskFilter === "all" || a.riskBand === riskFilter;
      return matchesQuery && matchesRisk;
    });
  }, [query, riskFilter]);

  return (
    <div>
      <PageHeader
        eyebrow="Origination"
        title="Applications Pipeline"
        description="Track every loan application across the funnel — from intake to disbursement — with AI decisions, SLAs, and document status."
        action={
          <>
            <Button variant="secondary">
              <Download size={14} /> Export
            </Button>
            <Button variant="primary">
              <Plus size={14} /> New application
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2.5 mb-5">
        <div className="flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1.5 flex-1 min-w-[220px] max-w-sm">
          <Search size={14} className="text-[var(--text-faint)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applicant, application ID or sector"
            className="flex-1 bg-transparent text-[12.5px] text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none"
          />
        </div>
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value as RiskBand | "all")}
          className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1.5 text-[12.5px] text-[var(--text)] outline-none"
        >
          <option value="all">All risk bands</option>
          {riskBandOptions.map((band) => (
            <option key={band} value={band}>
              {band}
            </option>
          ))}
        </select>
        <span className="text-[12px] text-[var(--text-faint)] ml-auto mono">
          {filtered.length} of {applications.length} applications
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        {pipelineStages.map((stage) => {
          const stageApps = filtered.filter((a) => a.stage === stage.key);
          return (
            <div key={stage.key} className="min-w-0">
              <div className="flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: stageDot[stage.key] }} />
                  <span className="text-[12px] font-semibold text-[var(--text)] truncate">{stage.label}</span>
                </div>
                <span className="text-[11px] text-[var(--text-faint)] mono shrink-0">{stageApps.length}</span>
              </div>
              <div className="text-[10.5px] text-[var(--text-faint)] mb-2.5 -mt-2">{stage.hint}</div>
              <div className="flex flex-col gap-2.5">
                {stageApps.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
                {stageApps.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[var(--border)] py-8 text-center text-[11px] text-[var(--text-faint)]">
                    No applications
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
