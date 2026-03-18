import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { visits } from "@/lib/sample-data";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileText, Pill, Calendar, Building2, User, Stethoscope } from "lucide-react";

export default function VisitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const visit = visits.find(v => v.id === id) || visits[0];

  return (
    <AppShell>
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/visits")} className="text-muted-foreground -ml-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Visits
        </Button>

        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{visit.type}</h1>
            <p className="text-sm text-muted-foreground mt-1">{visit.reason}</p>
          </div>
          <StatusBadge label={visit.status} variant="success" />
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "Date", value: new Date(visit.date).toLocaleDateString() },
            { icon: User, label: "Provider", value: visit.provider },
            { icon: Building2, label: "Facility", value: visit.facility.replace("EPOWERdoc ", "") },
            { icon: Stethoscope, label: "Department", value: visit.department },
          ].map((item, i) => (
            <SectionCard key={i}>
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>

        <SectionCard title="Visit Summary">
          <p className="text-sm text-muted-foreground leading-relaxed">{visit.summary}</p>
        </SectionCard>

        {visit.diagnoses.length > 0 && (
          <SectionCard title="Diagnoses">
            <div className="space-y-2">
              {visit.diagnoses.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{d}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        <SectionCard title="Discharge Instructions">
          <p className="text-sm text-muted-foreground leading-relaxed">{visit.dischargeInstructions}</p>
        </SectionCard>

        {visit.prescriptions.length > 0 && (
          <SectionCard title="Prescriptions from This Visit">
            <div className="space-y-2">
              {visit.prescriptions.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-sm text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Download Summary</Button>
          <Button variant="outline"><FileText className="w-4 h-4 mr-2" /> Request Records</Button>
        </div>
      </div>
    </AppShell>
  );
}
