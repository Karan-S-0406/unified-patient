import { SectionCard } from "@/components/shared/SectionCard";
import { UploadZone } from "@/components/shared/UploadZone";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { ShieldCheck, CreditCard, Heart } from "lucide-react";

interface Props { onNext: () => void; onBack: () => void; }

export default function Step4Insurance({ onNext }: Props) {
  const [selfPay, setSelfPay] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Step 4: Insurance Information</h2>
        <p className="text-sm text-muted-foreground mt-1">Please provide your insurance details so we can verify coverage for your visit.</p>
      </div>

      <label className="flex items-center gap-3 cursor-pointer bg-card rounded-[12px] shadow-card p-4">
        <Checkbox checked={selfPay} onCheckedChange={(v) => setSelfPay(!!v)} />
        <div>
          <span className="text-sm font-medium text-foreground">I am a self-pay patient (no insurance)</span>
          <p className="text-xs text-muted-foreground mt-0.5">Financial assistance may be available</p>
        </div>
      </label>

      {selfPay ? (
        <SectionCard title="Self-Pay Information" description="We offer financial assistance programs and payment plans.">
          <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-[8px]">
            <Heart className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Financial Assistance Available</p>
              <p className="text-xs text-muted-foreground">Our financial counselors can help determine if you qualify for assistance programs, charity care, or payment plans. You'll be contacted after registration.</p>
            </div>
          </div>
        </SectionCard>
      ) : (
        <>
          <SectionCard title="Primary Insurance">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Insurance Carrier *</Label>
                <Select defaultValue="bcbs">
                  <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bcbs">Blue Cross Blue Shield of Texas</SelectItem>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="united">UnitedHealthcare</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="humana">Humana</SelectItem>
                    <SelectItem value="medicare">Medicare</SelectItem>
                    <SelectItem value="medicaid">Medicaid</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Member ID *</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue="XYN928471650" /></div>
              <div><Label>Group Number *</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue="GRP-84201" /></div>
              <div><Label>Policy Holder Name *</Label><Input className="mt-1.5 min-h-[44px]" defaultValue="Margaret A. Thompson" /></div>
              <div>
                <Label>Relationship to Policy Holder *</Label>
                <Select defaultValue="self">
                  <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Effective Date *</Label><Input type="date" className="mt-1.5 min-h-[44px] tabular-nums" defaultValue="2024-01-01" /></div>
              <div><Label>Termination Date</Label><Input type="date" className="mt-1.5 min-h-[44px] tabular-nums" placeholder="Optional" /></div>
              <div><Label>Payer Phone</Label><Input type="tel" className="mt-1.5 min-h-[44px] tabular-nums" placeholder="Optional" /></div>
            </div>

            <p className="text-sm font-medium text-foreground mb-3">Insurance Card Images</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <UploadZone label="Front of Insurance Card" />
              <UploadZone label="Back of Insurance Card" />
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setVerified(true)} disabled={verified}>
                <ShieldCheck className="w-4 h-4 mr-2" />
                {verified ? "Verified" : "Verify Eligibility"}
              </Button>
            </div>

            {verified && (
              <div className="mt-4 bg-card rounded-[8px] border border-success/20 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Primary Insurance</p>
                    <p className="text-base font-semibold text-foreground">Blue Cross Blue Shield of Texas</p>
                  </div>
                  <StatusBadge label="Active" variant="success" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">Your insurance has been verified for today's visit.</p>
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Office Visit Co-pay</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">$25.00</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Deductible Met</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">$1,200</p>
                    <Progress value={40} className="mt-1 h-1.5" />
                    <p className="text-xs text-muted-foreground mt-0.5">of $3,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Out-of-Pocket Met</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">$2,400</p>
                    <Progress value={37} className="mt-1 h-1.5" />
                    <p className="text-xs text-muted-foreground mt-0.5">of $6,500</p>
                  </div>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Secondary Insurance (Optional)">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Insurance Carrier</Label>
                <Select>
                  <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue placeholder="Select carrier" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bcbs">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="united">UnitedHealthcare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Member ID</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" placeholder="Member ID" /></div>
            </div>
          </SectionCard>
        </>
      )}

      <div className="flex justify-end pt-2">
        <Button size="lg" className="min-h-[48px] px-8" onClick={onNext}>Continue to Medical Snapshot</Button>
      </div>
    </div>
  );
}
