import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { visits } from "@/lib/sample-data";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Building2, Clock, Stethoscope } from "lucide-react";

export default function Visits() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Visits</h1>
          <p className="text-sm text-muted-foreground mt-1">View your visit history, discharge instructions, and care summaries.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search visits..." className="pl-9 min-h-[44px]" />
          </div>
          <Select><SelectTrigger className="w-[140px] min-h-[44px]"><SelectValue placeholder="Visit Type" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="emergency">Emergency</SelectItem><SelectItem value="office">Office Visit</SelectItem><SelectItem value="followup">Follow-Up</SelectItem></SelectContent></Select>
          <Select><SelectTrigger className="w-[140px] min-h-[44px]"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="scheduled">Scheduled</SelectItem></SelectContent></Select>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <SectionCard>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Date</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Provider</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Facility</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Type</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Status</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {visits.map(v => (
                  <tr key={v.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm text-foreground tabular-nums">{new Date(v.date).toLocaleDateString()}</td>
                    <td className="py-3 text-sm text-foreground">{v.provider}</td>
                    <td className="py-3 text-sm text-muted-foreground">{v.facility.replace("EPOWERdoc ", "")}</td>
                    <td className="py-3 text-sm text-muted-foreground">{v.type}</td>
                    <td className="py-3"><StatusBadge label={v.status} variant="success" /></td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/visits/${v.id}`)}>View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {visits.map(v => (
            <SectionCard key={v.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-accent flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{v.type}</p>
                    <p className="text-xs text-muted-foreground">{v.provider}</p>
                  </div>
                </div>
                <StatusBadge label={v.status} variant="success" />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(v.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{v.facility.replace("EPOWERdoc ", "")}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{v.reason}</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/visits/${v.id}`)}>View Details</Button>
            </SectionCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
