import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
  const { isAuthenticated } = await auth()
    const data = await req.json();

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert decimal fields to numbers so Prisma accepts them
    const price = data.price ? Number(data.price) : 0;
    const cost = data.cost ? Number(data.cost) : 0;

    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        category: data.category,
        price: price,
        cost: cost,
        image: data.image ?? null,
        stock: Number(data.stock || 0),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function GET() {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
