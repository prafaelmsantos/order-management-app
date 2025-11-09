import { z } from "zod";

export const customerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "O nome completo deve ter pelo menos 3 caracteres.")
    .regex(/^[A-Za-zÀ-ÿ\s']+$/, "O nome contém caracteres inválidos."),

  taxIdentificationNumber: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "O NIF deve conter exatamente 9 dígitos."),

  contact: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "O contacto deve conter exatamente 9 dígitos."),

  address: z
    .string()
    .trim()
    .min(3, "A morada deve ter pelo menos 3 caracteres."),

  postalCode: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{3}$/, "O código postal deve estar no formato 0000-000."),

  city: z.string().trim().min(2, "A cidade deve ter pelo menos 2 caracteres.")
});

export type ICustomerSchema = z.infer<typeof customerSchema>;
