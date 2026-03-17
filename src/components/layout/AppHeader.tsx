import { Bell, HelpCircle, Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppHeaderProps {
  onMenuToggle?: () => void;
  showMenu?: boolean;
  patientName?: string;
}

export function AppHeader({ onMenuToggle, showMenu = true, patientName = "Margaret Thompson" }: AppHeaderProps) {
  const initials = patientName.split(" ").map(n => n[0]).join("");

  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1">
        {showMenu && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <div className="hidden sm:block">
            <span className="text-base font-semibold text-foreground tracking-tight">EPOWERdoc</span>
            <span className="text-xs text-muted-foreground ml-1.5">Patient Access</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden md:block">{patientName}</span>
        </div>
      </div>
    </header>
  );
}
