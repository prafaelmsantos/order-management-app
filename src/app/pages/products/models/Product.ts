export interface IProduct {
  id?: number;
  reference: string;
  description: string | null;
  unitPrice: number;
  createdAt?: Date | null;
}

export enum ProductKeys {
  id = "id",
  reference = "reference",
  description = "description",
  unitPrice = "unitPrice",
  createdAt = "createdAt"
}
