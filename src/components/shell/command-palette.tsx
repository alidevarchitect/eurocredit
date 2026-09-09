"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import { flatNav } from "@/lib/nav";
import { applications } from "@/lib/data/applications";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  function closePalette() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (v) {
            setQuery("");
            setActiveIndex(0);
          }
          return !v;
        });
      }
      if (e.key === "Escape") closePalette();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const pageResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return flatNav;
    return flatNav.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  const appResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return applications
      .filter((a) => a.borrower.toLowerCase().includes(q) || a.appId.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  const allResults = useMemo(
    () => [
      ...pageResults.map((p) => ({ kind: "page" as const, href: p.href, label: p.label, sub: "Page" })),
      ...appResults.map((a) => ({
        kind: "app" as const,
        href: "/applications",
        label: a.borrower,
        sub: `${a.appId} · Application`,
      })),
    ],
    [pageResults, appResults]
  );

  function go(href: string) {
    router.push(href);
    closePalette();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1.5 text-[12.5px] text-[var(--text-faint)] w-64 hover:border-[var(--mint)]/40 transition-colors"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Search applications, borrowers…</span>
        <kbd className="mono text-[10px] rounded border border-[var(--border-strong)] bg-[var(--surface-3)] px-1.5 py-0.5 text-[var(--text-faint)]">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[12vh]" onClick={closePalette}>
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-2xl fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--border)] px-4 py-3">
              <Search size={15} className="text-[var(--text-faint)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((i) => Math.min(i + 1, allResults.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter" && allResults[activeIndex]) {
                    go(allResults[activeIndex].href);
                  }
                }}
                placeholder="Search applications, borrowers, or jump to a page…"
                className="flex-1 bg-transparent text-[13.5px] text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none"
              />
              <kbd className="mono text-[10px] rounded border border-[var(--border-strong)] px-1.5 py-0.5 text-[var(--text-faint)]">
                esc
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {allResults.length === 0 && (
                <div className="px-4 py-6 text-center text-[12.5px] text-[var(--text-faint)]">No results</div>
              )}
              {allResults.map((r, i) => (
                <button
                  key={`${r.kind}-${r.label}-${i}`}
                  onClick={() => go(r.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-[13px] transition-colors ${
                    i === activeIndex ? "bg-[var(--surface-3)] text-[var(--text)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  <span className="truncate">{r.label}</span>
                  <span className="flex items-center gap-2 shrink-0 text-[11px] text-[var(--text-faint)] mono">
                    {r.sub}
                    {i === activeIndex && <CornerDownLeft size={12} />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
