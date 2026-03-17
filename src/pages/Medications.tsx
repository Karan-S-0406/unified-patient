import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { medications } from "@/lib/sample-data";
import { useState } from "react";
import { Pill } from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = "active" | "past" | "all";

export default function Medications() {
  const [filter, setFilter] = useState<Filter>("active");

  const filtered = filter === "all" ? medications :
    filter === "active" ? medications.filter(m => m.status === "Active") :
    medications.filter(m => m.status !== "Active");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Medications</h1>
          <p className="text-sm text-muted-foreground mt-1">View your current and past medications prescribed by your care team.</p>
        </div>

        <div className="flex gap-2">
          {(["active", "past", "all"] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px]",
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              )}>
              {f === "active" ? "Active" : f === "past" ? "Past" : "All"}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Pill} title="No medications found" description="No medications match your current filter." />
        ) : (
          <div className="space-y-3">
            {filtered.map((m, i) => (
              <SectionCard key={i}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-[8px] bg-accent flex items-center justify-center shrink-0">
                      <Pill className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.name} {m.dosage}</p>
                      <p className="text-xs text-muted-foreground">{m.frequency}</p>
                    </div>
                  </div>
                  <StatusBadge label={m.status} variant={m.status === "Active" ? "success" : "default"} />
                </div>
                <div className="grid sm:grid-cols-3 gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                  <div><span className="font-medium">Provider:</span> {m.provider}</div>
                  <div><span className="font-medium">Start Date:</span> <span className="tabular-nums">{new Date(m.startDate).toLocaleDateString()}</span></div>
                  <div><span className="font-medium">Instructions:</span> {m.instructions}</div>
                </div>
              </SectionCard>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
