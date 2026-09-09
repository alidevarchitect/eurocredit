"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, ChevronsUpDown, Menu } from "lucide-react";
import { flatNav } from "@/lib/nav";
import { CommandPalette } from "@/components/shell/command-palette";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { Notifications } from "@/components/shell/notifications";
import { Avatar } from "@/components/ui/primitives";

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const current = flatNav.find((item) => item.href === pathname);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur px-5 py-3">
      <div className="flex items-center gap-2.5 text-[12.5px] text-[var(--text-muted)] min-w-0">
        <button
          onClick={onMenuClick}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={16} />
        </button>
        <span className="text-[var(--text-faint)] hidden sm:inline">Eurocredit</span>
        <ChevronRight size={13} className="text-[var(--text-faint)] hidden sm:inline" />
        <span className="font-medium text-[var(--text)] truncate">{current?.crumb ?? "Overview"}</span>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <CommandPalette />
        <ThemeToggle />
        <Notifications />
        <div className="hidden sm:flex items-center gap-2 pl-2.5 ml-1 border-l border-[var(--border)]">
          <Avatar initials="AR" />
          <div className="leading-tight">
            <div className="text-[12px] font-medium text-[var(--text)]">Adnan Rahman</div>
            <div className="text-[10.5px] text-[var(--text-faint)]">Head of Credit Risk</div>
          </div>
          <ChevronsUpDown size={13} className="text-[var(--text-faint)] ml-0.5" />
        </div>
      </div>
    </header>
  );
}
