import { z } from "zod";

export const customerSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().trim().min(1, "Campo obrigatório."),

  storeName: z.string().nullable(),

  paymentMethod: z.string().nullable(),

  taxIdentificationNumber: z.string().nullable(),

  contact: z.string().nullable(),

  address: z.string().trim().trim().min(1, "Campo obrigatório."),

  postalCode: z.string().trim().min(1, "Campo obrigatório."),

  city: z.string().trim().min(1, "Campo obrigatório.")
});

export type ICustomerSchema = z.infer<typeof customerSchema>;
