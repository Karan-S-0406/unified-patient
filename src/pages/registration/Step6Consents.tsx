import { SectionCard } from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { consentDocuments } from "@/lib/sample-data";
import { useState } from "react";
import { FileText, Download, Smartphone, Shield, CheckCircle2 } from "lucide-react";

interface Props { onNext: () => void; onBack: () => void; }

export default function Step6Consents({ onNext }: Props) {
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const requiredDocs = consentDocuments.filter(d => d.required);
  const completedCount = requiredDocs.filter(d => agreed[d.id]).length;
  const allRequiredComplete = requiredDocs.every(d => agreed[d.id]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Step 6: Review & Sign Consent Documents</h2>
        <p className="text-sm text-muted-foreground mt-1">Please review the required documents before continuing. This is a legal requirement for your care.</p>
      </div>

      <div className="flex items-center gap-3 bg-card rounded-[12px] shadow-card p-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Consent Progress</p>
          <p className="text-xs text-muted-foreground mt-0.5">{completedCount} of {requiredDocs.length} required documents signed</p>
        </div>
        <Progress value={(completedCount / requiredDocs.length) * 100} className="w-32 h-2" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {consentDocuments.map(doc => (
            <SectionCard key={doc.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{doc.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.summary}</p>
                    <p className="text-xs text-muted-foreground mt-1">Last updated: {doc.lastUpdated}</p>
                  </div>
                </div>
                {!doc.required && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Optional</span>
                )}
              </div>

              <ScrollArea className="h-[200px] border border-border rounded-[8px] p-4 mb-3 text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap" onScrollCapture={() => setOpened(o => ({ ...o, [doc.id]: true }))}>
                {doc.content}
              </ScrollArea>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={agreed[doc.id] || false}
                    disabled={!opened[doc.id] && doc.required}
                    onCheckedChange={(v) => setAgreed(a => ({ ...a, [doc.id]: !!v }))}
                  />
                  <span className="text-sm text-foreground">
                    {doc.required ? "I have read and agree *" : "I have read and agree (optional)"}
                  </span>
                </label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Download className="w-3 h-3 mr-1" /> Download
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Smartphone className="w-3 h-3 mr-1" /> Send to Phone
                  </Button>
                </div>
              </div>

              {agreed[doc.id] && (
                <div className="flex items-center gap-2 mt-2 text-xs text-success">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Acknowledged on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
                </div>
              )}

              {!opened[doc.id] && doc.required && (
                <p className="text-xs text-warning mt-2">Please scroll through the document before agreeing.</p>
              )}
            </SectionCard>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <SectionCard title="Privacy & Compliance">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">All documents are stored securely and comply with federal and state privacy regulations.</p>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">Consent records are retained for a minimum of 7 years per healthcare retention requirements.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">You can request a copy of any signed document at any time through your patient portal.</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button size="lg" className="min-h-[48px] px-8" onClick={onNext} disabled={!allRequiredComplete}>
          Complete Registration
        </Button>
      </div>
      {!allRequiredComplete && (
        <p className="text-xs text-destructive text-right">All required consent documents must be reviewed and agreed to before continuing.</p>
      )}
    </div>
  );
}
