import {Outlet, RouteObject} from "react-router-dom";
import VerifyResetPassword from "@/root/pages/auth/verify-reset-password.tsx";
import LoginPage from "../pages/auth/login";

const router: RouteObject[] = [
    {
        path: "/",
        element: <Outlet/>,
        children: [
            {
                path: 'dang-nhap',
                element: <LoginPage/>,
            },
            {
                path:'auth/reset-password/:token',
                element: <VerifyResetPassword/>
            }
        ],
    },
];
export default router;
