import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import { useState } from "react";
import { OrderWithDetails } from "../../dashboard/admin/buys-manager/types";
import { OrderReceiptPdf } from "../../dashboard/admin/buys-manager/components/OrderReceiptPdf";

const allowedStatuses = ["PAID", "PREPARING", "DELIVERED"];

export function DownloadReceiptButton({ order }: { order: OrderWithDetails }) {
  const [loading, setLoading] = useState(false);
  const canDownload = allowedStatuses.includes(order.status);

  const download = async () => {
    try {
      setLoading(true);
      const blob = await pdf(<OrderReceiptPdf order={order} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${order.id.slice(0, 8)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to download receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={!canDownload || loading}
      onClick={download}
    >
      <Download className="w-4 h-4" />
    </Button>
  );
}
