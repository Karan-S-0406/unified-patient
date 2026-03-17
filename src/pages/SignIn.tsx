import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" />
            <span className="text-lg font-semibold text-foreground tracking-tight">EPOWERdoc</span>
            <span className="text-sm text-muted-foreground ml-1">Patient Access</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to access your patient portal</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email or Mobile Number</Label>
              <Input id="email" placeholder="name@example.com" className="mt-1.5 min-h-[44px]" defaultValue="m.thompson@email.com" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative mt-1.5">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="min-h-[44px] pr-10" defaultValue="password123" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox id="remember" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
            </div>

            <Button type="submit" className="w-full min-h-[44px]" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or</span></div>
            </div>

            <Button type="button" variant="outline" className="w-full min-h-[44px]" disabled>
              Sign in with one-time code
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New patient? <button onClick={() => navigate("/register")} className="text-primary hover:underline font-medium">Create an account</button>
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>256-bit encryption • HIPAA-compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
