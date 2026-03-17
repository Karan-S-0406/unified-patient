import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function SectionCard({ title, description, children, className, action }: SectionCardProps) {
  return (
    <div className={cn("bg-card rounded-[12px] shadow-card p-6", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-base font-medium text-foreground">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
