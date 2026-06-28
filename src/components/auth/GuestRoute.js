// components/auth/GuestRoute.js

import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

export default function GuestRoute({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) return null;

  if (user) return null;

  return children;
}