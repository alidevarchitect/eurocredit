import {
  RefreshCw,
  Plug,
  Zap,
  Gauge,
  AlertCircle,
  Users,
  Sparkles,
  Database,
  Cloud,
  Landmark,
  Scale,
  ScanLine,
  Bell,
  Warehouse,
  ArrowRight,
} from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button } from "@/components/ui/primitives";
import { connectors, architectureFlow, apiActivityLog, integrationKpis } from "@/lib/data/integrations";

const flowIcon = { users: Users, sparkles: Sparkles, database: Database, cloud: Cloud };

const connectorIcon: Record<string, typeof Database> = {
  alta: Database,
  crm: Users,
  bureau: Landmark,
  registry: Scale,
  ocr: ScanLine,
  notify: Bell,
  warehouse: Warehouse,
};

const statusColor: Record<string, "mint" | "amber"> = {
  Operational: "mint",
  Degraded: "amber",
};

export default function IntegrationsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Platform architecture"
        title="ALTA + CRM automation hub"
        description="Real-time data exchange across the core lending system, CRM, decision engine, external data providers, document AI and reporting services."
        action={
          <Button variant="primary">
            <RefreshCw size={14} /> Run health check
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] text-[var(--text-muted)]">Connectors active</span>
            <Plug size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">{integrationKpis.connectorsOnline}</div>
          <div className="text-[11px] text-[var(--amber)] mt-1">Attention</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] text-[var(--text-muted)]">API requests today</span>
            <Zap size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">{integrationKpis.apiRequestsToday}</div>
          <div className="text-[11px] text-[var(--mint)] mt-1">↗ 8.3%</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] text-[var(--text-muted)]">Avg latency</span>
            <Gauge size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">{integrationKpis.avgLatency}</div>
          <div className="text-[11px] text-[var(--red)] mt-1">↗ 11%</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] text-[var(--text-muted)]">Errors (24h)</span>
            <AlertCircle size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">{integrationKpis.errors24h}</div>
          <div className="text-[11px] text-[var(--mint)] mt-1">↘ 5</div>
        </Card>
      </div>

      <Card className="mb-5">
        <CardHeader title="System architecture" sub="Origination data flow across the platform" />
        <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
          {architectureFlow.map((node, i) => {
            const Icon = flowIcon[node.icon as keyof typeof flowIcon];
            return (
              <div key={node.id} className="flex items-center flex-1">
                <div
                  className={`flex-1 rounded-xl border p-4 text-center ${
                    node.highlight
                      ? "border-[var(--mint)]/40 bg-[var(--mint-dim)]/40"
                      : "border-[var(--border)] bg-[var(--surface-2)]"
                  }`}
                >
                  <div
                    className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${
                      node.highlight ? "bg-[var(--mint)] text-[#04140f]" : "bg-[var(--surface-3)] text-[var(--text-muted)]"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="text-[12.5px] font-semibold text-[var(--text)]">{node.label}</div>
                  <div className="text-[10.5px] text-[var(--text-faint)] mt-0.5">{node.sub}</div>
                </div>
                {i < architectureFlow.length - 1 && (
                  <ArrowRight size={16} className="mx-2 shrink-0 text-[var(--text-faint)] hidden md:block" />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-5">
        {connectors.map((c) => {
          const Icon = connectorIcon[c.id];
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-2)] text-[var(--text-muted)]">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[12.5px] font-semibold text-[var(--text)]">{c.name}</div>
                    <div className="text-[10.5px] text-[var(--text-faint)] mt-0.5">{c.provider}</div>
                  </div>
                </div>
                <Badge tone={statusColor[c.status]} dot>
                  {c.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-[11.5px]">
                <div>
                  <div className="text-[10px] text-[var(--text-faint)]">Data flow</div>
                  <div className="text-[var(--text)] mt-0.5">{c.flow}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[var(--text-faint)]">Latency</div>
                  <div className="text-[var(--text)] mt-0.5 tabular">{c.latency}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-faint)]">Requests today</div>
                  <div className="text-[var(--text)] mt-0.5 tabular">{c.requestsToday.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[var(--text-faint)]">Errors (24h)</div>
                  <div className={`mt-0.5 tabular ${c.errors24h > 5 ? "text-[var(--red)]" : "text-[var(--text)]"}`}>{c.errors24h}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[var(--border)] text-[10.5px] text-[var(--text-faint)]">
                <span className="flex items-center gap-1"><RefreshCw size={10} /> {c.lastSync}</span>
                <span className="mono">{c.uptime} uptime</span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card padded={false}>
        <div className="flex items-center justify-between p-5 pb-3">
          <CardHeader title="API activity log" sub="Live request stream across connectors" />
          <Badge tone="mint" dot>
            Live
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-left text-[var(--text-faint)] border-y border-[var(--border)]">
                <th className="font-medium py-2 px-5">Source</th>
                <th className="font-medium py-2 px-3 hidden sm:table-cell">Endpoint</th>
                <th className="font-medium py-2 px-3">Activity</th>
                <th className="font-medium py-2 px-3 text-right">Status</th>
                <th className="font-medium py-2 px-3 text-right hidden md:table-cell">Latency</th>
                <th className="font-medium py-2 px-5 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {apiActivityLog.map((l) => (
                <tr key={l.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-2.5 px-5 font-medium text-[var(--text)]">{l.source}</td>
                  <td className="py-2.5 px-3 text-[var(--text-faint)] mono hidden sm:table-cell">{l.method} {l.endpoint}</td>
                  <td className="py-2.5 px-3 text-[var(--text-muted)]">{l.activity}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Badge tone={l.status < 300 ? "mint" : "red"}>{l.status}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-right tabular text-[var(--text-faint)] hidden md:table-cell">{l.latency}</td>
                  <td className="py-2.5 px-5 text-right text-[var(--text-faint)] mono">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
