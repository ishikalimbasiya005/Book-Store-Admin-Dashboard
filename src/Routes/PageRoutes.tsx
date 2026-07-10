import { ROUTES } from "../Constants";
import Dashboard from "../Pages/Dashboard";
import Books from "../Pages/Books";
import AllOrders from "../Pages/Orders/All-Orders";
import Returns from "../Pages/Orders/Returns";
import Transactions from "../Pages/Orders/Transactions";
import { OrderDetails } from "../Pages/Orders";
import MessagesPage from "../Pages/Messages";
import ProfilePage from "../Pages/Profile";

export const Routes = [
    {path:ROUTES.DASHBOARD, element: <Dashboard/> },
    {path:ROUTES.BOOKS, element: <Books/> },
    {path:ROUTES.ORDERS_ALL, element: <AllOrders/> },
    {path:ROUTES.ORDERS_RETURNS, element: <Returns/> },
    {path:ROUTES.ORDERS_TRANSACTIONS, element: <Transactions/> },
    {path:ROUTES.ORDERS_DETAILS, element: <OrderDetails/> },
    {path:ROUTES.MESSAGES, element: <MessagesPage/> },
    {path:ROUTES.PROFILE, element: <ProfilePage/> }
]

