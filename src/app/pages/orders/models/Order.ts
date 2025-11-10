export enum OrderStatus {
  Open = 0,
  Pending,
  Processing,
  Delivered,
  Cancelled
}

export const OrderStatusLabel: Record<OrderStatus, string> = {
  [OrderStatus.Open]: "Aberta",
  [OrderStatus.Pending]: "Pendente",
  [OrderStatus.Processing]: "Em processamento",
  [OrderStatus.Delivered]: "Entregue",
  [OrderStatus.Cancelled]: "Cancelada"
};

export const OrderStatusColor: Record<OrderStatus, string> = {
  [OrderStatus.Open]: "#1976d2",
  [OrderStatus.Pending]: "#ed6c02",
  [OrderStatus.Processing]: "#0288d1",
  [OrderStatus.Delivered]: "#2e7d32",
  [OrderStatus.Cancelled]: "#d32f2f"
};

export interface IProductOrder {
  orderId?: number;
  productId: number;
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
  id?: number;
  customerId: number;
  status: OrderStatus;
  totalQuantity: number;
  totalPrice: number;
  productsOrders: IProductOrder[];
}

export interface IOrderTable {
  id: number;
  customerId: number;
  customerFullName: string;
  customerTaxIdentificationNumber: string;
  status: OrderStatus;
  createdDate: Date;
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
