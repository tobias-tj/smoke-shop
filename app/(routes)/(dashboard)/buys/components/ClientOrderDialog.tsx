import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderWithDetails } from "../../dashboard/admin/buys-manager/types";

interface Props {
  order: OrderWithDetails;
  open: boolean;
  onClose: () => void;
}

export function ClientOrderDialog({ order, open, onClose }: Props) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border-b pb-3"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-md object-cover"
              />

              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </p>
                <p className="text-sm">
                  ${item.unitPrice.toString()}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between font-semibold pt-2">
            <span>Total</span>
            <span>${order.totalAmount.toString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
