import { Navigate, useRoutes } from "react-router";
import Dashboard from "../pages/dashboard/DashboardPage";
import DashboardLayout from "../components/DashboardLayout";
import EmployeeShow from "../pages/clients/components/EmployeeShow";
import EmployeeEdit from "../pages/clients/components/EmployeeEdit";
import ProductsPage from "../pages/products/ProductsPage";
import ProductPage from "../pages/products/components/ProductPage";
import OrdersPage from "../pages/orders/OrdersPage";
import CreateOrder from "../pages/orders/components/CreateOrder";
import CreateCustomer from "../pages/customers/components/CreateCustomer";
import CustomersPage from "../pages/customers/CustomersPage";

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
        { path: "/products/:productId", element: <ProductPage /> },
        { path: "/products/:productId/edit", element: <ProductPage /> },
        { path: "/products/new", element: <ProductPage /> },

        { path: "/customers", element: <CustomersPage /> },
        { path: "/customers/:customerId", element: <EmployeeShow /> },
        { path: "/customers/new", element: <CreateCustomer /> },
        { path: "/customers/:customerId/edit", element: <EmployeeEdit /> },

        { path: "*", element: <Navigate to="/" replace /> }
      ]
    }
  ];
  return useRoutes(Routes);
}
