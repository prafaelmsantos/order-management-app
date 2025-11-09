import { ICustomer } from "../../customers/models/Customer";
import { IProduct } from "../../products/models/Product";

export enum OrderStatus {
  Open = 0,
  Pending,
  Processing,
  Delivered,
  Cancelled
}

export interface IProductOrder {
  orderId: number;
  productId: number;
  product?: IProduct;
  unitPrice: number;
  color?: string;

  oneMonth: number;
  threeMonths: number;
  sixMonths: number;
  twelveMonths: number;
  eighteenMonths: number;
  twentyFourMonths: number;
  thirtySixMonths: number;

  oneYear: number;
  twoYears: number;
  threeYears: number;
  fourYears: number;
  sixYears: number;
  eightYears: number;
  tenYears: number;
  twelveYears: number;

  totalQuantity: number;
  totalPrice: number;
}

export interface IOrder {
  id: number;
  customerId: number;
  customer?: ICustomer;
  status: OrderStatus;
  createdAt: Date;
  totalQuantity: number;
  totalPrice: number;
  productsOrders: IProductOrder[];
}

export enum OrderKeys {
  id = "id",
  clientId = "clientId",
  client = "client",
  products = "products",
  state = "state",
  createdAt = "createdAt"
}
