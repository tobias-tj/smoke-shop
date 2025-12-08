import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
    try{
        const { isAuthenticated } = await auth()
        const { productId } = await params;
        const {isPublish} = await req.json();

          if (!isAuthenticated) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

          if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
          }

          const product = await db.product.update({
            where: { id: productId },
            data: { isActive: isPublish },
          });

          return NextResponse.json(product);
    }catch(error){
        console.log("[PRODUCT ID PATCH]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request,{params}: {params: {productId: string}}){
    try{
        const { isAuthenticated } = await auth()
        const { productId } = await params;

        if (!isAuthenticated) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

          if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
          }

          const product = await db.product.delete({
            where: { id: productId },
          });

          return NextResponse.json(product);
    }catch(error){
        console.log("[PRODUCT ID DELETE]", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}