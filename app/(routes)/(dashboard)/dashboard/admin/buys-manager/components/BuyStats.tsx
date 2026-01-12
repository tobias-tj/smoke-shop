"use client";

import { Order, OrderStatus } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  orders: Order[];
}

export function BuyStats({ orders }: Props) {
  const total = orders.length;
  const completed = orders.filter(o => o.status === OrderStatus.DELIVERED).length;
  const pending = orders.filter(o => o.status === OrderStatus.PENDING).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Total Orders" value={total} />
      <StatCard title="Completed" value={completed} />
      <StatCard title="Pending" value={pending} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
