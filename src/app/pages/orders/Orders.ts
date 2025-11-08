import { IClient } from "../clients/models/client";
import { IProduct } from "../products/models/Product";
import { IOrder } from "./models/Order";

// Clientes mock
const mockClients: IClient[] = [
  {
    id: "1",
    fullName: "João Silva",
    taxIdentificationNumber: 123456789,
    contact: "912345678",
    fullAddress: "Rua das Flores, 123, 1000-001 Lisboa",
    address: "Rua das Flores, 123",
    postalCode: "1000-001",
    city: "Lisboa"
  },
  {
    id: "2",
    fullName: "Maria Santos",
    taxIdentificationNumber: 987654321,
    contact: "913333333",
    fullAddress: "Avenida Central, 55, 4000-222 Porto",
    address: "Avenida Central, 55",
    postalCode: "4000-222",
    city: "Porto"
  }
];

// Produtos mock
const mockProducts: IProduct[] = [
  {
    id: "1",
    reference: "CAM001",
    description: "Camisola Azul",
    quantity: 10,
    color: "Azul",
    price: 25.5
  },
  {
    id: "2",
    reference: "CAL002",
    description: "Calças Pretas",
    quantity: 5,
    color: "Preto",
    price: 39.9
  },
  {
    id: "3",
    reference: "SAP003",
    description: "Sapatos Castanhos",
    quantity: 8,
    color: "Castanho",
    price: 59.0
  }
];

// Encomendas mock
export const mockOrders: IOrder[] = [
  {
    id: 1,
    clientId: Number(mockClients[0].id),
    client: mockClients[0],
    products: [mockProducts[0], mockProducts[1]],
    state: "pendente",
    createdAt: new Date("2025-11-01T10:30:00")
  },
  {
    id: 2,
    clientId: Number(mockClients[1].id),
    client: mockClients[1],
    products: [mockProducts[2]],
    state: "em processamento",
    createdAt: new Date("2025-11-02T15:45:00")
  },
  {
    id: 3,
    clientId: Number(mockClients[0].id),
    client: mockClients[0],
    products: [mockProducts[1], mockProducts[2]],
    state: "concluída",
    createdAt: new Date("2025-11-03T09:00:00")
  }
];
