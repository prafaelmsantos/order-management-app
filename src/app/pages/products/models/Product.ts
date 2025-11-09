export interface IProduct {
  id?: number;
  reference: string;
  description: string | null;
  unitPrice: number;
  createdAt?: Date;
}

export enum ProductKeys {
  id = "id",
  reference = "reference",
  description = "description",
  unitPrice = "unitPrice",
  createdAt = "createdAt"
}
