export interface IClient {
  id: string;
  fullName: string;
  taxIdentificationNumber: number;
  contact: string;
  fullAddress: string;
  address: string;
  postalCode: string;
  city: string;
}

export enum ClientKeys {
  id = "id",
  fullName = "fullName",
  taxIdentificationNumber = "taxIdentificationNumber",
  contact = "contact",
  fullAddress = "fullAddress",
  address = "address",
  postalCode = "postalCode",
  city = "city"
}
