import { Navbar } from "@/components/Shared/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { OrderStatus, StockMovementType } from "@prisma/client";

export default async function OrderConfirmationPage({ searchParams }: { searchParams: { order_id: string } }) {
    const { order_id } = await searchParams;

   
    const order = await db.order.findUnique({
        where: { id: order_id },
        include: { items: true },
    });

    if (!order) throw new Error("Order not found");

    await db.$transaction(async (tx) => {
        // 1️⃣ Actualizar estado de la orden
        await tx.order.update({
            where: { id: order_id },
            data: { status: OrderStatus.PAID },
        });

        // 2️⃣ Registrar en orderHistory
        await tx.orderHistory.create({
            data: {
                orderId: order_id,
                changedById: null,
                oldStatus: OrderStatus.PENDING,
                newStatus: OrderStatus.PAID,
                note: "Payment confirmed by Stripe",
            },
        });

        // 3️⃣ Registrar logs de stock (ya que la orden fue exitosa)
        for (const item of order.items) {
            await tx.stockLog.create({
                data: {
                    productId: item.productId,
                    quantity: item.quantity,
                    type: StockMovementType.ORDER,
                    reason: `Order ${order.id} completed`,
                    createdAt: new Date(),
                },
            });
        }
    });
    

    return (
         <div>
            <Navbar />
            <div className="p-6 mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-2xl font-bold">Thank you for your payment!</h1>
                <p>
                    You will receive all the order information shortly via email.
                </p>
                <p>
                    If you have any questions or need assistance, don't hesitate to contact us. We're here to help!
                </p>
                <Link href="/dashboard">
                    <Button>Back to Products</Button>
                </Link>
                </div>
        </div>
        </div>
    );
}
