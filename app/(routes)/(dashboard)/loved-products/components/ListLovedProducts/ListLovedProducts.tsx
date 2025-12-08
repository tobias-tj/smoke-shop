"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import { ShoppingCart, Trash } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLovedProducts } from "@/hooks/useLovedProducts";

export default function ListLovedProducts() {
  const router = useRouter();
  const { lovedItems, removeLovedItem } = useLovedProducts();

  if (lovedItems.length === 0) {
    return (
      <h2 className="text-center text-gray-500 mt-10 text-lg">
        No loved products
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {lovedItems.map((product: Product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            className="border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            {/* Imagen */}
            <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Contenido */}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2 text-black">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.description ?? ""}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-bold text-black">
                  ${product.price.toFixed(2)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evita que abra el detalle
                    removeLovedItem(product.id);
                  }}
                  className="text-gray-400 hover:text-black transition"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </CardContent>

            {/* Footer: solo un botón Buy */}
            <CardFooter className="p-4 pt-0">
              <Button
                variant="default"
                className="w-full text-xs gap-1 bg-black text-white border-none hover:bg-gray-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Aquí colocar lógica de compra más adelante
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                Buy
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
