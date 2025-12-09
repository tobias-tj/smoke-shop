"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, User } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useLovedProducts } from "@/hooks/useLovedProducts";
// import { useLovedVapes } from "@/hooks/useLovedVapes";

export function Navbar() {
const { userId } = useAuth();
const { lovedItems } = useLovedProducts();


    return (
        <div className="max-w-5xl py-5 mx-auto">
            <div className="justify-between lg:flex">
        <Link href="/" className="flex items-center justify-center gap-x-2">
          <Image src="/logo.svg" alt="MyVapes" width={50} height={50} />
          <span className="text-xl font-bold">MyVapes</span>
        </Link>
        <div className="flex items-center justify-center gap-x-7">
          <Link href="/products">List Products</Link>
          <Link href="/dashboard">Dashboard</Link>
          {userId ? (
            <>
              <Link href="/loved-products">
                <Heart
                  strokeWidth={1}
                  className={`cursor-pointer ${
                    lovedItems.length > 0 && "fill-black"
                  }`}
                />
              </Link>
              <UserButton />
            </>
          ) : (
            <Link href="/sign-in" className="flex gap-x-3">
              <Button>
                Sign in
                <User className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
            </div>
        </div>
    );
}