"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  userId: string;
  userName: string;
  phoneNumber: string;
  membershipType: string;
  language: string;
  setLanguage: (language: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setMembershipType: (membershipType: string) => void;
  setUserId: (userId: string) => void;
  setUserName: (userName: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [membershipType, setMembershipType] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("_userId");
      const storedUserName = localStorage.getItem("user_name");
      if (storedUserId) {
        setUserId(storedUserId);
      }
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        userName,
        phoneNumber,
        membershipType,
        language,
        setUserId,
        setUserName,
        setPhoneNumber,
        setMembershipType,
        setLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
