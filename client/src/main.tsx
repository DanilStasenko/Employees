import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Paths } from "./utils/path"
import { store } from "./app/store"
import Auth from "./app/features/auth/auth"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Employees from "./pages/Employees"
import AddEmployee from "./pages/AddEmployee"
import Status from "./pages/Status"
import Employee from "./pages/Employee"
import "./index.css"
import EditEmployee from "./pages/EditEmployee"

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
