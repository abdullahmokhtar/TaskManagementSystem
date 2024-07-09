import CreateTask from "./Components/CreateTask";
import Edit from "./Components/Edit";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/auth/Login";
import TaskDetails from "./Components/TaskDetails";
import Tasks from "./Components/Tasks";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import Register from "./Components/auth/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorPage from "./Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="home" /> },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        ),
      },
      {
        path: "/taskDetails/:id",
        element: (
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
