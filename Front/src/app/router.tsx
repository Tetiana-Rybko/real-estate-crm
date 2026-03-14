import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ClientsPage from "../pages/ClientsPage";
import RequireAuth from "./RequireAuth";
import { AppLayout } from "../layouts/AppLayout";
import PropertiesPage from "../pages/PropertiesPage";
import DealsPage from "../pages/DealsPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="/clients" replace /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "deals", element: <DealsPage /> },
    ],
  },
]);
