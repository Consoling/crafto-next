"use client";

import { UsernameModal } from "@/components/modals/username-modal";
import { useEffect, useState } from "react";



export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UsernameModal />
    </>
  );
}