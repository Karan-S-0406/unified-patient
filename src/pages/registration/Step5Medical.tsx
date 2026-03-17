import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Props { onNext: () => void; onBack: () => void; }

export default function Step5Medical({ onNext }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Step 5: Medical Snapshot</h2>
        <p className="text-sm text-muted-foreground mt-1">This information helps your care team prepare for your visit. Share as much or as little as you're comfortable with.</p>
      </div>

      <SectionCard title="Care Providers">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Primary Care Physician</Label><Input className="mt-1.5 min-h-[44px]" defaultValue="Dr. Michael Rivera, MD" /></div>
          <div>
            <Label>Preferred Facility</Label>
            <Select defaultValue="regional">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="regional">EPOWERdoc Regional Medical Center</SelectItem>
                <SelectItem value="family">EPOWERdoc Family Medicine</SelectItem>
                <SelectItem value="ortho">EPOWERdoc Orthopedic Center</SelectItem>
                <SelectItem value="urgent">EPOWERdoc Urgent Care - North</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Label className="text-sm">Existing patient in this system?</Label>
          <Switch />
        </div>
      </SectionCard>

      <SectionCard title="Health Information">
        <div className="space-y-4">
          <div>
            <Label>Known Allergies</Label>
            <Textarea className="mt-1.5 min-h-[44px]" placeholder="e.g., Penicillin, Sulfa, Latex, None known" defaultValue="Penicillin (rash), Sulfa (hives)" rows={2} />
            <p className="text-xs text-muted-foreground mt-1">List all known drug, food, and environmental allergies</p>
          </div>
          <div>
            <Label>Current Medications</Label>
            <Textarea className="mt-1.5 min-h-[44px]" placeholder="e.g., Lisinopril 10mg daily, Metformin 500mg twice daily" defaultValue="Lisinopril 10mg daily, Metformin 500mg twice daily" rows={2} />
          </div>
          <div>
            <Label>Current Medical Conditions</Label>
            <Textarea className="mt-1.5 min-h-[44px]" placeholder="e.g., Hypertension, Type 2 Diabetes" defaultValue="Hypertension, Type 2 Diabetes" rows={2} />
          </div>
          <div>
            <Label>Past Surgeries</Label>
            <Textarea className="mt-1.5 min-h-[44px]" placeholder="e.g., Appendectomy (2015), Knee arthroscopy (2020)" defaultValue="Appendectomy (2010)" rows={2} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Lifestyle">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Tobacco Use</Label>
            <Select defaultValue="never">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="former">Former</SelectItem>
                <SelectItem value="current">Current</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Alcohol Use</Label>
            <Select defaultValue="occasional">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="occasional">Occasional</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Additional Notes">
        <Textarea className="min-h-[44px]" placeholder="Any additional information you'd like your care team to know (optional)" rows={3} />
      </SectionCard>

      <div className="flex justify-end pt-2">
        <Button size="lg" className="min-h-[48px] px-8" onClick={onNext}>Continue to Consents</Button>
      </div>
    </div>
  );
}
