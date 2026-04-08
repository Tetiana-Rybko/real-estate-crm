import { createBrowserRouter, Navigate } from "react-router-dom";

import RequireAuth from "./RequireAuth";

import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";

import { AppLayout } from "../layouts/AppLayout";
import ClientsPage from "../pages/ClientsPage";
import PropertiesPage from "../pages/PropertiesPage";
import DealsPage from "../pages/DealsPage";
import PropertyIntakesPage from "../pages/PropertyIntakesPage";
import PropertyIntakeCreatePage from "../pages/PropertyIntakeCreatePage";
import PropertyIntakePage from "../pages/PropertyIntakePage";
import PropertyIntakeEditPage from "../pages/PropertyIntakeEditPage";
import KvartiryIrpen from "../pages/KvartiryIrpen";
import KvartiryBucha from "../pages/KvartiryBucha";
import KvartiryGostomel from "../pages/KvartiryGostomel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
  path: "/kvartiry-irpen",
  element: <KvartiryIrpen />,
  },
  {
  path: "/kvartiry-bucha",
  element: <KvartiryBucha />,
  },
  {
  path: "/kvartiry-gostomel",
  element: <KvartiryGostomel />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Navigate to="clients" replace /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "deals", element: <DealsPage /> },

      { path: "property-intakes", element: <PropertyIntakesPage /> },
      { path: "property-intakes/new", element: <PropertyIntakeCreatePage /> },
      { path: "property-intakes/:id", element: <PropertyIntakePage /> },
      { path: "property-intakes/:id/edit", element: <PropertyIntakeEditPage /> },
      { path: "kvartiry-irpen", element: <KvartiryIrpen /> },
    ],
  },
]);
