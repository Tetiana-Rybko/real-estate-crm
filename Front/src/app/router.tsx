import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { HomePage } from "../pages/HomePage";
import  ClientsPage from "../pages/ClientsPage";
import  ObjectsPage  from "../pages/ObjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },          // "/"
      { path: "clients", element: <ClientsPage /> },   // "/clients"
      { path: "objects", element: <ObjectsPage /> },   // "/objects"
    ],
  },
]);
