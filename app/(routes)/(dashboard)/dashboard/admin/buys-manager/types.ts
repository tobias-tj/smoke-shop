import { Order } from "@prisma/client";

export type OrderWithDetails = Order & {
  user: {
    name: string;
    email: string;
  };
  items: {
    id: string;
    quantity: string;
    price: string;
    unitPrice: string;
    product: {
      name: string;
      price: string;
      image: string;
    };
    address: {
      street: string;
      city: string;
    };
  }[];
};
