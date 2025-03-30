import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRATION = "4h";
const REFRESH_TOKEN_EXPIRATION = "28d";

export async function POST(request: NextRequest) {
  let response = NextResponse.next();
  const body = await request.json()



  const {phoneNumber, password} = body;

  if (!phoneNumber || !password) {
    return NextResponse.json(
      { message: "Phone number and password are required" },
      { status: 400 }
    );
  }

  try {
   // Connect to DB
   const existingUser = await prisma.user.findUnique({
    where: { phoneNumber: phoneNumber },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  if (!existingUser.password) {
    return NextResponse.json(
      { message: "Password not set" },
      { status: 405 }
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 401 }
    );
  }

  // Generate tokens
  const accessToken = jwt.sign(
    {
      userId: existingUser.id,
      phoneNumber: existingUser.phoneNumber,
      isVerified: existingUser.isVerified,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { userId: existingUser.id, phoneNumber: existingUser.phoneNumber },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );

  existingUser.accessToken = accessToken;
  existingUser.refreshToken = refreshToken;
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });

  (await cookies()).set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    sameSite: "strict",
    path: "/",
  });

  // Determine redirect path
  const redirectTo = existingUser.username
    ? "/home"
    : "/user-handle-creation";

  return NextResponse.json({
    message: "Login successful",
    accessToken,
    userId: existingUser.id,
    userName: existingUser.username,
    redirectTo,
  });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
