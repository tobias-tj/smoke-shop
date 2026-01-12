"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ListLovedProducts from "./components/ListLovedProducts/ListLovedProducts";

export default function LovedProductsPage() {
  const { userId } = useAuth();

  if(!userId){
    return redirect("/");
  }

    return (
        <div>
            <h1 className="text-2xl font-bold">Loved Products</h1>

            <ListLovedProducts />
        </div>
    );
}