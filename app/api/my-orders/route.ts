import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export async function GET(req: Request) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

//   const userExists = await db.user.findUnique({ where: { id: userId } });

//   if (!userExists) {
//     // Redirigir a after-signup si no existe
//     return NextResponse.json({ url: "/after-signup" });
//   }


//   const { searchParams } = new URL(req.url);
//   const status = await searchParams.get("status");

//   const where =
//     status && status !== "ALL"
//       ? { status: status as OrderStatus }
//       : {};

//TODO: Falta agregar filtros y ademas agregar la funcionalidad de buscar por nombre del producto.
// Adicional a todo eso falta ajustar para redirigir a aftersignup si es que no esta autenticado.

  const orders = await db.order.findMany({
    where: {
      userId: userId,
    },
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