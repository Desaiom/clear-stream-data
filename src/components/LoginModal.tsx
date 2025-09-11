import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (role: string) => void;
}

export const LoginModal = ({ open, onOpenChange, onLogin }: LoginModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      if (email.includes("admin")) {
        onLogin("admin");
        toast({
          title: "Login Successful",
          description: "Welcome, Administrator!",
        });
      } else {
        onLogin("viewer");
        toast({
          title: "Login Successful",
          description: "Welcome to AquaHealth Portal!",
        });
      }
      onOpenChange(false);
      setLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
            <span>Secure Login</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Access your role-based dashboard
          </DialogDescription>
        </DialogHeader>
        
        <Card className="mt-4">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@aquahealth.gov (try admin for admin role)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-deep-blue"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Login"}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>Admin: any email with "admin" + any password</p>
              <p>User: any other email + any password</p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};