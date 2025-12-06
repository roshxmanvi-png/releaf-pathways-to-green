import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

  const cannedResponses = (msg: string, username?: string) => {
  const text = msg.toLowerCase();
  if (text.includes("level") || text.includes("levels")) {
    return `Hi ${username || "Player"}! Releaf has 3 levels: \n1) Climate Action — take action against climate change. \n2) Life on Land — protect and restore terrestrial ecosystems. \n3) Life Underwater — conserve marine resources.`;
  }
  if (text.includes("about") || text.includes("game")) {
  return `Releaf is a sustainability-focused game that teaches players how everyday choices can help the environment — through fun challenges, rewards, and in-game impact tracking.`;
  }
  if (text.includes("play") || text.includes("start")) {
    return `To start your journey, click 'Start Your Journey' on the home screen. You can also Play Now to open the game experience directly.`;
  }
  return "Sorry, I can only answer questions about the Releaf game and its levels.";
};

export default function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    {
      from: "bot",
      text: "Hi! I'm Releaf Chat — your friendly in-game assistant. I can help with levels, challenges, and rewards. I don't answer questions outside the game."
    },
  ]);
  const [value, setValue] = useState("");

  const send = () => {
    if (!value.trim()) return;
    const userText = value.trim();
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setValue("");
    // compute response
    const response = cannedResponses(userText, user?.username);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: response }]);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-6 right-6 z-50">
        <DialogTrigger asChild>
          <Button className="rounded-full w-14 h-14 p-3 bg-primary text-white">Chat</Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Releaf Chat</DialogTitle>
          <DialogDescription>
            Chat with Releaf Chat about the game — levels, goals, rewards, and gameplay help. I’ll only answer questions that relate to Releaf.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded ${m.from === "user" ? "bg-primary/10 text-primary ml-auto max-w-[80%]" : "bg-muted-foreground/10"}`}>
              {m.text.split("\n").map((line, li) => (
                <div key={li}>{line}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input className="flex-1 px-3 py-2 rounded-md bg-background border border-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ask about levels, gameplay, or rewards" />
          <Button onClick={send}>Send</Button>
        </div>
        <DialogClose className="mt-4">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
