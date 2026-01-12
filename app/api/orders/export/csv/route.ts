import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Parser } from "json2csv";

export async function GET() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // 🧠 Flatten data
  const data = orders.map(order => ({
    id: order.id,
    customer: order.user.name,
    email: order.user.email,
    status: order.status,
    total: order.totalAmount.toString(),
    date: order.createdAt.toISOString(),
  }));

  const parser = new Parser({
    fields: ["id", "customer", "email", "status", "total", "date"],
  });

  const csv = parser.parse(data);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="orders.csv"`,
    },
  });
}
