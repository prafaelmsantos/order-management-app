import { z } from "zod";

export const productSchema = z.object({
  id: z.number().nullable(),
  reference: z
    .string()
    .trim()
    .min(1, "Campo obrigatório.")
    .refine((value) => !/[\\/:*?"<>|]/.test(value), {
      message: "A referência contém caracteres inválidos."
    }),
  description: z.string().nullable(),
  unitPrice: z.number().min(0, "Valor inválido!")
});

export type IProductSchema = z.infer<typeof productSchema>;
