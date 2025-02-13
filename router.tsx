import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./src/components/Header";
import Form from "./src/components/form/Form";
import EmployeeList from "./src/components/EmployeeList";

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
            <div>coucou</div>
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
