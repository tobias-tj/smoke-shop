"use client";

import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { pdf } from "@react-pdf/renderer";
import { OrdersPdf } from "./OrdersPdf";
import { Order } from "@prisma/client";

interface Props {
  orders: (Order & { user: { name: string; email: string } })[];
}

export function ExportButtons({ orders }: Props) {
  const [loading, setLoading] = useState<"csv" | "pdf" | null>(null);

  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportCSV = async () => {
    try {
      setLoading("csv");

      const { data } = await axios.get("/api/orders/export/csv", {
        responseType: "blob",
      });

      downloadFile(data, "orders-monthly.csv");
      toast.success("CSV exported successfully");
    } catch {
      toast.error("Failed to export CSV");
    } finally {
      setLoading(null);
    }
  };

  const exportPDF = async () => {
    try {
      setLoading("pdf");

      // Generamos el PDF directamente en el cliente
      const blob = await pdf(<OrdersPdf orders={orders} />).toBlob();
      downloadFile(blob, "orders-monthly.pdf");

      toast.success("PDF exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* CSV */}
      <Button
        variant="outline"
        size="sm"
        onClick={exportCSV}
        disabled={loading !== null}
        className="gap-2"
      >
        <FileSpreadsheet className="w-4 h-4" />
        {loading === "csv" ? "Exporting..." : "CSV"}
      </Button>

      {/* PDF */}
      <Button
        variant="default"
        size="sm"
        onClick={exportPDF}
        disabled={loading !== null}
        className="gap-2 bg-black text-white hover:bg-gray-800"
      >
        <FileText className="w-4 h-4" />
        {loading === "pdf" ? "Exporting..." : "PDF"}
      </Button>
    </div>
  );
}
