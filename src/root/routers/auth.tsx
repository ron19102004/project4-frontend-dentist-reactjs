import {Outlet, RouteObject} from "react-router-dom";
import VerifyResetPassword from "@/root/pages/auth/verify-reset-password.tsx";
import LoginPage from "../pages/auth/login";
import RegisterForm from "@/root/pages/auth/register.tsx";

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
            },
            {
                path:"dang-ky",
                element: <RegisterForm/>
            }
        ],
    },
];
export default router;
