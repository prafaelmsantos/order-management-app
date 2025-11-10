import { Navigate, useRoutes } from "react-router";
import Dashboard from "../pages/dashboard/DashboardPage";
import DashboardLayout from "../components/DashboardLayout";
import ProductsPage from "../pages/products/ProductsPage";
import ProductPage from "../pages/products/ProductPage";
import OrdersPage from "../pages/orders/OrdersPage";
import CustomersPage from "../pages/customers/CustomersPage";
import CustomerPage from "../pages/customers/CustomerPage";
import OrderPage from "../pages/orders/OrderPage";

export default function AppRouter() {
  const Routes = [
    {
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/orders", element: <OrdersPage /> },
        { path: "/orders/:orderId", element: <OrderPage /> },
        { path: "/orders/:orderId/edit", element: <OrderPage /> },
        { path: "/orders/new", element: <OrderPage /> },

        { path: "/products", element: <ProductsPage /> },
        { path: "/products/:productId", element: <ProductPage /> },
        { path: "/products/:productId/edit", element: <ProductPage /> },
        { path: "/products/new", element: <ProductPage /> },

        { path: "/customers", element: <CustomersPage /> },
        { path: "/customers/:customerId", element: <CustomerPage /> },
        { path: "/customers/:customerId/edit", element: <CustomerPage /> },
        { path: "/customers/new", element: <CustomerPage /> },

        { path: "*", element: <Navigate to="/" replace /> }
      ]
    }
  ];
  return useRoutes(Routes);
}
