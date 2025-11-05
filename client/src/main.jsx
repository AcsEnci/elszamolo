import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import StudentList from "./Pages/StudentList";
import StudentCreator from "./Pages/StudentCreator";
import StudentUpdater from "./Pages/StudentUpdater";
import PaymentList from "./Pages/PaymentList";

import "./main.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <StudentList />,
      },
      {
        path: "/create",
        element: <StudentCreator />,
      },
      {
        path: "/update/:id",
        element: <StudentUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/payments/:id",
        element: <PaymentList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

