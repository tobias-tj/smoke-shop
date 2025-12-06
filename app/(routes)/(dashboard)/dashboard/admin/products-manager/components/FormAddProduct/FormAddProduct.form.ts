import z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre del producto debe tener al menos 2 caracteres." }),
  description: z.string().optional(),
  category: z.enum(["VAPE", "ESSENCE", "ACCESSORY", "OTHER"]),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  cost: z.string().optional(),
  image: z.string().url().optional(),
  stock: z.number().int().min(0, { message: "El stock debe ser un número entero mayor o igual a 0." })
});
