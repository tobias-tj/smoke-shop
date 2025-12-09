"use client";
import Image from "next/image";
import { ShoppingCart, Tag, Heart, Eye, DollarSign, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ListProductsProps } from "./ListProducts.types";
import { useLovedProducts } from "@/hooks/useLovedProducts";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ListProducts({ products }: ListProductsProps) {
  const {addLovedItem, lovedItems, removeLovedItem } = useLovedProducts();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const router = useRouter();



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

  const handleCardClick = (id: string) => {
    setLoadingId(id);
    router.push(`/dashboard/products/${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="relative w-full sm:w-64"
      >
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-10 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="relative w-full sm:w-48">
        <Tag className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
        <select className="border border-gray-300 rounded-md px-8 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black">
          <option value="">All Categories</option>
          <option value="vape">Vape</option>
          <option value="pods">Pods</option>
          <option value="accessories">Accessories</option>
        </select>
      </motion.div>

      <motion.div whileHover={{ scale: 1.03 }} className="relative w-full sm:w-48">
        <DollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
        <select className="border border-gray-300 rounded-md px-10 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black">
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </motion.div>
    </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="cursor-pointer border border-gray-200 hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick(product.id)}>
                {loadingId === product.id && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                    <span className="text-black font-semibold">Loading...</span>
                  </div>
                )}
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

                <CardContent className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold line-clamp-2 text-black">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {product.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Tag className="w-4 h-4" /> {product.category}
                    </span>
                    <span className="text-sm font-bold text-black">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Stock: {product.stock}</span>
                    <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center gap-2 p-4 pt-0">
                  <Button
                    variant="outline"
                    className="flex-1 text-xs gap-1"
                    onClick={(e) =>{ 
                      e.stopPropagation(); 
                      handleLikeProduct(product)
                    }}
                  >
                    <Heart className={`w-4 h-4 ${likedProduct(product.id) ? "fill-black" : ""}`} />
                    {likedProduct(product.id) ? "Saved" : "Save"}
                  </Button>

                  <Button
                    variant="default"
                    className="flex-1 text-xs gap-1 bg-black text-white border-none hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy
                  </Button>

                  {/* View */}
                  <Button
                    variant="outline"
                    className="flex-1 text-xs gap-1"
                    onClick={() => router.push(`/dashboard/products/${product.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
