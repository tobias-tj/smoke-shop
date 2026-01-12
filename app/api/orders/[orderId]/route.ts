import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await params;
  if (!orderId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  const { status } = await req.json();

  const previousOrder = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!previousOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const order = await db.order.update({
    where: { id: orderId },
    data: { status: status as OrderStatus },
  });

  await db.orderHistory.create({
    data: {
      orderId: order.id,
      changedById: userId,
      oldStatus: previousOrder.status,
      newStatus: status,
    },
  });

  return NextResponse.json(order);
}
