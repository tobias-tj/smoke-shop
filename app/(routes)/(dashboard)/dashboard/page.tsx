import { db } from "@/lib/db";
import ListProducts from "./components/ListProducts/ListProducts";

export default async function Dashboard() {
  
  const products = await db.product.findMany({
  where: { isActive: true },
  orderBy: { createdAt: "desc" },
  select: {
    id: true,
    name: true,
    description: true,
    category: true,
    price: true, // Decimal
    image: true,
    isActive: true,
    stock: true,
    createdAt: true, // Date
  },
});

// Convertir Decimal y Date
const plainProducts = products.map((p) => ({
  ...p,
  price: Number(p.price),
  createdAt: p.createdAt.toISOString(),
}));

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">List of Products</h2>
      </div>
      <div className="mt-6">
        <ListProducts products={plainProducts} />
      </div>
    </div>
  );
}
