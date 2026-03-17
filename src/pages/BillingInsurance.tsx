import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { insurance, billing } from "@/lib/sample-data";
import { CreditCard, ShieldCheck, DollarSign, FileText } from "lucide-react";

export default function BillingInsurance() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Billing & Insurance</h1>
          <p className="text-sm text-muted-foreground mt-1">View your insurance coverage, benefits, and billing statements.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Insurance */}
          <SectionCard title="Insurance on File" action={<Button variant="outline" size="sm">Update Insurance</Button>}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-accent flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{insurance.primary.carrier}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">Member ID: ••••{insurance.primary.memberId.slice(-4)}</p>
                </div>
              </div>
              <StatusBadge label="Active" variant="success" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Verified for current visit • Effective {new Date(insurance.primary.effectiveDate).toLocaleDateString()}</span>
            </div>
          </SectionCard>

          {/* Benefits */}
          <SectionCard title="Eligibility & Benefits Summary">
            <p className="text-xs text-muted-foreground mb-4">Your insurance has been verified and your coverage is active.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Office Visit Co-pay</p>
                <p className="text-xl font-bold text-foreground tabular-nums">${insurance.primary.copay}.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Coverage Status</p>
                <StatusBadge label="Active" variant="success" className="mt-1" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deductible Remaining</p>
                <p className="text-lg font-bold text-foreground tabular-nums">${(insurance.primary.deductibleTotal - insurance.primary.deductibleMet).toLocaleString()}</p>
                <Progress value={(insurance.primary.deductibleMet / insurance.primary.deductibleTotal) * 100} className="mt-1 h-1.5" />
                <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">${insurance.primary.deductibleMet.toLocaleString()} of ${insurance.primary.deductibleTotal.toLocaleString()} met</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Out-of-Pocket Remaining</p>
                <p className="text-lg font-bold text-foreground tabular-nums">${(insurance.primary.oopTotal - insurance.primary.oopMet).toLocaleString()}</p>
                <Progress value={(insurance.primary.oopMet / insurance.primary.oopTotal) * 100} className="mt-1 h-1.5" />
                <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">${insurance.primary.oopMet.toLocaleString()} of ${insurance.primary.oopTotal.toLocaleString()} met</p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Balances */}
        <SectionCard title="Balances & Statements">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">${billing.outstandingBalance.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Pay Now</Button>
              <Button size="sm" variant="outline">Payment Plan Options</Button>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Date</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Description</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 text-right">Total</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 text-right">Ins. Paid</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 text-right">Your Resp.</th>
                  <th className="text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {billing.statements.map(s => (
                  <tr key={s.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm text-foreground tabular-nums">{new Date(s.date).toLocaleDateString()}</td>
                    <td className="py-3 text-sm text-foreground">{s.description.split(" - ")[0]}</td>
                    <td className="py-3 text-sm text-muted-foreground text-right tabular-nums">${s.total.toFixed(2)}</td>
                    <td className="py-3 text-sm text-muted-foreground text-right tabular-nums">${s.insurancePaid.toFixed(2)}</td>
                    <td className="py-3 text-sm font-medium text-foreground text-right tabular-nums">${s.patientResponsibility.toFixed(2)}</td>
                    <td className="py-3 text-right"><StatusBadge label={s.status} variant={s.status === "Paid" ? "success" : "warning"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {billing.statements.map(s => (
              <div key={s.id} className="p-3 border border-border rounded-[8px]">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{s.description.split(" - ")[0]}</span>
                  <StatusBadge label={s.status} variant={s.status === "Paid" ? "success" : "warning"} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Date: <span className="tabular-nums">{new Date(s.date).toLocaleDateString()}</span></div>
                  <div>Total: <span className="tabular-nums">${s.total.toFixed(2)}</span></div>
                  <div>Ins. Paid: <span className="tabular-nums">${s.insurancePaid.toFixed(2)}</span></div>
                  <div className="font-medium text-foreground">You Owe: <span className="tabular-nums">${s.patientResponsibility.toFixed(2)}</span></div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            If you have questions about a statement, please contact our billing department at (512) 555-0300 or visit the Support page.
          </p>
        </SectionCard>
      </div>
    </AppShell>
  );
}
