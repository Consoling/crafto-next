"use client";

import { useAuth } from "@/context/AuthedContext";
import { useUser } from "@/context/UserContext";
import { fetchUserData } from "@/utils/fetchUserData";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, userName } = useUser();
  const { isAuthenticated } = useAuth();
 

 if(!isAuthenticated) {
  toast.error("You need to be logged in to access this page.");
    redirect("/sign-in");}

  if (userName) {
    fetchUserData(userId)
    redirect(`/home`);
  } else return <>{children}</>;
}
