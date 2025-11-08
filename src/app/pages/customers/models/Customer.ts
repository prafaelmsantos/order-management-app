export interface ICustomer {
  id: number;
  fullName: string;
  taxIdentificationNumber: string;
  contact: string;
  fullAddress: string;
  address: string;
  postalCode: string;
  city: string;
  createdAt: Date;
}

export enum CustomerKeys {
  id = "id",
  fullName = "fullName",
  taxIdentificationNumber = "taxIdentificationNumber",
  contact = "contact",
  fullAddress = "fullAddress",
  address = "address",
  postalCode = "postalCode",
  city = "city",
  createdAt = "createdAt"
}
