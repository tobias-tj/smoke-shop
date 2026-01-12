import { OrderWithDetails } from "../../dashboard/admin/buys-manager/types";
import { ClientOrderCard } from "./ClientOrderCard";

interface Props {
  orders: OrderWithDetails[];
  loading: boolean;
}

export function ClientOrdersList({ orders, loading }: Props) {
  if (loading) {
    return <p className="text-muted-foreground">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-muted-foreground">You have no purchases yet.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <ClientOrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
