"use client";

import { createContext, useContext, ReactNode } from "react";
import useFirebaseAuth from "@/lib/firebase/useFirebaseAuth";
import { signIn, signUp, signOutUser } from "@/lib/firebase/auth";
import { User } from "firebase/auth";

interface AuthUser {
  uid: string;
  email: string | null;
  name: string;
}

interface AuthContextType {
  authUser: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  loading: true,
  signIn: async () => { throw new Error("signIn not implemented"); },
  signUp: async () => { throw new Error("signUp not implemented"); },
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