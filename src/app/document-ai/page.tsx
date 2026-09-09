"use client";

import { useState } from "react";
import { UploadCloud, RefreshCw, CheckCircle2, AlertTriangle, XCircle, IdCard, Receipt, Landmark, Zap } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button, ProgressBar } from "@/components/ui/primitives";
import { documents, documentDossier, extractedProfile, validationResults } from "@/lib/data/documents";

const docIcon = { "ID Card": IdCard, "Salary Slip": Receipt, "Bank Statement": Landmark, "Utility Bill": Zap };

const statusTone: Record<string, "mint" | "amber" | "red"> = {
  Verified: "mint",
  "Needs review": "amber",
  "Action needed": "red",
};

const validationIcon = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle };
const validationTone: Record<string, string> = {
  pass: "text-[var(--mint)]",
  warn: "text-[var(--amber)]",
  fail: "text-[var(--red)]",
};

export default function DocumentProcessingPage() {
  const [rerunning, setRerunning] = useState(false);

  function rerun() {
    setRerunning(true);
    setTimeout(() => setRerunning(false), 1200);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Document processing"
        description="Application-linked intake, classification, OCR extraction, cross-document validation and exception detection for borrower documents."
        action={
          <div className="flex items-center gap-2">
            <Badge tone="neutral" className="text-[12px] px-2.5 py-1">
              Dossier {documentDossier.borrower} · {documentDossier.appId}
            </Badge>
            <Button variant="primary">
              <UploadCloud size={14} /> Upload document
            </Button>
          </div>
        }
      />

      <Card className="mb-5 border-dashed">
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--mint-dim)] text-[var(--mint)]">
            <UploadCloud size={20} />
          </div>
          <div className="text-[13.5px] font-medium text-[var(--text)]">
            Drag &amp; drop documents here, or <span className="text-[var(--mint)]">browse files</span>
          </div>
          <div className="text-[11.5px] text-[var(--text-faint)]">
            PDF, JPG or PNG · up to 20 MB · ID, bank statement, salary slip, utility bill
          </div>
          <Button variant="secondary" className="mt-2" onClick={rerun} disabled={rerunning}>
            <RefreshCw size={13} className={rerunning ? "animate-spin" : ""} /> {rerunning ? "Re-running…" : "Re-run extraction"}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {documents.map((doc) => {
            const Icon = docIcon[doc.name as keyof typeof docIcon];
            return (
              <Card key={doc.id}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-2)] text-[var(--text-muted)]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[var(--text)]">{doc.name}</div>
                      <div className="text-[11px] text-[var(--text-faint)] mono mt-0.5">{doc.file}</div>
                    </div>
                  </div>
                  <Badge tone={statusTone[doc.status]}>{doc.status}</Badge>
                </div>

                <div className="flex items-center justify-between text-[11.5px] text-[var(--text-muted)] mb-1">
                  <span>Extraction confidence</span>
                  <span className="tabular font-medium text-[var(--text)]">{doc.confidence}%</span>
                </div>
                <ProgressBar value={doc.confidence} tone={doc.confidence >= 95 ? "mint" : doc.confidence >= 90 ? "amber" : "red"} className="mb-4" />

                <div className="grid grid-cols-2 gap-2.5">
                  {doc.fields.map((f) => (
                    <div key={f.label} className="rounded-lg bg-[var(--surface-2)] px-3 py-2">
                      <div className="text-[10px] text-[var(--text-faint)]">{f.label}</div>
                      <div className="text-[12.5px] font-medium text-[var(--text)] mt-0.5 truncate">{f.value}</div>
                      <div className="text-[9.5px] text-[var(--text-faint)] mono mt-0.5">{f.confidence}% conf.</div>
                    </div>
                  ))}
                </div>

                {doc.warning && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-[var(--amber)]/30 bg-[var(--amber-dim)] px-3 py-2.5 text-[11.5px] text-[var(--amber)]">
                    <AlertTriangle size={13} className="mt-0.5 shrink-0" /> {doc.warning}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Extracted customer profile" sub="Auto-compiled from 4 documents" />
            <div className="divide-y divide-[var(--border)]">
              {extractedProfile.map((f) => (
                <div key={f.label} className="flex items-center justify-between py-2.5 gap-2">
                  <div>
                    <div className="text-[12px] text-[var(--text-muted)]">{f.label}</div>
                    <div className="text-[12.5px] font-medium text-[var(--text)] mt-0.5">{f.value}</div>
                  </div>
                  <Badge tone={f.flagged ? "amber" : "mint"}>{f.confidence}%</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardHeader title="Validation results" />
              <Badge tone="neutral">2 pass · 1 warn · 1 fail</Badge>
            </div>
            <div className="space-y-3">
              {validationResults.map((v) => {
                const Icon = validationIcon[v.status];
                return (
                  <div key={v.label} className="flex items-start gap-2.5">
                    <Icon size={15} className={`mt-0.5 shrink-0 ${validationTone[v.status]}`} />
                    <div>
                      <div className="text-[12.5px] font-medium text-[var(--text)]">{v.label}</div>
                      <div className="text-[11.5px] text-[var(--text-faint)] mt-0.5 leading-snug">{v.detail}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg bg-[var(--red-dim)] px-3 py-2 text-center text-[11.5px] font-medium text-[var(--red)]">
              Action required
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
