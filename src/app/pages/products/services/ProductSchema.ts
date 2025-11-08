import { z } from "zod";

export const productSchema = z.object({
  reference: z.string().trim().min(1, "Campo obrigatório."),
  description: z.string().trim().min(1, "Campo obrigatório."),
  quantity: z.number().min(1, "A quantidade deve ser pelo menos 1."),
  color: z.string().trim().min(1, "Campo obrigatório."),
  price: z.number().min(0.0, "O preço deve ser maior que 0.")
});

export type IProductSchema = z.infer<typeof productSchema>;
