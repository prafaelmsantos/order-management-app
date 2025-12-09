import { ICustomer } from "../../customers/models/Customer";
import { IProduct } from "../../products/models/Product";

export interface IProductOrder {
  id: number | null;
  orderId: number | null;
  productId: number;
  product: IProduct | null;
  unitPrice: number;
  color: string | null;

  zeroMonths: number;
  oneMonth: number;
  threeMonths: number;
  sixMonths: number;
  nineMonths: number;
  twelveMonths: number;
  eighteenMonths: number;
  twentyFourMonths: number;

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
  id: number | null;
  customerId: number;
  customer: ICustomer | null;
  observations: string | null;
  totalQuantity: number;
  totalPrice: number;
  productsOrders: IProductOrder[];
}

export interface IOrderTable {
  id: number;
  customerId: number;
  customerFullName: string;
  customerTaxIdentificationNumber: string | null;
  createdDate: string;
  totalQuantity: number;
  totalPrice: string;
}

export interface IProductOrderTable {
  id: number;
  productId: number;
  productDescription: string;
  color: string;
  unitPrice: number;
  index: number;
}

export enum OrderKeys {
  id = "id",
  customerFullName = "customerFullName",
  createdDate = "createdDate",
  totalQuantity = "totalQuantity",
  totalPrice = "totalPrice"
}

export const quantityFields = [
  { name: "zeroMonths", label: "0 Meses" },
  { name: "oneMonth", label: "1 Mês" },
  { name: "threeMonths", label: "3 Meses" },
  { name: "sixMonths", label: "6 Meses" },
  { name: "nineMonths", label: "9 Meses" },
  { name: "twelveMonths", label: "12 Meses" },
  { name: "eighteenMonths", label: "18 Meses" },
  { name: "twentyFourMonths", label: "24 Meses" },
  { name: "oneYear", label: "1 Ano" },
  { name: "twoYears", label: "2 Anos" },
  { name: "threeYears", label: "3 Anos" },
  { name: "fourYears", label: "4 Anos" },
  { name: "sixYears", label: "6 Anos" },
  { name: "eightYears", label: "8 Anos" },
  { name: "tenYears", label: "10 Anos" },
  { name: "twelveYears", label: "12 Anos" }
];
