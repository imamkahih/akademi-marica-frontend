import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import DashboardAdmin from "./pages/admin/Dashboard";
import DashboardInstructor from "./pages/instructor/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/admin",
    element: <DashboardAdmin />,
  },
  {
    path: "/instructor",
    element: <DashboardInstructor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
