import { z } from "zod";

export const customerSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().trim().min(1, "Campo obrigatório."),

  taxIdentificationNumber: z.string().trim().min(1, "Campo obrigatório."),

  contact: z.string().trim().min(1, "Campo obrigatório."),

  address: z.string().trim().trim().min(1, "Campo obrigatório."),

  postalCode: z.string().trim().min(1, "Campo obrigatório."),

  city: z.string().trim().min(1, "Campo obrigatório.")
});

export type ICustomerSchema = z.infer<typeof customerSchema>;
