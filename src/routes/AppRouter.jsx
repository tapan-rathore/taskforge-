import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import NotFound from "../components/NotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Calendar from "../pages/Calendar";
import Team from "../pages/Team";
import Profile from "../pages/Profile";
import PublicRoute from "../components/layout/PublicRoute";
import TaskDetails from "../pages/TaskDetails";
import Board from "../pages/Board";
import ProjectDetails from "../pages/ProjectDetails";
import Notifications from "../pages/Notifications";

const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/",
                element: <AuthLayout />,
                errorElement: <NotFound />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/login" replace />
                    },
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPassword />
                    }
                ]
            },

        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/app",
                element: <MainLayout />,
                errorElement: <NotFound />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/app/dashboard" replace />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "tasks",
                        element: <Tasks />
                    },
                    {
                        path: "tasks/:taskId",
                        element: <TaskDetails />
                    },
                    {
                        path: "board",
                        element: <Board />
                    },
                    {
                        path: "projects",
                        element: <Projects />
                    },
                    {
                        path: "projects/:projectId",
                        element: <ProjectDetails />
                    },
                    {
                        path: "calendar",
                        element: <Calendar />
                    },
                    {
                        path: "team",
                        element: <Team />
                    },
                    {
                        path: "settings",
                        element: <Settings />
                    },
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "notifications",
                        element: <Notifications />,
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },

])

const AppRouter = () => {
    return <RouterProvider router={router} />
}

export default AppRouter