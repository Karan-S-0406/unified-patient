import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressStepper } from "@/components/shared/ProgressStepper";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Step1Identity from "./registration/Step1Identity";
import Step2Contact from "./registration/Step2Contact";
import Step3Emergency from "./registration/Step3Emergency";
import Step4Insurance from "./registration/Step4Insurance";
import Step5Medical from "./registration/Step5Medical";
import Step6Consents from "./registration/Step6Consents";
import RegistrationComplete from "./registration/RegistrationComplete";

const steps = [
  { label: "Identity", shortLabel: "ID" },
  { label: "Contact", shortLabel: "Contact" },
  { label: "Emergency", shortLabel: "Emerg." },
  { label: "Insurance", shortLabel: "Ins." },
  { label: "Medical", shortLabel: "Med." },
  { label: "Consents", shortLabel: "Consent" },
];

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep >= steps.length) {
    return <RegistrationComplete />;
  }

  const next = () => setCurrentStep(s => s + 1);
  const prev = () => setCurrentStep(s => Math.max(0, s - 1));

  const stepComponents = [
    <Step1Identity key={0} onNext={next} />,
    <Step2Contact key={1} onNext={next} onBack={prev} />,
    <Step3Emergency key={2} onNext={next} onBack={prev} />,
    <Step4Insurance key={3} onNext={next} onBack={prev} />,
    <Step5Medical key={4} onNext={next} onBack={prev} />,
    <Step6Consents key={5} onNext={next} onBack={prev} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-base font-semibold text-foreground tracking-tight hidden sm:inline">EPOWERdoc</span>
          </button>
          <span className="text-sm text-muted-foreground">New Patient Registration</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <ProgressStepper steps={steps} currentStep={currentStep} className="mb-8" />

        <div className="mb-4">
          {currentStep > 0 && (
            <Button variant="ghost" size="sm" onClick={prev} className="text-muted-foreground -ml-2">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          )}
        </div>

        <div className="animate-fade-in">
          {stepComponents[currentStep]}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 pb-6">
          Your data is encrypted and HIPAA-compliant. Only your care team can see this information.
        </p>
      </div>
    </div>
  );
}
