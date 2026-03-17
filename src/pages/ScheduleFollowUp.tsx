import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { providers, facilities, timeSlots } from "@/lib/sample-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Sun, Sunset, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Type", "Provider", "Facility", "Date & Time", "Confirm"];

export default function ScheduleFollowUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  if (confirmed) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Appointment Confirmed</h1>
          <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
            Your {selectedType} appointment has been scheduled. You'll receive a confirmation and reminder.
          </p>
          <div className="bg-card rounded-[12px] shadow-card p-5 mb-6 w-full max-w-sm text-sm space-y-2">
            <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground">{selectedType}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><span className="font-medium text-foreground">{selectedProvider}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Facility</span><span className="font-medium text-foreground">{selectedFacility}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date & Time</span><span className="font-medium text-foreground tabular-nums">{selectedDate} at {selectedTime}</span></div>
          </div>
          <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Schedule Follow-Up</h1>
          <p className="text-sm text-muted-foreground mt-1">Choose your appointment details below.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={cn("font-medium", i === step ? "text-primary" : i < step ? "text-success" : "text-muted-foreground")}>{s}</span>
              {i < steps.length - 1 && <span>›</span>}
            </div>
          ))}
        </div>

        {step === 0 && (
          <SectionCard title="Choose Follow-Up Type">
            <div className="grid sm:grid-cols-2 gap-3">
              {["Cardiology Follow-Up", "Primary Care Follow-Up", "Orthopedic Follow-Up", "General Follow-Up"].map(t => (
                <button key={t} onClick={() => { setSelectedType(t); setStep(1); }}
                  className={cn("p-4 rounded-[8px] border text-left transition-colors min-h-[44px]",
                    selectedType === t ? "border-primary bg-accent" : "border-border hover:border-primary/40"
                  )}>
                  <p className="text-sm font-medium text-foreground">{t}</p>
                </button>
              ))}
            </div>
          </SectionCard>
        )}

        {step === 1 && (
          <SectionCard title="Select Provider">
            <Select value={selectedProvider} onValueChange={v => { setSelectedProvider(v); setStep(2); }}>
              <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Choose a provider" /></SelectTrigger>
              <SelectContent>
                {providers.map(p => <SelectItem key={p.name} value={p.name}>{p.name} — {p.specialty}</SelectItem>)}
              </SelectContent>
            </Select>
          </SectionCard>
        )}

        {step === 2 && (
          <SectionCard title="Select Facility">
            <Select value={selectedFacility} onValueChange={v => { setSelectedFacility(v); setStep(3); }}>
              <SelectTrigger className="min-h-[44px]"><SelectValue placeholder="Choose a facility" /></SelectTrigger>
              <SelectContent>
                {facilities.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </SectionCard>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <SectionCard title="Select Date">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map(d => {
                  const dateStr = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
                  const active = selectedDate === dateStr;
                  return (
                    <button key={dateStr} onClick={() => setSelectedDate(dateStr)}
                      className={cn("flex flex-col items-center px-4 py-3 rounded-[8px] border min-w-[80px] transition-colors min-h-[44px]",
                        active ? "border-primary bg-accent" : "border-border hover:border-primary/40"
                      )}>
                      <span className="text-xs text-muted-foreground">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                      <span className="text-lg font-semibold text-foreground tabular-nums">{d.getDate()}</span>
                      <span className="text-xs text-muted-foreground">{d.toLocaleDateString("en-US", { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {selectedDate && (
              <SectionCard title="Select Time">
                {[
                  { label: "Morning", icon: Sun, slots: timeSlots.morning },
                  { label: "Afternoon", icon: Sunset, slots: timeSlots.afternoon },
                  { label: "Evening", icon: Moon, slots: timeSlots.evening },
                ].map(group => (
                  <div key={group.label} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <group.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{group.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.slots.map((slot, i) => {
                        const available = Math.random() > 0.3;
                        return (
                          <button key={slot} disabled={!available}
                            onClick={() => { setSelectedTime(slot); setStep(4); }}
                            className={cn("px-3 py-2 rounded-[8px] border text-sm transition-colors min-h-[44px] tabular-nums",
                              selectedTime === slot ? "border-primary bg-accent font-medium text-primary" :
                              available ? "border-border hover:border-primary/40 text-foreground" :
                              "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            )}>
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </SectionCard>
            )}
          </div>
        )}

        {step === 4 && (
          <SectionCard title="Review & Confirm">
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between py-2 border-b border-border"><span className="text-muted-foreground">Appointment Type</span><span className="font-medium text-foreground">{selectedType}</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span className="text-muted-foreground">Provider</span><span className="font-medium text-foreground">{selectedProvider}</span></div>
              <div className="flex justify-between py-2 border-b border-border"><span className="text-muted-foreground">Facility</span><span className="font-medium text-foreground">{selectedFacility}</span></div>
              <div className="flex justify-between py-2"><span className="text-muted-foreground">Date & Time</span><span className="font-medium text-foreground tabular-nums">{selectedDate} at {selectedTime}</span></div>
            </div>
            <Button size="lg" className="min-h-[48px] w-full sm:w-auto px-8" onClick={() => setConfirmed(true)}>
              Confirm Appointment
            </Button>
          </SectionCard>
        )}

        {step > 0 && !confirmed && (
          <Button variant="ghost" size="sm" onClick={() => setStep(s => s - 1)} className="text-muted-foreground">
            ← Back
          </Button>
        )}
      </div>
    </AppShell>
  );
}
