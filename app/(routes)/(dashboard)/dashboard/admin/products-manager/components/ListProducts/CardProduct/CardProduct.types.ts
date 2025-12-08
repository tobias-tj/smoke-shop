import { Product } from "@prisma/client";

export type CardProductProps = {
    product: Product;
    onSuccess?: () => void;
    onEdit?: (product: Product) => void;
}