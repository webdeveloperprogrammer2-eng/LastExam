import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./pages/Login";
import HomePage from "./pages/Home/HomePage";
import Dostavka from "./pages/doatavka/Dostavka";
import Layout from "./Layout";
import { GuestRoute } from "./GuestRoute";
import  ProtectedRoute  from "../src/lib/ProtectedRoute";
import ContactPage from './pages/Contacts/ContactPage'
import Catalog from './pages/Catalog/CatalogPage'
import Korzinka from './pages/karzinka'
import Oplata from './pages/Oplata/OplataPage'
import Oformleniye from './pages/doatavka/Oformleniye'

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <GuestRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        </GuestRoute>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "dostavka",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Dostavka />
            </Suspense>
          ),
        },
        {
          path: "Contacts",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ContactPage />
            </Suspense>
          ),
        },
        {
          path: "Catalog",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Catalog />
            </Suspense>
          ),
        },
        {
          path: "Karzinka",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Korzinka />
            </Suspense>
          ),
        },
        {
          path: "Oplata",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Oplata />
            </Suspense>
          ),
        },
        {
          path: "Oformleniye",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Oformleniye />
            </Suspense>
          ),
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}