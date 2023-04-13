import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./pages/Dashboard";
import NotFound404 from "./errors/NotFound404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/users";
import UserCreate from "./pages/UserCreate";
import UserUpdate from "./pages/UserUpdate";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
                path: '/',
                element: <Navigate to='/users' />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/create',
                element: <UserCreate />
            },
            {
                path: '/users/:id/edit',
                element: <UserUpdate />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ],
    },
    {
        path: '*',
        element: <NotFound404 />
    },
])

export default router;