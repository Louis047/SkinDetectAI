import { useState } from "react";
import { useToast } from '@/hooks/use-toast';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Login = () => {
  const { toast } = useToast();
  const { user, login, register, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  if (user) {
    // already signed-in
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err: any) {
      toast({ title: 'Auth Error', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm p-6 space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-center">
          {isRegister ? "Create account" : "Sign in"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>

        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={async () => { try { await loginWithGoogle(); navigate('/'); } catch (e:any) { toast({ title:'Google sign-in failed', description: e.message, variant:'destructive'});} }}>
          <FcGoogle className="h-5 w-5" /> Continue with Google
        </Button>
        <Button
          variant="link"
          className="w-full text-center"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Sign in" : "Create an account"}
        </Button>
      </Card>
    </div>
  );
};

export default Login;
