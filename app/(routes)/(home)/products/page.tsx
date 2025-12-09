import { Navbar } from "@/components/Shared/Navbar/Navbar";
import { db } from "@/lib/db";
import HeaderProducts from "./components/HeaderProducts/HeaderProducts";
import FilterAndListProducts from "./components/FilterAndListProducts/FilterAndListProducts";

export default async function ProductsPage() {
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
    createdAt: false, // Date
  },
});

// Convertir Decimal y Date
const plainProducts = products.map((p) => ({
  ...p,
  price: Number(p.price),
}));


    return (
        <div>
            <Navbar />
            <div className="p-6 mx-auto max-w-7xl"> 
                <HeaderProducts />
                <div>
                    <FilterAndListProducts products={plainProducts} />
                </div>
            </div>
        </div>
    );
}