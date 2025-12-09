export interface ICustomer {
  id: number | null;
  fullName: string;
  storeName: string | null;
  paymentMethod: string | null;
  taxIdentificationNumber: string | null;
  contact: string | null;
  address: string | null;
  postalCode: string | null;
  city: string | null;
}

export interface ICustomerTable {
  id: number;
  fullName: string;
  taxIdentificationNumber: string | null;
  contact: string | null;
  fullAddress: string | null;
  totalOrders: number;
}

export enum CustomerKeys {
  id = "id",
  fullName = "fullName",
  taxIdentificationNumber = "taxIdentificationNumber",
  contact = "contact",
  totalOrders = "totalOrders",
  createdDate = "createdDate"
}
