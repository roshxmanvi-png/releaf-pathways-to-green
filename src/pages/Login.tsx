import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({ title: "Please fill all fields" });
      return;
    }

    // check if user exists
    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const found = users.find((u: any) => u.username === username || u.email === username);
    if (!found) {
      toast({ title: "Error", description: "No such user. Please sign up." });
      return;
    }
    if (found.password !== password) {
      toast({ title: "Error", description: "Invalid password" });
      return;
    }
    if (!found.email?.toLowerCase().endsWith("@gmail.com")) {
      toast({ title: "Error", description: "Please use a Gmail account to sign in" });
      return;
    }

    if (login(username, password)) {
      toast({ title: "Success", description: "Logged in successfully!" });
      navigate("/");
    } else {
      toast({ title: "Error", description: "Login failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md glass rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold mb-4">Login</h2>
        <p className="text-sm text-muted-foreground mb-6">Welcome back to Releaf!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username or Email</label>
            <input
              className="w-full px-3 py-2 rounded-md bg-background border border-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username or you@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-md bg-background border border-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" className="bg-primary text-white">Login</Button>
            <Button asChild variant="outline">
              <a href="/signup">Create Account</a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
