import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { MapPin, CheckCircle2 } from "lucide-react";

interface Props { onNext: () => void; onBack: () => void; }

export default function Step2Contact({ onNext }: Props) {
  const [showSuggested, setShowSuggested] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Step 2: Contact Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Your contact information helps us reach you about appointments and care updates.</p>
      </div>

      <SectionCard title="Mailing Address">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><Label>Street Address *</Label><Input className="mt-1.5 min-h-[44px]" defaultValue="4821 Ridgewood Lane" onBlur={() => setShowSuggested(true)} /></div>
          <div><Label>Apartment / Unit</Label><Input className="mt-1.5 min-h-[44px]" defaultValue="Apt 3B" /></div>
          <div><Label>City *</Label><Input className="mt-1.5 min-h-[44px]" defaultValue="Austin" /></div>
          <div>
            <Label>State *</Label>
            <Select defaultValue="TX">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>ZIP Code *</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue="78731" /></div>
        </div>

        {showSuggested && (
          <div className="mt-4 p-4 bg-accent/50 rounded-[8px] border border-primary/10">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">We found a suggested standardized address</p>
                <p className="text-sm text-muted-foreground mb-3">4821 Ridgewood Ln Apt 3B, Austin, TX 78731-4102</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" onClick={() => setShowSuggested(false)}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Use Suggested Address
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowSuggested(false)}>Keep My Entry</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Contact Preferences">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Phone *</Label><Input type="tel" className="mt-1.5 min-h-[44px] tabular-nums" defaultValue="(512) 555-0147" /></div>
          <div><Label>Email *</Label><Input type="email" className="mt-1.5 min-h-[44px]" defaultValue="m.thompson@email.com" /></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <Label>Preferred Communication Method</Label>
            <Select defaultValue="email">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="sms">Text Message (SMS)</SelectItem>
                <SelectItem value="portal">Portal Notification Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-3 mt-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox defaultChecked className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">SMS Appointment Reminders</p>
              <p className="text-xs text-muted-foreground">Receive text message reminders about upcoming appointments</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox defaultChecked className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Portal Notifications</p>
              <p className="text-xs text-muted-foreground">Receive email notifications when new results or messages are available</p>
            </div>
          </label>
        </div>
      </SectionCard>

      <div className="flex justify-end pt-2">
        <Button size="lg" className="min-h-[48px] px-8" onClick={onNext}>Continue to Emergency Contact</Button>
      </div>
    </div>
  );
}
