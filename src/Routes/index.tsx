import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layout";
import AuthLayout from "../Layout/AuthLayout";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { Routes } from "./PageRoutes";
import { ROUTES } from "../Constants";

export const routes = createBrowserRouter([
   {
    element: <PublicRoute />,
    children: [
        {
            element: <AuthLayout />,
            children: [
                { path: ROUTES.LOGIN, element: <Login /> }
            ]
        }
    ]
   },
   {
    element: <ProtectedRoute />,
    children: [
        {
            element: <MainLayout />,
            children: [
                ...Routes
            ]
        }
    ]
   },
   {
    path: "*",
    element: <NotFound />
   }
]);