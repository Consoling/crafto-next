"use client";

import { useAuth } from "@/context/AuthedContext";
import { useUser } from "@/context/UserContext";
import { fetchUserData } from "@/utils/fetchUserData";
import { redirect } from "next/navigation";

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, userName } = useUser();
  const { isAuthenticated } = useAuth();
  console.log("userId", userId);
  console.log("userName", userName);

 if(!isAuthenticated) {
    redirect("/sign-in");}

  if (userName) {
    fetchUserData(userId)
    redirect(`/home`);
  } else return <>{children}</>;
}
