import { z } from "zod";

export const clientSchema = z.object({
  fullName: z.string().trim().min(1, "Campo Obrigatório."),
  taxIdentificationNumber: z
    .string()
    .trim()
    .min(9, "NIF deve ter 9 dígitos")
    .max(9, "NIF deve ter 9 dígitos"),
  contact: z.string().min(9, "Campo Obrigatório."),
  address: z.string().min(1, "Campo Obrigatório."),
  postalCode: z.string().min(7, "Campo Obrigatório."),
  city: z.string().min(1, "Campo Obrigatório.")
});

export type IClientSchema = z.infer<typeof clientSchema>;
