"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ShieldAlert, Clock, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { operationalAlerts } from "@/lib/data/alerts";

const toneIcon: Record<string, typeof AlertTriangle> = {
  red: ShieldAlert,
  amber: Clock,
  mint: CheckCircle2,
  blue: RefreshCw,
};

const toneColor: Record<string, string> = {
  red: "text-[var(--red)] bg-[var(--red-dim)]",
  amber: "text-[var(--amber)] bg-[var(--amber-dim)]",
  mint: "text-[var(--mint)] bg-[var(--mint-dim)]",
  blue: "text-[var(--blue)] bg-[var(--blue-dim)]",
};

export function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-colors"
        aria-label="Notifications"
      >
        <Bell size={16} />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--red)] pulse-dot" />
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-40 w-80 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-2xl fade-up">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <span className="text-[13px] font-semibold text-[var(--text)]">Operational alerts</span>
            <span className="text-[11px] text-[var(--text-faint)] mono">{operationalAlerts.length} open</span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {operationalAlerts.map((a, i) => {
              const Icon = toneIcon[a.tone];
              return (
                <div key={i} className="flex gap-3 border-b border-[var(--border)] px-4 py-3 last:border-0">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${toneColor[a.tone]}`}>
                    <Icon size={13} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-medium text-[var(--text)]">{a.title}</div>
                    <div className="text-[11.5px] text-[var(--text-muted)] mt-0.5 leading-snug">{a.detail}</div>
                    <div className="text-[10.5px] text-[var(--text-faint)] mt-1 mono">{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
