import prisma from "@/lib/prisma";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRATION = "4h";
const REFRESH_TOKEN_EXPIRATION = "28d";

export async function POST(req: NextRequest) {
  let response = NextResponse.next();
  const body = await req.json();

  const { phoneNumber, password } = body;

  if (!phoneNumber || !password) {
    return NextResponse.json(
      { message: "Phone number and password are required" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    const encryptedPassword= await bcrypt.hash(password, 10);

    if (existingUser) {
      return NextResponse.json(
        { message: "Phone number already exists. Please Sign in" },
        { status: 400 }
      );
    } else {
      const newUser = await prisma.user.create({
        data: {
          phoneNumber: phoneNumber,
          password: encryptedPassword,
        },
      });

      const accessToken = jwt.sign(
        {
          userId: newUser.id,
          phoneNumber: newUser.phoneNumber,
          isVerified: newUser.isVerified,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      // Create JWT Refresh Token (long-lived)
      const refreshToken = jwt.sign(
        { userId: newUser.id, phoneNumber: newUser.phoneNumber },
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
      );

      newUser.accessToken = accessToken;
      newUser.refreshToken = refreshToken;
      await prisma.user.update({
        where: { id: newUser.id },
        data: { accessToken, refreshToken },
      });

      (await cookies()).set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "strict",
        path: "/",
      });

      const redirectTo = newUser.username ? "/home" : "/user-handle-creation";

      return NextResponse.json({
        message: "User signed up successfully",
        accessToken,
        userId: newUser.id,
        userName: newUser.username,
        redirectTo,
      });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
