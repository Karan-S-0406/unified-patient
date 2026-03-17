import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { messages } from "@/lib/sample-data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Calendar, DollarSign, Shield, Bell, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const typeIcons: Record<string, React.ElementType> = {
  appointment: Calendar,
  billing: DollarSign,
  portal: Shield,
  consent: Shield,
  followup: Heart,
};

const typeLabels: Record<string, string> = {
  appointment: "Appointment",
  billing: "Billing",
  portal: "Portal",
  consent: "Consent",
  followup: "Follow-Up",
};

export default function Messages() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = messages.find(m => m.id === selectedId);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">View notifications, reminders, and communications from your care team.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Message list */}
          <div className="lg:col-span-2 space-y-2">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9 min-h-[44px]" />
            </div>
            {messages.map(m => {
              const Icon = typeIcons[m.type] || Bell;
              return (
                <button key={m.id} onClick={() => setSelectedId(m.id)}
                  className={cn("w-full text-left p-4 rounded-[12px] transition-colors min-h-[44px]",
                    selectedId === m.id ? "bg-accent shadow-card" : "hover:bg-muted"
                  )}>
                  <div className="flex items-start gap-3">
                    <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0", m.read ? "bg-transparent" : "bg-primary")} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground">{typeLabels[m.type]}</span>
                      </div>
                      <p className={cn("text-sm truncate", m.read ? "text-foreground" : "text-foreground font-medium")}>{m.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{m.body}</p>
                      <p className="text-xs text-muted-foreground mt-1 tabular-nums">{new Date(m.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <SectionCard>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{typeLabels[selected.type]}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{new Date(selected.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-lg font-medium text-foreground">{selected.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.body}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Replies are not enabled for this message type. For questions, please contact Patient Services or visit the Support page.</p>
                </div>
              </SectionCard>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
