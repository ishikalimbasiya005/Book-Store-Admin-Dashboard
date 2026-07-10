import { lazy, Suspense } from 'react';
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layout";
import AuthLayout from "../Layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { Routes } from "./PageRoutes";
import { ROUTES } from "../Constants";

const Login = lazy(() => import("../Pages/Auth/Login"));
const NotFound = lazy(() => import("../Pages/NotFound"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="w-10 h-10 border-4 border-sidebar-active border-t-transparent rounded-full animate-spin"></div>
        </div>
    }>
        {children}
    </Suspense>
);

export const routes = createBrowserRouter([
   {
    element: <PublicRoute />,
    children: [
        {
            element: <AuthLayout />,
            children: [
                { path: ROUTES.LOGIN, element: <SuspenseWrapper><Login /></SuspenseWrapper> }
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
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>
   }
]);