export interface ICustomer {
  id?: number;
  fullName: string;
  taxIdentificationNumber: string;
  contact: string;
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
}

export enum CustomerKeys {
  id = "id",
  fullName = "fullName",
  taxIdentificationNumber = "taxIdentificationNumber",
  contact = "contact",
  fullAddress = "fullAddress"
}
