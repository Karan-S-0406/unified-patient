import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  shortLabel?: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProgressStepper({ steps, currentStep, className }: ProgressStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const isComplete = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isComplete && "bg-success text-success-foreground",
                  isCurrent && "bg-primary text-primary-foreground",
                  !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                )}>
                  {isComplete ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn(
                  "text-xs mt-1.5 text-center hidden sm:block",
                  isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
                <span className={cn(
                  "text-xs mt-1.5 text-center sm:hidden",
                  isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                )}>
                  {step.shortLabel || step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-2 sm:mx-3",
                  i < currentStep ? "bg-success" : "bg-border"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
