import { z } from "zod";
import { OrderStatus } from "../models/Order";

// 🧭 Enum do estado da encomenda (mesmo do backend)
export const OrderStatusEnum = z.enum({
  Open: 0,
  Pending: 1,
  Processing: 2,
  Delivered: 3,
  Cancelled: 4
});

// ✅ ProductOrder Schema
export const productOrderSchema = z.object({
  id: z.number().optional(),
  orderId: z.number().min(1, "Campo obrigatório."),
  productId: z.number().min(1, "Campo obrigatório."),
  unitPrice: z.number().min(0, "Campo obrigatório."),
  color: z.string().optional(),

  oneMonth: z.number().min(0, "Campo obrigatório."),
  threeMonths: z.number().min(0, "Campo obrigatório."),
  sixMonths: z.number().min(0, "Campo obrigatório."),
  twelveMonths: z.number().min(0, "Campo obrigatório."),
  eighteenMonths: z.number().min(0, "Campo obrigatório."),
  twentyFourMonths: z.number().min(0, "Campo obrigatório."),
  thirtySixMonths: z.number().min(0, "Campo obrigatório."),

  oneYear: z.number().min(0, "Campo obrigatório."),
  twoYears: z.number().min(0, "Campo obrigatório."),
  threeYears: z.number().min(0, "Campo obrigatório."),
  fourYears: z.number().min(0, "Campo obrigatório."),
  sixYears: z.number().min(0, "Campo obrigatório."),
  eightYears: z.number().min(0, "Campo obrigatório."),
  tenYears: z.number().min(0, "Campo obrigatório."),
  twelveYears: z.number().min(0, "Campo obrigatório."),

  totalQuantity: z.number().min(0, "Campo obrigatório."),
  totalPrice: z.number().min(0, "Campo obrigatório.")
});

export const orderSchema = z.object({
  id: z.number().optional(),
  customerId: z.number().min(1, "Campo obrigatório."),
  status: z.number().min(1, "Campo obrigatório."),
  totalQuantity: z.number().min(0, "Campo obrigatório."),
  totalPrice: z.number().min(0, "Campo obrigatório."),
  productsOrders: z
    .array(productOrderSchema)
    .min(1, "A encomenda deve conter pelo menos um produto.")
});

// ✅ Tipagem inferida
export type IOrderSchema = z.infer<typeof orderSchema>;
export type IProductOrderSchema = z.infer<typeof productOrderSchema>;
