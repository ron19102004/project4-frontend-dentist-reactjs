import {createBrowserRouter, RouterProvider, useLocation} from "react-router-dom";
import userRoutes from "./user";
import authRoutes from "./auth";

const router = createBrowserRouter([...userRoutes, ...authRoutes]);

const RouterConf = () => {
    return <RouterProvider router={router}/>
};
export default RouterConf;
