import Link from "next/link";
import Image from "next/image";

export default function RelatedCard({ product }: { product: any }) {
  return (
    <Link href={`/dashboard/products/${product.id}`}>
      <div className="border rounded-xl bg-white hover:shadow-lg transition cursor-pointer overflow-hidden">
        
        <div className="relative w-full h-48 bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-contain p-4"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold line-clamp-2 text-black">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">{product.category}</span>
            <span className="font-bold text-black text-sm">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
