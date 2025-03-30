"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthedContext";
import BottomNavBar from "@/components/bottom-navbar";
import { useUser } from "@/context/UserContext";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayouts = ({ children }: HomeLayoutProps) => {
  const { userId, userName } = useUser();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/sign-in");
    }
  }, [isAuthenticated, router]);
  if (!userName) {
    redirect("/onboarding");
  }
  return (
    <div className="relative min-h-screen pb-16">
      {children}
      <BottomNavBar />
    </div>
  );
};

export default HomeLayouts;
