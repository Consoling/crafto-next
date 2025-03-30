'use client'

import { TopBar } from "@/components/navbars/settings-nav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthedContext";
import React from "react";

const SettingsPage = () => {
  const { setAuthToken } = useAuth();
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      <TopBar />
      <div className="w-full flex h-full justify-center items-center flex-col">
      <Button variant="destructive" onClick={() => setAuthToken("")} className="mt-32">
        Logout
      </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
