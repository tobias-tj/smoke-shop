"use client";

import { Button } from "@/components/ui/button";
import { useLovedProducts } from "@/hooks/useLovedProducts";
import { Product } from "@prisma/client";
import { Heart, ShoppingCart } from "lucide-react";

export default function ActionButtons({ product }: { product: Product }) {
  const { addLovedItem, lovedItems, removeLovedItem } = useLovedProducts();

  const likedProduct = (productId: string) =>
    lovedItems.some((item) => item.id === productId);

  const handleLikeProduct = (product: Product) => {
    if (likedProduct(product.id)) {
      removeLovedItem(product.id);
    } else {
      addLovedItem(product);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* Buy Now Button */}
      <Button
        variant="default"
        size="lg"
        className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition"
      >
        <ShoppingCart className="w-5 h-5" />
        Buy Now
      </Button>

      {/* Save Button */}
      <Button
        variant={likedProduct(product.id) ? "default" : "outline"}
        size="lg"
        className={`w-full flex items-center justify-center gap-2 ${
          likedProduct(product.id)
            ? "bg-black text-white hover:bg-gray-800"
            : "border-black text-black hover:bg-gray-100"
        } transition`}
        onClick={() => handleLikeProduct(product)}
      >
        <Heart className={`w-5 h-5 ${likedProduct(product.id) ? "fill-white" : ""}`} />
        {likedProduct(product.id) ? "Saved" : "Save"}
      </Button>
    </div>
  );
}
