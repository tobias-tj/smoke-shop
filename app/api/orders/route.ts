import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export async function GET(req: Request) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = await searchParams.get("status");

  const where =
    status && status !== "ALL"
      ? { status: status as OrderStatus }
      : {};

  const orders = await db.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
          order: {
            select: {
              address: {
                select: {
                  street: true,
                  city: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(orders);
}