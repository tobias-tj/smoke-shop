"use client";

import { DialogAddBuy } from "@/components/Shared/DialogAddBuy";
import { Button } from "@/components/ui/button";
import { useLovedProducts } from "@/hooks/useLovedProducts";
import { Product } from "@prisma/client";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function ActionButtons({ product }: { product: Product }) {
  const { addLovedItem, lovedItems, removeLovedItem } = useLovedProducts();
  const { userId } = useAuth();


    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const onBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  

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
        onClick={() => onBuyNow(product)}
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

      <DialogAddBuy
      open={open}
      onOpenChange={setOpen}
      product={selectedProduct}
      onConfirm={async (street : string) => {
        if (!selectedProduct) return;

        try {
          const response = await axios.post("/api/checkout", {
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            price: selectedProduct.price,
            userId: userId,
            street: street,
          });

          window.location.href = response.data.url;
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      }}
    />
    </div>
  );
}
