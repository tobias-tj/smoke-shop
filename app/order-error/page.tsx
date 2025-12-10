import { Button } from "@/components/ui/button";
import Link from "next/link";
import Lottie from "lottie-react";
import errorAnimation from "@/public/errorpayment.json";
import { Navbar } from "@/components/Shared/Navbar/Navbar";
import { db } from "@/lib/db";
import { OrderStatus, StockMovementType } from "@prisma/client";
import Image from "next/image";

export default async function OrderErrorPage({ searchParams }: { searchParams: { order_id: string } }) {
    const { order_id } = await searchParams;

    // Buscar la orden y sus items
    const order = await db.order.findUnique({
        where: { id: order_id },
        include: { items: true },
    });

    if (!order) throw new Error("Order not found");

    await db.$transaction(async (tx) => {
        // 1️⃣ Cancelar la orden
        await tx.order.update({
            where: { id: order_id },
            data: { status: OrderStatus.CANCELED },
        });

        // 2️⃣ Revertir stock y crear logs por cada item
        for (const item of order.items) {
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { increment: item.quantity } },
            });

            await tx.stockLog.create({
                data: {
                    productId: item.productId,
                    quantity: item.quantity,
                    type: StockMovementType.CANCEL,
                    reason: `Order ${order.id} canceled`,
                    createdAt: new Date(),
                },
            });
        }

        // 3️⃣ Registrar en orderHistory
        await tx.orderHistory.create({
            data: {
                orderId: order_id,
                changedById: null,
                oldStatus: OrderStatus.PENDING,
                newStatus: OrderStatus.CANCELED,
                note: "Order canceled",
            },
        });
    });

    return (
         <div>
            <Navbar />
            <div className="p-6 mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="w-36 h-36 relative">
                    <Image src="/logo.svg" alt="Logo" width={100} height={100} className="object-contain" />
                </div>
                <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
                <p className="text-gray-600">
                    Your payment could not be processed. Please try again later.
                </p>
                <Link href="/dashboard">
                    <Button>Back to Products</Button>
                </Link>
                </div>
        </div>
        </div>
    );
}
