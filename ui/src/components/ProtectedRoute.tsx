"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/sign-in");
    }
  }, [authUser, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authUser ? <>{children}</> : null;
}