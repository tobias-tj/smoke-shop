import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // Obtener información real del usuario desde Clerk
    const clerkUser = await (await clerkClient()).users.getUser(userId);

    const firstName = clerkUser.firstName || "";
    const lastName = clerkUser.lastName || "";
    const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";

    // Buscar usuario en DB
    let user = await db.user.findUnique({
      where: { id: userId },
    });

    // Si no existe → crearlo
    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          name: `${firstName} ${lastName}`.trim(),
          email: email,
          role: "CLIENT",
        },
      });
    } else {
      user = await db.user.update({
        where: { id: userId },
        data: { name: `${firstName} ${lastName}`.trim(), email: email },
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
