export interface IProduct {
  id: number | null;
  reference: string;
  description: string | null;
  unitPrice: number;
}

export interface IProductTable {
  id: number;
  reference: string;
  description: string | null;
  unitPrice: string;
  totalOrders: number;
  createdDate: string;
}

export enum ProductKeys {
  id = "id",
  reference = "reference",
  description = "description",
  unitPrice = "unitPrice",
  createdDate = "createdDate",
  totalOrders = "totalOrders"
}
