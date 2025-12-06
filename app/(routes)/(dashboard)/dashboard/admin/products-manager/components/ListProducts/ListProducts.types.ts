import { Product } from "@prisma/client";

export type ListProductsProps = {
    products: Product[];
}