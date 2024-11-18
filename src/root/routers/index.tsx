import {createBrowserRouter, RouterProvider} from "react-router-dom";
import userRoutes from "./user";
import authRoutes from "./auth";
import manager from "./manager";
import {Fragment} from "react";
import {Toaster} from "react-hot-toast";

const router = createBrowserRouter([...userRoutes, ...authRoutes, ...manager]);

const RouterConf = () => {
    return (
        <Fragment>
            <RouterProvider router={router}/>
            <Toaster/>
        </Fragment>
    )
};
export default RouterConf;
