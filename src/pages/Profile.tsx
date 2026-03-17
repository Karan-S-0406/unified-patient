import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { patient, emergencyContact, guarantor, insurance } from "@/lib/sample-data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User, MapPin, Phone, Heart, CreditCard, Shield, Settings, AlertTriangle } from "lucide-react";

const tabs = [
  { label: "Personal", icon: User },
  { label: "Contact", icon: MapPin },
  { label: "Communication", icon: Phone },
  { label: "Emergency", icon: Heart },
  { label: "Insurance", icon: CreditCard },
  { label: "Security", icon: Shield },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Personal");
  const [editing, setEditing] = useState(false);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your personal information, preferences, and account settings.</p>
          </div>
          <Button variant={editing ? "default" : "outline"} onClick={() => setEditing(!editing)}>
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        {/* Review notice */}
        <div className="bg-accent rounded-[12px] p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">Some profile updates (insurance, demographics) may require staff confirmation before they appear in your medical record.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button key={t.label} onClick={() => setActiveTab(t.label)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[44px]",
                activeTab === t.label ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              )}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "Personal" && (
          <SectionCard title="Personal Information">
            <div className="grid sm:grid-cols-3 gap-4">
              <div><Label>First Name</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.firstName} disabled={!editing} /></div>
              <div><Label>Middle Name</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.middleName} disabled={!editing} /></div>
              <div><Label>Last Name</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.lastName} disabled={!editing} /></div>
              <div><Label>Date of Birth</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue="04/12/1958" disabled /></div>
              <div><Label>Gender</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.gender} disabled={!editing} /></div>
              <div><Label>Preferred Name</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.preferredName} disabled={!editing} /></div>
              <div><Label>Language</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.language} disabled={!editing} /></div>
              <div><Label>Marital Status</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.maritalStatus} disabled={!editing} /></div>
            </div>
          </SectionCard>
        )}

        {activeTab === "Contact" && (
          <SectionCard title="Contact Details">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>Street Address</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.address.street} disabled={!editing} /></div>
              <div><Label>Apartment</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.address.apt} disabled={!editing} /></div>
              <div><Label>City</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.address.city} disabled={!editing} /></div>
              <div><Label>State</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.address.state} disabled={!editing} /></div>
              <div><Label>ZIP</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue={patient.address.zip} disabled={!editing} /></div>
              <div><Label>Phone</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue={patient.phone} disabled={!editing} /></div>
              <div><Label>Email</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={patient.email} disabled={!editing} /></div>
            </div>
          </SectionCard>
        )}

        {activeTab === "Communication" && (
          <SectionCard title="Communication Preferences">
            <div className="space-y-4">
              {[
                { label: "Appointment Reminders via SMS", desc: "Receive text reminders before appointments", on: true },
                { label: "Portal Email Notifications", desc: "Get emailed when new results or messages arrive", on: true },
                { label: "Billing Notifications", desc: "Receive alerts about new statements", on: true },
                { label: "Marketing Communications", desc: "Health tips and wellness program information", on: false },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <Switch defaultChecked={p.on} disabled={!editing} />
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {activeTab === "Emergency" && (
          <div className="space-y-6">
            <SectionCard title="Emergency Contact">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={emergencyContact.name} disabled={!editing} /></div>
                <div><Label>Relationship</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={emergencyContact.relationship} disabled={!editing} /></div>
                <div><Label>Phone</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue={emergencyContact.phone} disabled={!editing} /></div>
                <div><Label>Email</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={emergencyContact.email} disabled={!editing} /></div>
              </div>
            </SectionCard>
            <SectionCard title="Guarantor">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={guarantor.name} disabled={!editing} /></div>
                <div><Label>Relationship</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={guarantor.relationship} disabled={!editing} /></div>
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === "Insurance" && (
          <SectionCard title="Insurance on File" description="Your insurance update will be reviewed before final processing.">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Carrier</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={insurance.primary.carrier} disabled={!editing} /></div>
              <div><Label>Member ID</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue={insurance.primary.memberId} disabled={!editing} /></div>
              <div><Label>Group Number</Label><Input className="mt-1.5 min-h-[44px] tabular-nums" defaultValue={insurance.primary.groupNumber} disabled={!editing} /></div>
              <div><Label>Policy Holder</Label><Input className="mt-1.5 min-h-[44px]" defaultValue={insurance.primary.policyHolder} disabled={!editing} /></div>
            </div>
          </SectionCard>
        )}

        {activeTab === "Security" && (
          <SectionCard title="Account Security">
            <div className="space-y-4 max-w-md">
              <div>
                <Label>Current Password</Label>
                <Input type="password" className="mt-1.5 min-h-[44px]" placeholder="Enter current password" disabled={!editing} />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" className="mt-1.5 min-h-[44px]" placeholder="Enter new password" disabled={!editing} />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" className="mt-1.5 min-h-[44px]" placeholder="Confirm new password" disabled={!editing} />
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>Coming Soon</Button>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-2">Recent Sign-In Activity</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="tabular-nums">March 17, 2026 • 9:14 AM • Chrome on Windows</p>
                  <p className="tabular-nums">March 15, 2026 • 2:30 PM • Safari on iPhone</p>
                  <p className="tabular-nums">March 12, 2026 • 11:05 AM • Chrome on Windows</p>
                </div>
              </div>
            </div>
          </SectionCard>
        )}
      </div>
    </AppShell>
  );
}
