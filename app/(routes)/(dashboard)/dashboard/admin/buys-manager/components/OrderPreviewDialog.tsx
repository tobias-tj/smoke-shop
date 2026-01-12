"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderWithDetails } from "../types";

interface Props {
  order: OrderWithDetails | null;
  onClose: () => void;
}

export function OrderPreviewDialog({ order, onClose }: Props) {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Preview</DialogTitle>
        </DialogHeader>

        {/* Customer */}
        <div>
          <p className="font-medium">{order.user.name}</p>
          <p className="text-sm text-muted-foreground">
            {order.user.email}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-2">
          {order.items.map(item => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p>${item.price}</p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold pt-2">
          <span>Total</span>
          <span>${order.totalAmount.toString()}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
