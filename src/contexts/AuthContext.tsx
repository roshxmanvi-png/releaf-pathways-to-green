import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
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
      const userData = { username: found.username, email: found.email };
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
