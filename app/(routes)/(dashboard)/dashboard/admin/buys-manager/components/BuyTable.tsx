import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeStatusDropdown } from "./ChangeStatusDropdown";
import { BuyStatusBadge } from "./BuyStatusBadge";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OrderWithDetails } from "../types";
import { OrderPreviewDialog } from "./OrderPreviewDialog";
import { pdf } from "@react-pdf/renderer";
import { OrderReceiptPdf } from "./OrderReceiptPdf";
import { toast } from "sonner";

interface Props {
  orders: OrderWithDetails[];
  onRefresh: () => void;
}

export function BuyTable({ orders, onRefresh }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(
    null
  );
  const [downloading, setDownloading] = useState<string | null>(null);

  const downloadReceipt = async (order: OrderWithDetails) => {
    try {
      setDownloading(order.id);
    
      // Generamos el PDF solo para esta orden
      const blob = await pdf(<OrderReceiptPdf order={order} />).toBlob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${order.id.slice(0, 8)}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Receipt downloaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download receipt");
    } finally {
      setDownloading(null);
    }
  };

  const allowedStatuses = ["DELIVERED", "PREPARING", "PAID"];

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => {
              const canDownload = allowedStatuses.includes(order.status);

              return (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id.slice(0, 8)}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {order.user.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <BuyStatusBadge status={order.status} />
                  </TableCell>

                  <TableCell>${order.totalAmount.toString()}</TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right flex gap-2 justify-end">
                    {/* Preview */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {/* Download PDF solo si es permitido */}
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={!canDownload || downloading === order.id}
                      onClick={() => downloadReceipt(order)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>

                    {/* Cambio de estado */}
                    <ChangeStatusDropdown
                      orderId={order.id}
                      currentStatus={order.status}
                      onUpdated={onRefresh}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <OrderPreviewDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
