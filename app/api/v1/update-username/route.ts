import prisma from "@/lib/prisma";


import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization token is missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId =
      typeof decoded === "object" && "userId" in decoded
        ? decoded.userId
        : null;
    const body = await req.json();
    const { newUserName } = body;

    if (!userId || !newUserName) {
      return NextResponse.json(
        { message: "User ID and new username are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (newUserName) {
      await prisma.user.update({
        data: {
          username: newUserName,
        },
        where: {
          id: userId,
        },
      });
    }

    return NextResponse.json(
      { message: "Username updated successfully", user: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating username:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
