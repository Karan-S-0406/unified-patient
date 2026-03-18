import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ClipboardCheck, Calendar, FileText, Lock, Heart } from "lucide-react";

const features = [
  { icon: ClipboardCheck, title: "Secure Registration", description: "Complete your patient registration digitally before your visit. Your information is encrypted and HIPAA-compliant." },
  { icon: Calendar, title: "Easy Visit Management", description: "View your past visits, access discharge instructions, and review your care history anytime." },
  { icon: FileText, title: "Access Your Records Anytime", description: "Review medications, billing statements, insurance details, and communicate with your care team." },
];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" />
            <div>
              <span className="text-lg font-semibold text-foreground tracking-tight">EPOWERdoc</span>
              <span className="text-sm text-muted-foreground ml-1.5">Patient Access</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/signin")}>Sign In</Button>
            <Button onClick={() => navigate("/register")}>Create Account</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1.5 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            EPOWERdoc Health System
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight mb-4">
            Secure Patient Access for Registration, Visits, and Walk-In Care
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Register online, review your visits and medications, manage insurance, access discharge information, and schedule follow-up appointments — all in one secure portal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="min-h-[48px] px-8 text-base" onClick={() => navigate("/register")}>
              Create Account
            </Button>
            <Button size="lg" variant="outline" className="min-h-[48px] px-8 text-base" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-card rounded-[12px] shadow-card p-6">
              <div className="w-11 h-11 rounded-[8px] bg-accent flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="border-t border-border bg-card py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="text-lg font-medium text-foreground mb-2">Your Privacy is Our Priority</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            All data is encrypted in transit and at rest. EPOWERdoc Patient Access is fully HIPAA-compliant. Only your care team can see your medical information.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 EPOWERdoc Health System. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Use</span>
            <span className="hover:text-foreground cursor-pointer">Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
