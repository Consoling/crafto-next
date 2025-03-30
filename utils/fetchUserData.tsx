import { useAuth } from "@/context/AuthedContext";
import { useUser } from "@/context/UserContext";
import { set } from "zod";

export const updateUserData = async (updatedData: any, userId: string) => {
  const { authToken } = useAuth();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GET_USER_DATA_ROUTE}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const fetchUserData = async (userID: string) => {
  const { authToken } = useAuth();
  const {
    setUserId,
    setUserName,
    setPhoneNumber,
    setMembershipType,
    setLanguage,
  } = useUser();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GET_USER_DATA_ROUTE}/${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setUserName(data.username);
    setPhoneNumber(data.phoneNumber);
    setMembershipType(data.isPremium);
    setLanguage(data.language);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
