import { z } from "zod";

export const customerSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().trim().min(1, "Campo obrigatório."),

  taxIdentificationNumber: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "O NIF deve conter exatamente 9 dígitos."),

  contact: z.string().trim().min(1, "Campo obrigatório."),

  address: z.string().trim().trim().min(1, "Campo obrigatório."),

  postalCode: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{3}$/, "O código postal deve estar no formato 0000-000."),

  city: z.string().trim().min(1, "Campo obrigatório.")
});

export type ICustomerSchema = z.infer<typeof customerSchema>;
