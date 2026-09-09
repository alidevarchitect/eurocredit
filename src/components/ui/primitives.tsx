import type { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]",
        padded && "p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  sub,
  icon,
  action,
}: {
  title: string;
  sub?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-start gap-2.5">
        {icon && <div className="mt-0.5 text-[var(--text-muted)]">{icon}</div>}
        <div>
          <div className="text-[13.5px] font-semibold text-[var(--text)]">{title}</div>
          {sub && <div className="text-[12px] text-[var(--text-muted)] mt-0.5">{sub}</div>}
        </div>
      </div>
      {action}
    </div>
  );
}

const badgeTones: Record<string, string> = {
  mint: "bg-[var(--mint-dim)] text-[var(--mint)] border-[color-mix(in_srgb,var(--mint)_35%,transparent)]",
  amber: "bg-[var(--amber-dim)] text-[var(--amber)] border-[color-mix(in_srgb,var(--amber)_35%,transparent)]",
  blue: "bg-[var(--blue-dim)] text-[var(--blue)] border-[color-mix(in_srgb,var(--blue)_35%,transparent)]",
  purple: "bg-[var(--purple-dim)] text-[var(--purple)] border-[color-mix(in_srgb,var(--purple)_35%,transparent)]",
  red: "bg-[var(--red-dim)] text-[var(--red)] border-[color-mix(in_srgb,var(--red)_35%,transparent)]",
  neutral: "bg-[var(--surface-3)] text-[var(--text-muted)] border-[var(--border-strong)]",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  dot,
}: {
  children: ReactNode;
  tone?: keyof typeof badgeTones;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4 mono",
        badgeTones[tone],
        className
      )}
    >
      {dot && <span className={clsx("h-1.5 w-1.5 rounded-full", `bg-current`)} />}
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  max = 100,
  tone = "mint",
  className,
  trackClassName,
}: {
  value: number;
  max?: number;
  tone?: keyof typeof badgeTones;
  className?: string;
  trackClassName?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const colorVar =
    tone === "mint" ? "var(--mint)" : tone === "amber" ? "var(--amber)" : tone === "red" ? "var(--red)" : tone === "blue" ? "var(--blue)" : tone === "purple" ? "var(--purple)" : "var(--text-muted)";
  return (
    <div className={clsx("h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-3)]", trackClassName)}>
      <div
        className={clsx("h-full rounded-full transition-all duration-700 ease-out", className)}
        style={{ width: `${pct}%`, background: colorVar }}
      />
    </div>
  );
}

export function StatusDot({ tone = "mint", pulse = false }: { tone?: keyof typeof badgeTones; pulse?: boolean }) {
  const colorVar =
    tone === "mint" ? "var(--mint)" : tone === "amber" ? "var(--amber)" : tone === "red" ? "var(--red)" : tone === "blue" ? "var(--blue)" : "var(--text-muted)";
  return (
    <span
      className={clsx("inline-block h-1.5 w-1.5 rounded-full", pulse && "pulse-dot")}
      style={{ background: colorVar }}
    />
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--mint)] mono mb-1.5">
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
        <h1 className="text-[24px] font-semibold tracking-[-0.01em] text-[var(--text)]">{title}</h1>
        {description && (
          <p className="text-[13.5px] text-[var(--text-muted)] mt-1.5 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function Button({
  children,
  variant = "secondary",
  className,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-[var(--mint)] text-[#04140f] hover:bg-[var(--mint-strong)]",
        variant === "secondary" &&
          "bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface-3)]",
        variant === "ghost" && "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Switch({
  checked,
  onChange,
  className,
}: {
  checked: boolean;
  onChange?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={clsx("relative h-5 w-9 shrink-0 rounded-full transition-colors", className)}
      style={{ background: checked ? "var(--mint)" : "var(--surface-3)" }}
    >
      <span
        className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform"
        style={{ transform: checked ? "translateX(16px)" : "translateX(0px)" }}
      />
    </button>
  );
}

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <div
      className={clsx(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--mint-dim)] text-[11px] font-semibold text-[var(--mint)] mono",
        className
      )}
    >
      {initials}
    </div>
  );
}

export function CircularGauge({
  value,
  max = 100,
  size = 96,
  stroke = 8,
  color = "var(--mint)",
  label,
  sub,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  color?: string;
  label: string;
  sub?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - pct);
  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-[20px] font-semibold tabular text-[var(--text)]">{label}</div>
        </div>
      </div>
      {sub && <div className="mt-2.5 text-[11px] text-[var(--text-muted)] text-center leading-tight">{sub}</div>}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  sub,
  delta,
  positive,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  positive?: boolean;
  icon?: ReactNode;
}) {
  return (
    <Card className="fade-up">
      <div className="flex items-start justify-between">
        <div className="text-[12.5px] text-[var(--text-muted)]">{label}</div>
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-2)] text-[var(--text-muted)]">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-2 text-[26px] font-semibold tabular text-[var(--text)]">{value}</div>
      <div className="mt-1.5 flex items-center gap-2">
        {sub && <span className="text-[11.5px] text-[var(--text-faint)]">{sub}</span>}
      </div>
      {delta && (
        <div
          className={clsx(
            "mt-2.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium mono",
            positive ? "bg-[var(--mint-dim)] text-[var(--mint)]" : "bg-[var(--red-dim)] text-[var(--red)]"
          )}
        >
          {positive ? "↗" : "↘"} {delta}
        </div>
      )}
    </Card>
  );
}
