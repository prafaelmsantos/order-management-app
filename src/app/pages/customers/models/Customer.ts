export interface ICustomer {
  id?: number;
  fullName: string;
  storeName: string | null;
  paymentMethod: string | null;
  taxIdentificationNumber: string | null;
  contact: string | null;
  address: string;
  postalCode: string;
  city: string;
}

export interface ICustomerTable {
  id: number;
  fullName: string;
  taxIdentificationNumber: string;
  contact: string;
  fullAddress?: string | null;
  totalOrders: number;
}

export enum CustomerKeys {
  id = "id",
  fullName = "fullName",
  taxIdentificationNumber = "taxIdentificationNumber",
  contact = "contact",
  fullAddress = "fullAddress",
  totalOrders = "totalOrders"
}
