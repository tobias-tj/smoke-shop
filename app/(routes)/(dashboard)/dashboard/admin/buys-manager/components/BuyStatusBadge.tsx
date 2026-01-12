import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@prisma/client";

interface Props {
  status: OrderStatus;
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  PAID: "bg-blue-100 text-blue-800 border border-blue-200",
  PREPARING: "bg-purple-100 text-purple-800 border border-purple-200",
  ON_THE_WAY: "bg-orange-100 text-orange-800 border border-orange-200",
  DELIVERED: "bg-green-100 text-green-800 border border-green-200",
  CANCELED: "bg-red-100 text-red-800 border border-red-200",
};

export function BuyStatusBadge({ status }: Props) {
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium capitalize ${STATUS_STYLES[status]}`}
    >
      {status.replaceAll("_", " ").toLowerCase()}
    </Badge>
  );
}
