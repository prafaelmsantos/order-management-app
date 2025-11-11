import { z } from "zod";
import { OrderStatus } from "../models/Order";
import { customerSchema } from "../../customers/services/CustomerSchema";
import { productSchema } from "../../products/services/ProductSchema";

// 🧭 Enum do estado da encomenda (mesmo do backend)
export const OrderStatusEnum = z.enum({
  Open: 0,
  Pending: 1,
  Processing: 2,
  Delivered: 3,
  Cancelled: 4
});

export const productOrderSchema = z.object({
  id: z.number().optional(),
  orderId: z.number().optional(),
  productId: z.number().min(1, "Campo obrigatório."),
  product: productSchema.optional(),
  unitPrice: z.number().min(0, "Campo inválido."),
  color: z.string().optional(),

  zeroMonths: z.number().min(0, "Campo inválido."),
  oneMonth: z.number().min(0, "Campo inválido."),
  threeMonths: z.number().min(0, "Campo inválido."),
  sixMonths: z.number().min(0, "Campo inválido."),
  twelveMonths: z.number().min(0, "Campo inválido."),
  eighteenMonths: z.number().min(0, "Campo inválido."),
  twentyFourMonths: z.number().min(0, "Campo inválido."),
  thirtySixMonths: z.number().min(0, "Campo inválido."),

  oneYear: z.number().min(0, "Campo inválido."),
  twoYears: z.number().min(0, "Campo inválido."),
  threeYears: z.number().min(0, "Campo inválido."),
  fourYears: z.number().min(0, "Campo inválido."),
  sixYears: z.number().min(0, "Campo inválido."),
  eightYears: z.number().min(0, "Campo inválido."),
  tenYears: z.number().min(0, "Campo inválido."),
  twelveYears: z.number().min(0, "Campo inválido."),

  totalQuantity: z.number().min(0, "Campo inválido."),
  totalPrice: z.number().min(0, "Campo inválido.")
});

export const orderSchema = z.object({
  id: z.number().optional(),
  customerId: z.number().min(1, "Campo obrigatório."),
  customer: customerSchema.optional(),
  status: z.number().min(-1, "Campo obrigatório."),
  paymentMethod: z.string().nullable(),
  observations: z.string().nullable(),
  totalQuantity: z.number().min(0, "Campo inválido."),
  totalPrice: z.number().min(0, "Campo inválido."),
  productsOrders: z.array(productOrderSchema)
});

export type IOrderSchema = z.infer<typeof orderSchema>;
export type IProductOrderSchema = z.infer<typeof productOrderSchema>;
