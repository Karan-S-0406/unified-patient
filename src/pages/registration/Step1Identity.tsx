import { SectionCard } from "@/components/shared/SectionCard";
import { UploadZone } from "@/components/shared/UploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScanLine, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface Props { onNext: () => void; }

export default function Step1Identity({ onNext }: Props) {
  const [ocrDone, setOcrDone] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Step 1: Identity Information</h2>
        <p className="text-sm text-muted-foreground mt-1">Please have your photo ID ready. This will take about 8 minutes.</p>
      </div>

      {/* OCR Panel */}
      <SectionCard title="Identity Verification" description="Upload your driver's license or passport for faster registration">
        <div className="grid md:grid-cols-2 gap-4">
          <UploadZone label="Upload Driver's License or Passport" />
          <div className="bg-accent/50 rounded-[8px] p-4">
            {!ocrDone ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-6">
                <ScanLine className="w-8 h-8 text-primary animate-pulse" />
                <p className="text-sm text-muted-foreground text-center">Upload a document to auto-detect information</p>
                <Button variant="outline" size="sm" onClick={() => setOcrDone(true)}>Simulate OCR Scan</Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-success">98% Confidence Match</span>
                </div>
                <p className="text-xs text-muted-foreground">Detected demographic fields. Please review before continuing.</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium text-foreground">Margaret A. Thompson</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">DOB</span><span className="font-medium text-foreground tabular-nums">04/12/1958</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="font-medium text-foreground">4821 Ridgewood Ln, Austin TX</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Personal Information">
        <div className="grid sm:grid-cols-3 gap-4">
          <div><Label>First Name *</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={ocrDone ? "Margaret" : ""} /></div>
          <div><Label>Middle Name</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={ocrDone ? "Anne" : ""} /></div>
          <div><Label>Last Name *</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={ocrDone ? "Thompson" : ""} /></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div><Label>Preferred Name</Label><Input className="mt-1.5 min-h-[44px]" placeholder="e.g., Maggie" /></div>
          <div><Label>Date of Birth *</Label><Input type="date" className="mt-1.5 min-h-[44px] tabular-nums" defaultValue={ocrDone ? "1958-04-12" : ""} /></div>
          <div>
            <Label>Sex / Gender *</Label>
            <Select defaultValue={ocrDone ? "female" : undefined}>
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div><Label>SSN (Last 4) — Optional</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" placeholder="••••" maxLength={4} /></div>
          <div><Label>Email *</Label><Input type="email" className="mt-1.5 min-h-[44px]" placeholder="name@example.com" /></div>
          <div><Label>Mobile Number *</Label><Input type="tel" className="mt-1.5 min-h-[44px] tabular-nums" placeholder="(555) 555-0000" /></div>
        </div>
      </SectionCard>

      <SectionCard title="Additional Demographics">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <Label>Preferred Language</Label>
            <Select defaultValue="english">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="vietnamese">Vietnamese</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Race / Ethnicity</Label>
            <Select>
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="black">Black or African American</SelectItem>
                <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
                <SelectItem value="native">American Indian or Alaska Native</SelectItem>
                <SelectItem value="pacific">Native Hawaiian or Pacific Islander</SelectItem>
                <SelectItem value="multi">Two or More Races</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="decline">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Marital Status</Label>
            <Select>
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
                <SelectItem value="separated">Separated</SelectItem>
                <SelectItem value="partner">Domestic Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div><Label>Religion (Optional)</Label><Input className="mt-1.5 min-h-[44px]" placeholder="Optional" /></div>
          <div>
            <Label>Preferred Communication</Label>
            <Select defaultValue="email">
              <SelectTrigger className="mt-1.5 min-h-[44px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="sms">Text / SMS</SelectItem>
                <SelectItem value="portal">Portal Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Create Your Account">
        <div className="grid sm:grid-cols-2 gap-4 max-w-md">
          <div className="sm:col-span-2"><Label>Password *</Label><Input type="password" className="mt-1.5 min-h-[44px]" placeholder="At least 8 characters" /></div>
          <div className="sm:col-span-2"><Label>Confirm Password *</Label><Input type="password" className="mt-1.5 min-h-[44px]" placeholder="Re-enter your password" /></div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Password must be at least 8 characters with one uppercase letter, one number, and one special character.</p>
      </SectionCard>

      <div className="flex justify-end pt-2">
        <Button size="lg" className="min-h-[48px] px-8" onClick={onNext}>Continue to Contact Details</Button>
      </div>
    </div>
  );
}
