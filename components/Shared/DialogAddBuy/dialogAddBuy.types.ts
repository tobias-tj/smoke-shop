import { Product } from "@prisma/client";

export interface DialogAddBuyTypes {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onConfirm: (street: string) => void;
}
