import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface Props { onNext: () => void; onBack: () => void; }

export default function Step3Emergency({ onNext }: Props) {
  const [sameAsPatient, setSameAsPatient] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Step 3: Emergency Contact & Guarantor</h2>
        <p className="text-sm text-muted-foreground mt-1">Please provide an emergency contact and the person responsible for your account.</p>
      </div>

      <SectionCard title="Emergency Contact" description="This person will be contacted in case of an urgent medical situation.">
        <div className="bg-accent/50 rounded-[8px] p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">Your emergency contact is used for urgent communication only and will not have access to your medical records.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Full Name *</Label><Input className="mt-1.5 min-h-[44px]" defaultValue="Robert Thompson" /></div>
          <div>
            <Label>Relationship *</Label>
            <Select defaultValue="spouse">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Phone *</Label><Input type="tel" className="mt-1.5 min-h-[44px] tabular-nums" defaultValue="(512) 555-0193" /></div>
          <div><Label>Email</Label><Input type="email" className="mt-1.5 min-h-[44px]" defaultValue="r.thompson@email.com" /></div>
        </div>
      </SectionCard>

      <SectionCard title="Guarantor / Responsible Party" description="The guarantor is the person financially responsible for your account. This may be you or another individual.">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <Checkbox checked={sameAsPatient} onCheckedChange={(v) => setSameAsPatient(!!v)} />
          <span className="text-sm font-medium text-foreground">I am the financially responsible party</span>
        </label>

        {!sameAsPatient && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Full Name *</Label><Input className="mt-1.5 min-h-[44px]" /></div>
            <div>
              <Label>Relationship to Patient *</Label>
              <Select>
                <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="guardian">Legal Guardian</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Date of Birth</Label><Input type="date" className="mt-1.5 min-h-[44px] tabular-nums" /></div>
            <div><Label>Phone *</Label><Input type="tel" className="mt-1.5 min-h-[44px] tabular-nums" /></div>
            <div className="sm:col-span-2"><Label>Address</Label><Input className="mt-1.5 min-h-[44px]" placeholder="Street address, City, State, ZIP" /></div>
            <div><Label>SSN (Optional)</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" placeholder="Optional" /></div>
            <div><Label>Employer (Optional)</Label><Input className="mt-1.5 min-h-[44px]" placeholder="Optional" /></div>
          </div>
        )}
      </SectionCard>

      <div className="flex justify-end pt-2">
        <Button size="lg" className="min-h-[48px] px-8" onClick={onNext}>Continue to Insurance</Button>
      </div>
    </div>
  );
}
