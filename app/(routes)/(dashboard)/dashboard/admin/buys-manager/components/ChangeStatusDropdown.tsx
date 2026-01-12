import { OrderStatus } from "@prisma/client";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
  onUpdated: () => void;
}

export function ChangeStatusDropdown({
  orderId,
  currentStatus,
  onUpdated,
}: Props) {
  const handleChange = async (value: OrderStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, {
        status: value,
      });

      toast.success("Order status updated");
      onUpdated();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <Select defaultValue={currentStatus} onValueChange={handleChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(OrderStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
