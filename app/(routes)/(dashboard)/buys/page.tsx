"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ClientOrdersList } from "./components/ClientOrdersList";
import { OrderWithDetails } from "../dashboard/admin/buys-manager/types";

export default function CheckoutPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<OrderWithDetails[]>("/api/my-orders");
      
      setOrders(data);
    } catch {
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Purchases</h2>

      <ClientOrdersList orders={orders} loading={loading} />
    </div>
  );
}
