"use client";

import { Order, OrderStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BuyTable } from "./components/BuyTable";
import { ExportButtons } from "./components/ExportButtons";
import { BuyStats } from "./components/BuyStats";
import { BuyFilters } from "./components/BuyFilters";
import { toast } from "sonner";
import { OrderWithDetails } from "./types";

export default function BuyManagerPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<OrderWithDetails[]>(
        `/api/orders?status=${status}`
      );
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Buy Manager</h2>
        <ExportButtons orders={orders} />
      </div>

      <BuyStats orders={orders} />

      <BuyFilters status={status} onStatusChange={setStatus} />

      <BuyTable orders={orders} onRefresh={fetchOrders} />
    </div>
  );
}
