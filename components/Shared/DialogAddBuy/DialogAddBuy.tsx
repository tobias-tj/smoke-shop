"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogAddBuyTypes } from "./dialogAddBuy.types";

export function DialogAddBuy({ open, onOpenChange, product, onConfirm }: DialogAddBuyTypes) {
  const [street, setStreet] = useState("");
  const [streetError, setStreetError] = useState("");

  const handleConfirm = () => {
    if (!street.trim()) {
      setStreetError("Street is required");
      return;
    }

    onConfirm(street);
    setStreet(""); // reset
    setStreetError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Confirm your purchase
          </DialogTitle>
        </DialogHeader>

        {product && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-700">
              You're about to buy:
            </p>

            <div className="flex items-center gap-3">
              <Image
                src={product.image || ""}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
                unoptimized
              />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">${Number(product.price).toFixed(2)}</p>
              </div>
            </div>

            <label className="text-sm font-medium">Shipping Address</label>
            <input
              type="text"
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
                setStreetError("");
              }}
              placeholder="Enter your address..."
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            />
            {streetError && (
              <p className="text-xs text-red-500">{streetError}</p>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button className="bg-black text-white" onClick={handleConfirm}>
            Pay Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
