export interface IProduct {
  id: string;
  reference: string;
  color: string;
  price: number;
  quantity: number;
  description: string;
}

export enum ProductKeys {
  id = "id",
  reference = "reference",
  description = "description",
  quantity = "quantity",
  color = "color",
  price = "price"
}
