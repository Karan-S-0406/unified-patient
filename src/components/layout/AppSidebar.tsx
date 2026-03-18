import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Pill, DollarSign,
  MessageSquare, User, LifeBuoy, LogOut, X, Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Visits", icon: Calendar, path: "/visits" },
  { label: "Medications", icon: Pill, path: "/medications" },
  { label: "Billing & Insurance", icon: DollarSign, path: "/billing" },
  { label: "Messages", icon: MessageSquare, path: "/messages", badge: 2 },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Support", icon: LifeBuoy, path: "/support" },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 flex flex-col transition-transform duration-300",
        "lg:static lg:translate-x-0 lg:z-auto",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Mobile close */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Menu</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Desktop branding */}
        <div className="hidden lg:flex items-center gap-2 p-5 pb-4">
          <Stethoscope className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">Patient Portal</span>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path ||
              (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm transition-colors mb-0.5",
                  "min-h-[44px]",
                  active
                    ? "bg-accent text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-destructive text-destructive-foreground text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={() => handleNav("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors min-h-[44px]"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
