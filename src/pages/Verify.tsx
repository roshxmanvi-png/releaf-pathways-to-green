import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Verify = () => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState("");
  const [emailMask, setEmailMask] = useState("");
  const [temp, setTemp] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("signup_temp");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    setTemp(parsed);
    if (parsed.email) {
      const parts = parsed.email.split("@");
      const masked = parts[0].slice(0, 2) + "***@" + (parts[1] || "");
      setEmailMask(masked);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!temp) {
      toast({ title: "No signup in progress" });
      navigate("/signup");
      return;
    }
    if (codeInput.trim() === temp.code) {
      // complete signup
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      users.push({ username: temp.username, email: temp.email, password: temp.password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("signup_temp");
      navigate("/signup-success");
    } else {
      toast({ title: "Incorrect code", description: "Please check the verification code and try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md glass rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold mb-2">Verify Your Email</h2>
        <p className="text-sm text-muted-foreground mb-6">Enter the verification code sent to <strong>{emailMask || "your email"}</strong></p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Verification Code</label>
            <input
              className="w-full px-3 py-2 rounded-md bg-background border border-input"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="123456"
              required
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" className="bg-primary text-white">Verify</Button>
            <Button asChild variant="outline">
              <a href="/signup">Back</a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
