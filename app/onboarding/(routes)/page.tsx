"use client";

import { useUserNameModal } from "@/hooks/useUserNameModal";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useUserNameModal((state) => state.onOpen);
  const isOpen = useUserNameModal((state) => state.isOpen);

    useEffect(() => {
      if (!isOpen) {
        onOpen();
      }
    }, [isOpen, onOpen]);

    return null;

 
};

export default SetupPage;
