import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { ClientOrderDialog } from "./ClientOrderDialog";
import { DownloadReceiptButton } from "./DownloadReceiptButton";
import { OrderWithDetails } from "../../dashboard/admin/buys-manager/types";
import { BuyStatusBadge } from "../../dashboard/admin/buys-manager/components/BuyStatusBadge";

export function ClientOrderCard({ order }: { order: OrderWithDetails }) {
  const [open, setOpen] = useState(false);

  const firstItem = order.items[0];
  const extraItemsCount = order.items.length - 1;

  return (
    <>
      <Card>
        <CardContent className="p-4 flex gap-4 items-center">
          {/* Product Image */}
          <img
            src={firstItem.product.image}
            alt={firstItem.product.name}
            className="w-16 h-16 rounded-md object-cover border"
          />

          {/* Order Info */}
          <div className="flex-1 space-y-1">
            <p className="font-medium">{firstItem.product.name}</p>

            {extraItemsCount > 0 && (
              <p className="text-xs text-muted-foreground">
                +{extraItemsCount} more item{extraItemsCount > 1 ? "s" : ""}
              </p>
            )}

            <div className="flex items-center gap-2">
              <BuyStatusBadge status={order.status} />
              <span className="text-xs text-muted-foreground">
                Order #{order.id.slice(0, 8)}
              </span>
            </div>

            <p className="text-sm font-medium">
              Total: ${order.totalAmount.toString()}
            </p>

            <p className="text-xs text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
              <Eye className="w-4 h-4" />
            </Button>

            <DownloadReceiptButton order={order} />
          </div>
        </CardContent>
      </Card>

      <ClientOrderDialog
        order={order}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
