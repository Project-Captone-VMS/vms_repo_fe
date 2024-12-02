import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from "./layout/DefaultLayout";
import PrivateRouter from "./components/PrivateRouter";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layout/AuthLayout";
import VehicleManagement from "./pages/VehicleManegement/VehicleManagement";
import DriverManagement from "./pages/DriverManagement/DriverManagement";
import UpdateDriver from "./components/Modals/UpdateDriver";
import OverviewTab from "./pages/VehicleManegement/sub-pages/OverviewTab";
import VehiclesTab from "./pages/VehicleManegement/sub-pages/VehiclesTab";
import MaintenanceTab from "./pages/VehicleManegement/sub-pages/MaintenanceTab";
import WarehouseManagement from "./pages/WarehouseManagement.jsx/WarehouseManagement";
import WarehouseProduct from "./pages/WarehouseManagement.jsx/WarehouseProduct";
import Analytics from "./pages/AnalyticsManagement/Analytics";
import ProfileInformation from "./pages/Profileinformation";
import IndexRoute from "./pages/Route/IndexRoute";
import OverviewRoute from "./pages/Route/sub-Route/OverviewRoute";
import ListRoute from "./pages/Route/sub-Route/ListRoute";
import AdminSender from "./pages/SendNotification/AdminSender";
import UserReceiver from "./pages/SendNotification/UserReceiver";

import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      element: <DefaultLayout />,
      children: [
        {
          element: <PrivateRouter allowedRoles={"USER"} />,
          children: [
            {
              path: "driveuser",
              element: <Dashboard />,
            },

            {
              path: "profile",
              element: <ProfileInformation />,
            },
            {
              path: "UserReceiver",
              element: <UserReceiver />,
            },
          ],
        },
        {
          element: <PrivateRouter allowedRoles={"ADMIN"} />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "profile",
              element: <ProfileInformation />,
            },

            {
              path: "vehicle",
              element: <VehicleManagement />,
              children: [
                {
                  path: "",
                  element: <Navigate to="OverviewTab" replace />,
                },
                {
                  path: "OverviewTab",
                  element: <OverviewTab />,
                },
                {
                  path: "VehiclesTab",
                  element: <VehiclesTab />,
                },
                {
                  path: "MaintenanceTab",
                  element: <MaintenanceTab />,
                },
              ],
            },
            {
              path: "driver",
              element: <DriverManagement />,
            },
            {
              path: "driver/update/:id",
              element: <UpdateDriver />,
            },
            {
              path: "warehouse",
              element: <WarehouseManagement />,
            },
            {
              path: "warehouse/:warehouseId",
              element: <WarehouseProduct />,
            },
            {
              path: "Analytics",
              element: <Analytics />,
            },

            {
              path: "indexNotification",
              element: <AdminSender />,
            },
            {
              path: "route",
              element: <IndexRoute />,
              children: [
                {
                  path: "",
                  element: <Navigate to="overviewRoute" replace />,
                },
                {
                  path: "overviewRoute",
                  element: <OverviewRoute />,
                },
                {
                  path: "listRoute",
                  element: <ListRoute />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
