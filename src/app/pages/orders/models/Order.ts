import { ICustomer } from "../../customers/models/Customer";
import { IProduct } from "../../products/models/Product";

export interface IProductOrder {
  id?: number;
  orderId?: number;
  productId: number;
  product?: IProduct;
  unitPrice: number;
  color?: string;

  zeroMonths: number;
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
  id?: number;
  customerId: number;
  customer?: ICustomer;
  paymentMethod: string | null;
  observations: string | null;
  totalQuantity: number;
  totalPrice: number;
  productsOrders: IProductOrder[];
}

export interface IOrderTable {
  id: number;
  customerId: number;
  customerFullName: string;
  customerTaxIdentificationNumber: string;
  createdDate: string;
  totalQuantity: number;
  totalPrice: number;
}

export enum OrderKeys {
  id = "id",
  customerId = "customerId",
  customerFullName = "customerFullName",
  customerTaxIdentificationNumber = "customerTaxIdentificationNumber",
  status = "status",
  createdDate = "createdDate",
  totalQuantity = "totalQuantity",
  totalPrice = "totalPrice"
}
