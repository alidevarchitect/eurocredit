"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Sparkles, Radio, X } from "lucide-react";
import { navGroups } from "@/lib/nav";
import { Avatar } from "@/components/ui/primitives";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--mint-dim)] text-[var(--mint)]">
          <Sparkles size={16} strokeWidth={2.25} />
        </div>
        <div>
          <div className="text-[14px] font-semibold leading-tight tracking-[-0.01em]">Eurocredit</div>
          <div className="text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/40 mono">
            Lending Intelligence
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-none px-3 pb-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <div className="px-2.5 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/30 mono">
              {group.label}
            </div>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={clsx(
                      "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] font-medium transition-colors",
                      active
                        ? "bg-white/[0.07] text-white"
                        : "text-white/55 hover:text-white/90 hover:bg-white/[0.04]"
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-4 w-[2.5px] -translate-y-1/2 rounded-full bg-[var(--mint)]" />
                    )}
                    <Icon size={15} strokeWidth={2} className={active ? "text-[var(--mint)]" : "opacity-70"} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mx-3 mb-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
        <div className="flex items-center gap-2 text-[11.5px] font-medium text-white/85">
          <Radio size={13} className="text-[var(--mint)]" />
          All systems operational
        </div>
        <div className="mt-1 text-[10.5px] text-white/35 mono">6 connectors · 99.9% uptime</div>
      </div>

      <div className="flex items-center gap-2.5 border-t border-white/[0.06] px-4 py-3">
        <Avatar initials="AR" className="bg-[var(--mint-dim)]" />
        <div className="min-w-0">
          <div className="truncate text-[12px] font-medium text-white/90">Adnan Rahman</div>
          <div className="truncate text-[10.5px] text-white/40">Head of Credit Risk</div>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-[228px] shrink-0 flex-col bg-[var(--sidebar-bg)] text-[#e9eaec] border-r border-white/[0.06]">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="relative flex h-full w-[260px] flex-col bg-[var(--sidebar-bg)] text-[#e9eaec] shadow-2xl fade-up">
        <button
          onClick={onClose}
          className="absolute right-3 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-white/50 hover:bg-white/[0.06] hover:text-white"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
        <SidebarContent onNavigate={onClose} />
      </aside>
    </div>
  );
}
