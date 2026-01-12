import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { OrderStatus, StockMovementType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { isAuthenticated, userId: clerkUserId } = await auth();

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, price, productName, userId, street } = await req.json();

    if (!productId) return new NextResponse("Product ID required", { status: 400 });
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    if (!street || street.trim() === "") return NextResponse.json({ error: "Missing street" }, { status: 400 });

    const userExists = await db.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      // Redirigir a after-signup si no existe
      return NextResponse.json({ url: "/after-signup" });
    }
    

    // 1️⃣ Crear Address
    const address = await db.address.create({
      data: {
        userId,
        street,
        neighborhood: "Pending Neighborhood",
        reference: "Pending Reference",
        city: "Asunción",
      },
    });

    // 2️⃣ Crear Order PENDING
    const order = await db.order.create({
      data: {
        userId,
        addressId: address.id,
        totalAmount: Number(price),
        status: OrderStatus.PENDING,
        items: {
          create: [
            {
              productId,
              quantity: 1,
              unitPrice: Number(price),
            },
          ],
        },
      },
      include: {
        items: true,
      },
    });

    // 3️⃣ Reducir stock y crear StockLog
    await db.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: 1 } },
      });

      await tx.stockLog.create({
        data: {
          productId,
          quantity: 1,
          type: StockMovementType.ORDER,
          reason: `Purchase in order ${order.id}`,
          createdById: clerkUserId || null,
        },
      });
    });

    // 4️⃣ Crear Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: Number(price) * 100,
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_FRONTED_STORE_URL}/order-confirmation?order_id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTED_STORE_URL}/order-error?order_id=${order.id}`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}
