import { z } from "zod";

export const customerSchema = z.object({
  id: z.number().nullable(),
  fullName: z.string().trim().min(1, "Campo obrigatório."),
  storeName: z.string().nullable(),
  paymentMethod: z.string().nullable(),
  taxIdentificationNumber: z.string().nullable(),
  contact: z.string().nullable(),
  address: z.string().nullable(),
  postalCode: z.string().nullable(),
  city: z.string().nullable()
});

export type ICustomerSchema = z.infer<typeof customerSchema>;
