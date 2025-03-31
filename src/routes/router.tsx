import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Form from "../components/form/Form";
import EmployeeList from "../components/EmployeeList/EmployeeList";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "",
        element: (
          <>
            <Form />
          </>
        ),
      },
      {
        path: "employees",
        element: (
          <>
            <EmployeeList />
          </>
        ),
      },
    ],
  },
]);
