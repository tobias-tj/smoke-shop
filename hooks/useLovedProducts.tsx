import { Product } from "@prisma/client";
import { create } from "zustand";
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";


interface UseLovedProductsType{
    lovedItems: Product[];
    addLovedItem: (product: Product) => void;
    removeLovedItem: (productId: string) => void;
}

export const useLovedProducts = create(
   persist<UseLovedProductsType>(
    (set, get) => ({
        lovedItems: [],
        addLovedItem: (product: Product) => {
            const currentLovedItems = get().lovedItems;
            const existingItem = currentLovedItems.find(
                (item) => item.id === product.id
            );
            
            if(existingItem){
                return toast.warning("Product already in loved items");
            }
            
            set((state) => ({
                lovedItems: [...state.lovedItems, product],
            }))

            toast.success("Product added to loved items");
        },
        removeLovedItem: (productId: string) => {
            set((state) => ({
                lovedItems: state.lovedItems.filter((item) => item.id !== productId),
            }))

            toast.success("Product removed from loved items");
        },
    }),
    {
        name: "loved-products-storage",
        storage: createJSONStorage(() => localStorage),
    }
)
);