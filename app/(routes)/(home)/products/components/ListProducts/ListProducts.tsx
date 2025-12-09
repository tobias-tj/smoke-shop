"use client";
import React from "react";
import Image from "next/image";
import { ListProductsProps } from "./ListProducts.types";
import SkeletonProducts from "@/components/Shared/SkeletonProducts/SkeletonProducts";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useLovedProducts } from "@/hooks/useLovedProducts";
import { Product } from "@prisma/client";


export default function ListProducts({ products }: ListProductsProps) {
    const { userId } = useAuth();
    const {addLovedItem, removeLovedItem, lovedItems} = useLovedProducts();

    const likedProduct = (productId: string) => {
        return lovedItems.some((item) => item.id === productId);
    }
    
     const handleLikeProduct = (product: Product) => {
        if (likedProduct(product.id)) {
            removeLovedItem(product.id);
        } else {
            addLovedItem(product);
        }
    }
    

    if (!products || products.length === 0)
        return <SkeletonProducts />;

    return (
    <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <Image
            src={p.image || "/placeholder.png"}
            width={300}
            height={300}
            alt={p.name}
            className="rounded-md object-cover w-full h-56"
          />

          <h3 className="text-lg font-semibold mt-3">{p.name}</h3>

          <p className="text-sm text-gray-500">{p.category}</p>

          <p className="font-bold mt-2">${p.price.toFixed(2)}</p>

          <div className="text-sm mt-2">
            Stock:{" "}
            <span className={p.stock > 0 ? "text-green-600" : "text-red-600"}>
              {p.stock}
            </span>
          </div>

          <div className="text-sm mt-1">
            Status:{" "}
            <span className={p.isActive ? "text-green-600" : "text-red-600"}>
              {p.isActive ? "Stock" : "Out of Stock"}
            </span>
          </div>

          {userId ? (
                  <div className="flex items-center justify-center gap-x-3">
                     <Button
                    variant="outline"
                    className="flex-1 text-xs gap-1"
                    onClick={() => handleLikeProduct(p)}
                  >
                    <Heart className={`w-4 h-4 ${likedProduct(p.id) ? "fill-black" : ""}`} />
                    {likedProduct(p.id) ? "Saved" : "Save"}
                  </Button>
                  </div>
                ) : (
                  <div className="w-full mt-2 text-center">
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full">
                        Sign in to save
                      </Button>
                    </Link>
                  </div>
                )}
        </div>
      ))}
    </div>
  );
}
