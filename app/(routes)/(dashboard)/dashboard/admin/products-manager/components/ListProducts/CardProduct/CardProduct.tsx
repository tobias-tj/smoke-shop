"use client";
import {
  Download,
  Edit,
  Fuel,
  Gauge,
  Gem,
  Trash,
  Upload,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CardProductProps } from "./CardProduct.types";
import { toast } from "sonner";

export function CardProduct(props: CardProductProps) {
  const { product, onSuccess } = props;

  const deleteProduct = async () => {
    try {
      await axios.delete(`/api/products/${product.id}`);
      toast.success("Product deleted successfully");
      onSuccess?.();
    } catch (error) {
      toast.error("Something went wrong!");`    `
    }
  };

  const handlerPublishProduct = async (publish: boolean) => {
    try {
     const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
      toast.promise(promise, {
        loading: `${publish ? "Publishing" : "Unpublishing"} product...`,
        success: `${publish ? "Published" : "Unpublished"} successfully!`,
      })        
      await axios.patch(`/api/products/${product.id}`, { isPublish: publish });
      
      onSuccess?.();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
       <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      
      {/* ---------- Imagen ---------- */}
      <div className="relative w-full h-40 bg-gray-100 p-2">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain rounded-md"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}

        {/* Estado publicado */}
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-semibold rounded-full text-white ${
            product.isActive ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {product.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* ---------- Info ---------- */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold line-clamp-2">{product.name}</h3>
          {product.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex justify-between items-center mt-2">
            <span className="text-xs font-medium px-2 py-0.5 bg-gray-200 rounded-full">
              {product.category}
            </span>
            <span className="text-sm font-semibold text-indigo-600">
              ${product.price}
            </span>
          </div>
        </div>

        {/* ---------- Stock ---------- */}
        <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
          <span>Stock: {product.stock}</span>
          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
        </div>

        {/* ---------- Acciones ---------- */}
        <div className="mt-3 flex gap-1">
          <Button variant="outline" className="flex-1 text-xs flex items-center justify-center gap-1">
            Edit <Edit className="w-3 h-3" />
          </Button>
          <Button variant="destructive" className="flex-1 text-xs flex items-center justify-center gap-1">
            Delete <Trash className="w-3 h-3" />
          </Button>
          {product.isActive ?(
            <Button variant="secondary" className="flex-1 text-xs flex items-center justify-center gap-1" onClick={() => handlerPublishProduct(false)}>
            Unpublish
            <Download className="w-3 h-3" />
            </Button>
                    ): (
            <Button variant="secondary" className="flex-1 text-xs flex items-center justify-center gap-1" onClick={() => handlerPublishProduct(true)}>
            Publish
            <Upload className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
