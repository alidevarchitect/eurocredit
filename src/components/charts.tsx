"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const gridColor = "var(--border)";
const axisColor = "var(--text-faint)";

interface TooltipPayloadItem {
  dataKey?: string | number;
  name?: string;
  value?: string | number;
  color?: string;
  fill?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2 text-[11.5px] shadow-lg mono">
      {label && <div className="mb-1 text-[var(--text-muted)]">{label}</div>}
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[var(--text)]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color || p.fill }} />
          <span>{p.name}:</span>
          <span className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function ApplicationVolumeChart({
  data,
}: {
  data: { month: string; approved: number; review: number; rejected: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={2} barCategoryGap="22%">
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
        <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
        <Bar dataKey="approved" stackId="a" fill="var(--mint)" name="Approved" radius={[0, 0, 0, 0]} />
        <Bar dataKey="review" stackId="a" fill="var(--amber)" name="Review" />
        <Bar dataKey="rejected" stackId="a" fill="var(--red)" name="Rejected" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ApprovalRateChart({ data }: { data: { month: string; rate: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="approvalFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--mint)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--mint)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
        <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={36} unit="%" />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="rate" name="Approval rate" stroke="var(--mint)" strokeWidth={2} fill="url(#approvalFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  centerLabel,
  centerValue,
  size = 200,
}: {
  data: { label: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="70%"
            outerRadius="100%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.label} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {centerValue && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[22px] font-semibold tabular text-[var(--text)]">{centerValue}</div>
          {centerLabel && <div className="text-[10.5px] text-[var(--text-muted)] mt-0.5 text-center px-4">{centerLabel}</div>}
        </div>
      )}
    </div>
  );
}

export function TrendLineChart({
  data,
  dataKey,
  xKey = "month",
  color = "var(--amber)",
  unit,
  height = 220,
  domain,
}: {
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  unit?: string;
  height?: number;
  domain?: [number, number];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`fill-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: axisColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
        <YAxis
          tick={{ fill: axisColor, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={40}
          unit={unit}
          domain={domain}
        />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#fill-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DualLineChart({
  data,
  height = 240,
}: {
  data: { month: string; actual: number | null; predicted: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
        <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={36} unit="%" />
        <Tooltip content={<ChartTooltip />} />
        <Line type="monotone" dataKey="actual" name="Actual" stroke="var(--blue)" strokeWidth={2} dot={false} />
        <Line
          type="monotone"
          dataKey="predicted"
          name="Predicted"
          stroke="var(--purple)"
          strokeWidth={2}
          strokeDasharray="4 3"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function HorizontalBarChart({
  data,
  dataKey,
  labelKey,
  color = "var(--mint)",
  height = 220,
  colorByTone,
}: {
  data: Record<string, unknown>[];
  dataKey: string;
  labelKey: string;
  color?: string;
  height?: number;
  colorByTone?: Record<string, string>;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
        <XAxis type="number" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey={labelKey}
          tick={{ fill: axisColor, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
        <Bar dataKey={dataKey} radius={[0, 4, 4, 0]}>
          {data.map((d, i) => {
            const tone = (d as { tone?: string }).tone;
            return <Cell key={i} fill={colorByTone && tone ? colorByTone[tone] : color} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function VerticalBarChart({
  data,
  dataKey,
  labelKey,
  color = "var(--mint)",
  height = 220,
}: {
  data: Record<string, unknown>[];
  dataKey: string;
  labelKey: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey={labelKey} tick={{ fill: axisColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
        <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StackedSegmentBar({
  data,
}: {
  data: { segment: string; good: number; bad: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 8 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
        <XAxis type="number" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
        <YAxis
          type="category"
          dataKey="segment"
          tick={{ fill: axisColor, fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={120}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--surface-2)" }} />
        <Bar dataKey="good" stackId="s" name="Good" fill="var(--mint)" radius={[4, 0, 0, 4]} />
        <Bar dataKey="bad" stackId="s" name="Bad" fill="var(--red)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
