import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, CreditCard, FileText, MessageSquare } from "lucide-react";

export default function RegistrationComplete() {
  const navigate = useNavigate();

  const items = [
    { icon: Shield, label: "Personal profile & demographics" },
    { icon: CreditCard, label: "Insurance & eligibility verification" },
    { icon: MessageSquare, label: "Communication preferences" },
    { icon: FileText, label: "Consent document acknowledgments" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-2">Registration Complete</h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
          Thank you for completing your registration. Your information has been securely saved and your patient portal is now active.
        </p>

        <div className="bg-card rounded-[12px] shadow-card p-5 mb-8 text-left">
          <h3 className="text-sm font-medium text-foreground mb-3">What was saved:</h3>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="min-h-[48px] px-8" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
          <Button size="lg" variant="outline" className="min-h-[48px] px-8" onClick={() => navigate("/schedule")}>
            Schedule Follow-Up
          </Button>
        </div>
      </div>
    </div>
  );
}
