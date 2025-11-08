import { Navigate, useRoutes } from "react-router";
import Dashboard from "../pages/dashboard/DashboardPage";
import ClientsPage from "../pages/clients/ClientsPage";
import DashboardLayout from "../components/DashboardLayout";
import EmployeeShow from "../pages/clients/components/EmployeeShow";
import EmployeeCreate from "../pages/clients/components/EmployeeCreate";
import EmployeeEdit from "../pages/clients/components/EmployeeEdit";
import ClientForm from "../pages/clients/components/form/ClientForm";
import EmployeeForm from "../pages/clients/components/EmployeeForm";
import CreateClient from "../pages/clients/components/CreateClient";
import ProductsPage from "../pages/products/ProductsPage";
import CreateProduct from "../pages/products/components/CreateProduct";
import OrdersPage from "../pages/orders/OrdersPage";
import CreateOrder from "../pages/orders/components/CreateOrder";

export default function AppRouter() {
  const Routes = [
    {
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/orders", element: <OrdersPage /> },
        { path: "/orders/:orderId", element: <EmployeeShow /> },
        { path: "/orders/new", element: <CreateOrder /> },

        { path: "/products", element: <ProductsPage /> },
        { path: "/products/:productId", element: <EmployeeShow /> },
        { path: "/products/new", element: <CreateProduct /> },

        { path: "/clients", element: <ClientsPage /> },
        { path: "/clients/:clientId", element: <EmployeeShow /> },
        { path: "/clients/new", element: <CreateClient /> },
        { path: "/clients/:clientId/edit", element: <EmployeeEdit /> },
        { path: "*", element: <Navigate to="/" replace /> }
      ]
    }
  ];
  return useRoutes(Routes);
}
