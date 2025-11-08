import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory2 as InventoryIcon,
  People as PeopleIcon
} from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";

export enum NavType {
  Home = "Início",
  Orders = "Encomendas",
  Products = "Produtos",
  Clients = "Clientes"
}

export interface Nav {
  name: NavType;
  icon: SvgIconComponent;
  href: string;
}

export const NavItems: Nav[] = [
  { name: NavType.Home, icon: DashboardIcon, href: "/" },
  { name: NavType.Orders, icon: ShoppingCartIcon, href: "/orders" },
  { name: NavType.Products, icon: InventoryIcon, href: "/products" },
  { name: NavType.Clients, icon: PeopleIcon, href: "/clients" }
];
