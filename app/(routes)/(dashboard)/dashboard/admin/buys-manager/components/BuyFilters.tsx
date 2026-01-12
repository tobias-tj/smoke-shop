"use client";

import { OrderStatus } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  status: OrderStatus | "ALL";
  onStatusChange: (value: OrderStatus | "ALL") => void;
}

export function BuyFilters({ status, onStatusChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>

          {Object.values(OrderStatus).map(status => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
