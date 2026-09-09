import { Play, Plus, Zap, ListTodo, Gauge, GitCommitHorizontal } from "lucide-react";
import { PageHeader, Card, CardHeader, Badge, Button, Switch } from "@/components/ui/primitives";
import { automationRules, escalationBoard, taskQueue, workflowActivity } from "@/lib/data/workflow";

const categoryTone: Record<string, "mint" | "amber" | "purple" | "red" | "blue"> = {
  Routing: "purple",
  Notification: "blue",
  Approval: "mint",
  Compliance: "red",
  Collections: "amber",
};

const priorityTone: Record<string, "mint" | "amber" | "red" | "neutral" | "blue"> = {
  Low: "neutral",
  Medium: "blue",
  High: "amber",
  Urgent: "red",
};

const activityTone: Record<string, string> = {
  mint: "text-[var(--mint)] bg-[var(--mint-dim)]",
  amber: "text-[var(--amber)] bg-[var(--amber-dim)]",
  blue: "text-[var(--blue)] bg-[var(--blue-dim)]",
  purple: "text-[var(--purple)] bg-[var(--purple-dim)]",
  red: "text-[var(--red)] bg-[var(--red-dim)]",
};

export default function WorkflowAutomationPage() {
  const activeRules = automationRules.filter((r) => r.active).length;

  return (
    <div>
      <PageHeader
        eyebrow="Operations automation"
        title="Workflow automation"
        description="Configurable business rules and automated task routing across lending and wider operational processes — with escalation for exceptions."
        action={
          <>
            <Badge tone="mint" dot className="text-[12px] px-2.5 py-1.5">
              Engine active
            </Badge>
            <Button variant="primary">
              <Play size={13} /> Test rules
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-[12.5px] text-[var(--text-muted)]">Active rules</div>
            <GitCommitHorizontal size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">
            {activeRules}/{automationRules.length}
          </div>
          <div className="text-[11px] text-[var(--text-faint)] mt-1">Evaluated on every event</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-[12.5px] text-[var(--text-muted)]">Tasks in queue</div>
            <ListTodo size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">{taskQueue.length}</div>
          <div className="text-[11px] text-[var(--amber)] mt-1">1 overdue</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-[12.5px] text-[var(--text-muted)]">Actions automated today</div>
            <Zap size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">75</div>
          <div className="text-[11px] text-[var(--text-faint)] mt-1">Across all active rules</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-[12.5px] text-[var(--text-muted)]">SLA on-track</div>
            <Gauge size={14} className="text-[var(--text-faint)]" />
          </div>
          <div className="mt-2 text-[24px] font-semibold tabular text-[var(--text)]">90%</div>
          <div className="text-[11px] text-[var(--text-faint)] mt-1">Open tasks within SLA</div>
        </Card>
      </div>

      <Card padded={false} className="mb-4">
        <div className="flex items-center justify-between p-5 pb-3">
          <CardHeader title="Automation rules" sub={`${activeRules} of ${automationRules.length} rules active · evaluated on every event`} />
          <Button variant="secondary">
            <Plus size={13} /> New rule
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-left text-[var(--text-faint)] border-y border-[var(--border)]">
                <th className="font-medium py-2 px-5">On</th>
                <th className="font-medium py-2 px-3">Rule</th>
                <th className="font-medium py-2 px-3 hidden md:table-cell">Category</th>
                <th className="font-medium py-2 px-3 text-right">Today</th>
                <th className="font-medium py-2 px-3 text-right hidden sm:table-cell">Runs (30d)</th>
                <th className="font-medium py-2 px-3 text-right">Success</th>
                <th className="font-medium py-2 px-3 text-right hidden lg:table-cell">Last run</th>
              </tr>
            </thead>
            <tbody>
              {automationRules.map((rule) => (
                <tr key={rule.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-2.5 px-5">
                    <Switch checked={rule.active} />
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-medium text-[var(--text)]">{rule.name}</div>
                    <div className="text-[11px] text-[var(--text-faint)] mono mt-0.5">
                      IF {rule.condition} → {rule.action}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 hidden md:table-cell">
                    <Badge tone={categoryTone[rule.category]}>{rule.category}</Badge>
                  </td>
                  <td className="py-2.5 px-3 text-right tabular">{rule.today}</td>
                  <td className="py-2.5 px-3 text-right tabular hidden sm:table-cell">{rule.runs30d}</td>
                  <td className="py-2.5 px-3 text-right tabular text-[var(--mint)]">{rule.success}</td>
                  <td className="py-2.5 px-3 text-right text-[var(--text-faint)] hidden lg:table-cell">{rule.lastRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mb-4">
        <CardHeader title="Escalation board" sub="Live routing across escalation tiers" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {escalationBoard.map((tier) => (
            <div key={tier.key}>
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <div className="text-[12px] font-semibold text-[var(--text)]">{tier.label}</div>
                  <div className="text-[10.5px] text-[var(--text-faint)]">{tier.hint}</div>
                </div>
                <span className="text-[11px] text-[var(--text-faint)] mono">{tier.tickets.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {tier.tickets.map((t) => (
                  <div key={t.id} className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-2.5">
                    <div className="text-[12px] font-medium text-[var(--text)] leading-snug">{t.title}</div>
                    <div className="text-[10.5px] text-[var(--text-faint)] mono mt-1">{t.appId}</div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge tone={priorityTone[t.priority]}>{t.priority}</Badge>
                      <span className={`text-[10.5px] mono ${t.overdue ? "text-[var(--red)]" : "text-[var(--text-faint)]"}`}>
                        {t.timeLeft}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card padded={false}>
          <div className="flex items-center justify-between p-5 pb-3">
            <CardHeader title="Automated task queue" sub={`${taskQueue.length} open · sorted by SLA`} />
            <Badge tone="red">1 overdue</Badge>
          </div>
          <div className="divide-y divide-[var(--border)] max-h-[420px] overflow-y-auto">
            {taskQueue.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="text-[12.5px] font-medium text-[var(--text)] truncate">{t.title}</div>
                  <div className="text-[11px] text-[var(--text-faint)] mt-0.5">
                    {t.meta} · <span className="mono">{t.owner}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <Badge tone={priorityTone[t.priority]}>{t.priority}</Badge>
                  <div className={`text-[10.5px] mono mt-1 ${t.overdue ? "text-[var(--red)]" : "text-[var(--text-faint)]"}`}>
                    {t.timeLeft}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padded={false}>
          <div className="flex items-center justify-between p-5 pb-3">
            <CardHeader title="Workflow activity" sub="Live automation event stream" />
            <Badge tone="mint" dot>
              Live
            </Badge>
          </div>
          <div className="divide-y divide-[var(--border)] max-h-[420px] overflow-y-auto">
            {workflowActivity.map((a) => (
              <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${activityTone[a.tone]}`}>
                  <Zap size={13} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-medium text-[var(--text)] truncate">{a.label}</div>
                  <div className="text-[11px] text-[var(--text-faint)] mt-0.5">{a.detail}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10.5px] text-[var(--text-faint)] mono">{a.time}</div>
                  <div className="text-[9.5px] text-[var(--text-faint)] mono mt-0.5">{a.code}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
