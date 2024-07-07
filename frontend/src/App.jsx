import CreateTask from "./Components/CreateTask";
import Edit from "./Components/Edit";
import Layout from "./Components/Layout/Layout";
import TaskDetails from "./Components/TaskDetails";
import Tasks from "./Components/Tasks";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="home" /> },
      { path: "home", element: <Tasks /> },
      { path: "/create", element: <CreateTask /> },
      { path: "/taskDetails/:id", element: <TaskDetails /> },
      { path: "/edit/:id", element: <Edit /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
