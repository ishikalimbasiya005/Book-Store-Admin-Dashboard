import { lazy, Suspense } from 'react';
import { ROUTES } from "../Constants";

const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Books = lazy(() => import("../Pages/Books"));
const AllOrders = lazy(() => import("../Pages/Orders/All-Orders"));
const Returns = lazy(() => import("../Pages/Orders/Returns"));
const Transactions = lazy(() => import("../Pages/Orders/Transactions"));
const OrderDetails = lazy(() => import("../Components/Orders/All-Orders/OrderDetails"));
const MessagesPage = lazy(() => import("../Pages/Messages"));
const ProfilePage = lazy(() => import("../Pages/Profile"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={
        <div className="flex h-full w-full min-h-[50vh] items-center justify-center">
            <div className="w-10 h-10 border-4 border-sidebar-active border-t-transparent rounded-full animate-spin"></div>
        </div>
    }>
        {children}
    </Suspense>
);

export const Routes = [
    {path:ROUTES.DASHBOARD, element: <SuspenseWrapper><Dashboard/></SuspenseWrapper> },
    {path:ROUTES.BOOKS, element: <SuspenseWrapper><Books/></SuspenseWrapper> },
    {path:ROUTES.ORDERS_ALL, element: <SuspenseWrapper><AllOrders/></SuspenseWrapper> },
    {path:ROUTES.ORDERS_RETURNS, element: <SuspenseWrapper><Returns/></SuspenseWrapper> },
    {path:ROUTES.ORDERS_TRANSACTIONS, element: <SuspenseWrapper><Transactions/></SuspenseWrapper> },
    {path:ROUTES.ORDERS_DETAILS, element: <SuspenseWrapper><OrderDetails/></SuspenseWrapper> },
    {path:ROUTES.MESSAGES, element: <SuspenseWrapper><MessagesPage/></SuspenseWrapper> },
    {path:ROUTES.PROFILE, element: <SuspenseWrapper><ProfilePage/></SuspenseWrapper> }
]

