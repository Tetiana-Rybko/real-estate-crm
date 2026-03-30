import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ClientsPage from "../pages/ClientsPage";
import RequireAuth from "./RequireAuth";
import { AppLayout } from "../layouts/AppLayout";
import PropertiesPage from "../pages/PropertiesPage";
import DealsPage from "../pages/DealsPage";
import PropertyIntakesPage from "../pages/PropertyIntakesPage";
import PropertyIntakePage from "../pages/PropertyIntakePage";
import PropertyIntakeCreatePage from "../pages/PropertyIntakeCreatePage";
import PropertyIntakeEditPage from "../pages/PropertyIntakeEditPage";

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
      { path: "property-intakes", element: <PropertyIntakesPage />},
      { path: "property-intakes/new", element: <PropertyIntakeCreatePage />},
      { path: "property-intakes/:id", element: <PropertyIntakePage />},
      { path: "property-intakes/:id/edit",element: <PropertyIntakeEditPage />},
    ],
  },
]);
