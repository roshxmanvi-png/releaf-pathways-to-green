import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast({ title: "Please fill all fields" });
      return;
    }

    // generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // store temporary signup info
    const temp = { username, email, password, code };
    localStorage.setItem("signup_temp", JSON.stringify(temp));

    // simulate sending email
    toast({ title: "Verification sent", description: `Sent code to ${email}` });

    // navigate to verification page
    navigate("/verify");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md glass rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold mb-4">Sign Up</h2>
        <p className="text-sm text-muted-foreground mb-6">Create an account to start your Releaf journey.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              className="w-full px-3 py-2 rounded-md bg-background border border-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-md bg-background border border-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
              placeholder="Choose a strong password"
              required
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" className="bg-primary text-white">Send Verification</Button>
            <Button asChild variant="outline">
              <a href="/">Cancel</a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
