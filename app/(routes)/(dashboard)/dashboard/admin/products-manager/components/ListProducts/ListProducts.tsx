"use client";

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Product } from "@prisma/client";
import loadingAnimation from "@/public/loading1.json";
import Lottie from "lottie-react";
import { CardProduct } from "./CardProduct";

export const ListProducts = forwardRef<{ refresh: () => void }, {}>((props, ref) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSuccess = () => {
    loadProducts();
  };

   const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

   useImperativeHandle(ref, () => ({
    refresh: loadProducts,
  }));

  // carga inicial
  useEffect(() => {
    loadProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="p-8 flex flex-col items-center">
          <div className="w-40 h-40">
            <Lottie animationData={loadingAnimation} loop />
          </div>

          <p className="mt-2 text-sm font-medium text-muted-foreground animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );

  return (
    <div className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p: Product) => (
          <CardProduct key={p.id} product={p} onSuccess={handleSuccess} />
        ))}
      </div>
    </div>
  );
});

