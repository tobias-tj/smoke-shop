import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import RelatedSection from "./components/RelatedSection";
import BackButton from "./components/BackButton";

export default async function ProductDetailsPage({ params }: { params: { id: string }}) {
    
  const {id} = await params;
  
  const product = await db.product.findUnique({
    where: { id: id }
  });

  if (!product) return notFound();

  const related = await db.product.findMany({
    where: {
      category: product.category,
      id: { not: id },
      isActive: true,
    },
    take: 4,
  });

  const plainProduct = {
    ...product,
    price: Number(product.price),
    cost: product.cost ? Number(product.cost) : null,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  // const relatedProducts = related.map((r) => ({
  //   ...r,
  //   price: Number(r.price),
  // }));

  return (
      <div className="p-8 max-w-5xl mx-auto">
        <BackButton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <ProductImage image={product.image} name={product.name} />

        <ProductInfo product={plainProduct} />

      </div>

      <RelatedSection related={related} />
    </div>
  );
}
