import { IClient } from "../../clients/models/client";
import { IProduct } from "../../products/models/Product";

export interface IOrder {
  id: number;
  clientId: number;
  client: IClient;
  products: IProduct[];
  state: string;
  createdAt: Date;
}

export enum OrderKeys {
  id = "id",
  clientId = "clientId",
  client = "client",
  products = "products",
  state = "state",
  createdAt = "createdAt"
}
