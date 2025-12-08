import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const TASKS = [
  { id: "plant-tree", title: "Plant a Tree", desc: "Plant a tree and upload a photo of it", points: 50 },
  { id: "recycle", title: "Recycle", desc: "Take a photo of recycled items", points: 20 },
  { id: "public-transport", title: "Public Transport", desc: "Use public transport for a day and upload your ticket/photo", points: 30 },
];

const Tasks = () => {
  const { isAuthenticated, user, awardPoints } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const raw = localStorage.getItem(`user-submissions-${user.username}`);
    if (raw) setSubmissions(JSON.parse(raw));
  }, [user]);

  const submitTask = async (task: any, file?: File) => {
    if (!user) return;
    if (!file) {
      toast({ title: "Please upload an image" });
      return;
    }
    // Convert file to base64 to store (small-scale demo). For larger scale, use backend
    // Try to upload to a server; fallback to client-side base64 storage
    const uploadServerUrl = import.meta.env.VITE_UPLOAD_SERVER || (window as any).__UPLOAD_SERVER_URL || 'http://localhost:4000';

    // If backend exists, upload via form-data
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${uploadServerUrl}/upload`, { method: 'POST', body: form });
      if (res.ok) {
        const json = await res.json();
        const newSub = { id: task.id, title: task.title, points: task.points, image: json.url, createdAt: Date.now() };
        const raw = localStorage.getItem(`user-submissions-${user.username}`);
        const arr = raw ? JSON.parse(raw) : [];
        arr.push(newSub);
        localStorage.setItem(`user-submissions-${user.username}`, JSON.stringify(arr));
        setSubmissions(arr);
        if (awardPoints) awardPoints(task.points, `Submission for ${task.title}`);
        toast({ title: `Uploaded and submitted. ${task.points} points awarded!` });
        return;
      }
    } catch (err) {
      // If server not available, fallback to base64 localStorage approach
      console.debug('Upload server not reachable; using localStorage fallback.', err);
    }

    // Fallback: read to base64 and store
    const reader = new FileReader();
    reader.onload = (e) => {
      const base = e.target?.result as string;
      const newSub = { id: task.id, title: task.title, points: task.points, image: base, createdAt: Date.now() };
      const raw = localStorage.getItem(`user-submissions-${user.username}`);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(newSub);
      localStorage.setItem(`user-submissions-${user.username}`, JSON.stringify(arr));
      setSubmissions(arr);
      // Award points
      if (awardPoints) awardPoints(task.points, `Submission for ${task.title}`);
      toast({ title: `Submitted. ${task.points} points awarded!` });
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-md glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Sustainability Tasks</h2>
          <p className="text-sm text-muted-foreground mb-4">You must be logged in to view and submit sustainability tasks.</p>
          <div className="flex items-center gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary text-white">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-display font-bold mb-6">Sustainability Tasks</h2>
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">Complete simple, real-world sustainability tasks and earn points by uploading proof photos.</p>
          <div className="text-sm">Your Points: <strong>{user?.points || 0}</strong></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TASKS.map((task) => (
            <div key={task.id} className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-muted-foreground mb-4">{task.desc}</p>
              <p className="mb-4 text-sm">Points: <strong>{task.points}</strong></p>
              <FileUploader onSubmit={(file) => submitTask(task, file)} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Your Submissions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {submissions.map((s, i) => (
              <div className="p-3 glass rounded-lg" key={i}>
                <p className="text-sm text-muted-foreground">{s.title}</p>
                <img src={s.image} alt={s.title} className="w-full h-48 object-cover rounded-md my-2" />
                <div className="flex items-center justify-between text-sm">
                  <div>{new Date(s.createdAt).toLocaleString()}</div>
                  <div className="font-semibold">+{s.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FileUploader: React.FC<{ onSubmit: (file?: File) => void }> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="flex items-center gap-2">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
      <Button onClick={() => onSubmit(file || undefined)}>Upload</Button>
    </div>
  );
};

export default Tasks;
