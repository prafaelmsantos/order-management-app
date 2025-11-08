import { Navigate, useRoutes } from "react-router";
import Dashboard from "../pages/dashboard/DashboardPage";
import ClientsPage from "../pages/customers/ClientsPage";
import DashboardLayout from "../components/DashboardLayout";
import EmployeeShow from "../pages/clients/components/EmployeeShow";
import EmployeeCreate from "../pages/clients/components/EmployeeCreate";
import EmployeeEdit from "../pages/clients/components/EmployeeEdit";
import ClientForm from "../pages/customers/components/form/CustomerForm";
import EmployeeForm from "../pages/clients/components/EmployeeForm";
import ProductsPage from "../pages/products/ProductsPage";
import CreateProduct from "../pages/products/components/CreateProduct";
import OrdersPage from "../pages/orders/OrdersPage";
import CreateOrder from "../pages/orders/components/CreateOrder";
import CreateCustomer from "../pages/customers/components/CreateCustomer";

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

        { path: "/customers", element: <ClientsPage /> },
        { path: "/customers/:customerId", element: <EmployeeShow /> },
        { path: "/clients/new", element: <CreateCustomer /> },
        { path: "/customers/:customerId/edit", element: <EmployeeEdit /> },
        { path: "*", element: <Navigate to="/" replace /> }
      ]
    }
  ];
  return useRoutes(Routes);
}
