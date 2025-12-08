import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  username: string;
  email: string;
  points?: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  awardPoints: (points: number, reason?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const stored = localStorage.getItem("logged_in_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (identifier: string, password: string): boolean => {
    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    // find user by username or email
    const found = users.find(
      (u: any) => (u.username === identifier || u.email === identifier) && u.password === password,
    );
    if (found) {
      // require Gmail-based accounts (per project rules)
      if (!found.email?.toLowerCase().endsWith("@gmail.com")) {
        return false;
      }
      const userData = { username: found.username, email: found.email, points: found.points ?? 0 };
      setUser(userData);
      localStorage.setItem("logged_in_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("logged_in_user");
  };

  const awardPoints = (points: number, reason?: string) => {
    if (!user) return;
    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const idx = users.findIndex((u: any) => u.username === user.username || u.email === user.email);
    if (idx >= 0) {
      users[idx].points = (users[idx].points || 0) + points;
      localStorage.setItem("users", JSON.stringify(users));
      const updatedUser = { ...user, points: users[idx].points };
      setUser(updatedUser);
      localStorage.setItem("logged_in_user", JSON.stringify(updatedUser));
      // Optionally notice or toast (UI component will handle)
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, awardPoints }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
