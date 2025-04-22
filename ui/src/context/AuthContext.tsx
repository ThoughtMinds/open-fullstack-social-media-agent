"use client"

import { createContext, useContext, ReactNode } from "react";
import useFirebaseAuth from "@/lib/firebase/useFirebaseAuth";
import { signIn, signUp, signOutUser } from "@/lib/firebase/auth";

interface AuthUser {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  authUser: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { authUser, loading } = useFirebaseAuth();

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        signIn,
        signUp,
        signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);