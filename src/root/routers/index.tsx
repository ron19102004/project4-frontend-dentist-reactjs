import { createBrowserRouter, RouterProvider } from "react-router-dom";
import userRoutes from "./user";

const router = createBrowserRouter([...userRoutes]);

const RouterConf = () => {
  return <RouterProvider router={router} />;
};
export default RouterConf;
