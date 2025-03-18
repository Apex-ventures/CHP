
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";

export type UserRole = 'patient' | 'receptionist' | 'clinician' | 'pharmacy' | 'admin';

export interface User {
  id: string;
  name: string;
  email?: string;
  role?: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Patient',
    email: 'patient@example.com',
    role: 'patient',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Sarah Receptionist',
    email: 'receptionist@example.com',
    role: 'receptionist',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Dr. Michael',
    email: 'clinician@example.com',
    role: 'clinician',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Med Pharmacy',
    email: 'pharmacy@example.com',
    role: 'pharmacy',
    profileImage: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    name: 'Admin Superuser',
    email: 'admin@example.com',
    role: 'admin',
    profileImage: 'https://i.pravatar.cc/150?img=5'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('medicalAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });
      console.log(JSON.stringify(response))
      if (response.error) {
          console.error("Error logging in:", response.error);
          return;
      }

    const foundUser = response.data.user;
    console.log("User logged in:", foundUser);

    if (!foundUser) {
      throw new Error("Invalid credentials");
    }

    // Extract role from user metadata (assuming it's stored there)
    const userRole = foundUser.role as UserRole | undefined;

    // Store user in state and localStorage with validated role
    //**Need to change this. Just a hack**
    const authenticatedUser: User = {
      ...foundUser,
      role: userRole && ["patient", "receptionist", "clinician", "pharmacy", "admin"].includes(userRole)
        ? userRole
        : "admin", // Ensure role is valid
      name: foundUser.user_metadata?.name || "Guest",
      id: foundUser.id
      // profileImage: foundUser.user_metadata?.profileImage || "https://i.pravatar.cc/150",
    };

    setUser(authenticatedUser);
    localStorage.setItem("medicalAppUser", JSON.stringify(authenticatedUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicalAppUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
