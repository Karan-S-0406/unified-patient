import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { patient, insurance, visits, medications, billing, messages } from "@/lib/sample-data";
import {
  Calendar, Pill, DollarSign, MessageSquare,
  CreditCard, ArrowRight, Clock, Stethoscope, Building2
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const unreadCount = messages.filter(m => !m.read).length;
  const latestVisit = visits[0];

  const quickActions = [
    { label: "View Visits", icon: Calendar, path: "/visits" },
    { label: "View Medications", icon: Pill, path: "/medications" },
    { label: "Update Insurance", icon: CreditCard, path: "/billing" },
    { label: "Message Care Team", icon: MessageSquare, path: "/messages" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome back, {patient.preferredName || patient.firstName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{patient.facility} • MRN: {patient.mrn}</p>
        </div>

        {/* Alert banner */}
        <div className="bg-warning/10 border border-warning/20 rounded-[12px] p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Follow-up appointment due</p>
            <p className="text-xs text-muted-foreground mt-0.5">You have a cardiology follow-up due by March 19, 2026 from your recent Emergency Visit.</p>
          </div>
          <Button size="sm" onClick={() => navigate("/schedule")}>Schedule Now</Button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {quickActions.map(a => (
            <button
              key={a.path}
              onClick={() => navigate(a.path)}
              className="bg-card rounded-[12px] shadow-card p-4 flex flex-col items-center gap-2 hover:shadow-elevated transition-shadow min-h-[44px]"
            >
              <a.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-foreground text-center">{a.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent visit */}
          <SectionCard title="Most Recent Visit" action={
            <Button variant="ghost" size="sm" onClick={() => navigate("/visits")} className="text-xs">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          }>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-accent flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{latestVisit.type}</p>
                    <p className="text-xs text-muted-foreground">{latestVisit.provider}</p>
                  </div>
                </div>
                <StatusBadge label={latestVisit.status} variant="success" />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(latestVisit.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{latestVisit.facility.replace("EPOWERdoc ", "")}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{latestVisit.summary}</p>
              <Button variant="outline" size="sm" onClick={() => navigate(`/visits/${latestVisit.id}`)}>View Details</Button>
            </div>
          </SectionCard>

          {/* Medications */}
          <SectionCard title="Active Medications" action={
            <Button variant="ghost" size="sm" onClick={() => navigate("/medications")} className="text-xs">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          }>
            <div className="space-y-2">
              {medications.filter(m => m.status === "Active").slice(0, 4).map((m, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.name} {m.dosage}</p>
                    <p className="text-xs text-muted-foreground">{m.frequency}</p>
                  </div>
                  <StatusBadge label="Active" variant="success" />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Insurance */}
          <SectionCard title="Insurance & Benefits">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Primary Insurance</p>
                <p className="text-sm font-semibold text-foreground">{insurance.primary.carrier}</p>
              </div>
              <StatusBadge label="Active" variant="success" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Co-pay</p>
                <p className="text-lg font-bold text-foreground tabular-nums">${insurance.primary.copay}.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deductible</p>
                <p className="text-lg font-bold text-foreground tabular-nums">${insurance.primary.deductibleMet.toLocaleString()}</p>
                <Progress value={(insurance.primary.deductibleMet / insurance.primary.deductibleTotal) * 100} className="mt-1 h-1.5" />
                <p className="text-xs text-muted-foreground mt-0.5">of ${insurance.primary.deductibleTotal.toLocaleString()}</p>
              </div>
            </div>
          </SectionCard>

          {/* Billing */}
          <SectionCard title="Billing Summary" action={
            <Button variant="ghost" size="sm" onClick={() => navigate("/billing")} className="text-xs">
              View Details <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          }>
            <div className="mb-4">
              <p className="text-xs text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">${billing.outstandingBalance.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              {billing.statements.slice(0, 2).map(s => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm text-foreground">{s.description.split(" - ")[0]}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">{new Date(s.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground tabular-nums">${s.patientResponsibility.toFixed(2)}</p>
                    <StatusBadge label={s.status} variant={s.status === "Paid" ? "success" : "warning"} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Messages */}
          <SectionCard title="Recent Messages" action={
            <Button variant="ghost" size="sm" onClick={() => navigate("/messages")} className="text-xs">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          }>
            {unreadCount > 0 && (
              <p className="text-xs text-primary font-medium mb-3">{unreadCount} unread message{unreadCount > 1 ? "s" : ""}</p>
            )}
            <div className="space-y-2">
              {messages.slice(0, 3).map(m => (
                <div key={m.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.read ? "bg-transparent" : "bg-primary"}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{m.body}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">{new Date(m.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Tasks */}
          <SectionCard title="Next Steps">
            <div className="space-y-3">
              {[
                { label: "Schedule cardiology follow-up", due: "Due by March 19", urgent: true },
                { label: "Review updated HIPAA notice", due: "New document available", urgent: false },
                { label: "Pay outstanding balance", due: "$847.50 due", urgent: false },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${t.urgent ? "bg-warning" : "bg-border"}`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.due}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
