import { z } from "zod";
import { clientSchema } from "../../customers/services/ClientSchema";
import { productSchema } from "../../products/services/ProductSchema";

// Schema do estado da encomenda
const orderStateSchema = z.enum([
  "pendente",
  "em processamento",
  "concluída",
  "cancelada"
]);

export const orderSchema = z.object({
  id: z.number().optional(),
  clientId: z.number(),
  client: clientSchema,
  products: z
    .array(productSchema)
    .min(1, "A encomenda deve conter pelo menos um produto."),
  state: z.string().trim().min(1, "Campo obrigatório."),
  createdAt: z.date().optional()
});

export type IOrderSchema = z.infer<typeof orderSchema>;
