import {Navigate, Outlet, RouteObject} from "react-router-dom";
import VerifyResetPassword from "@/root/pages/auth/verify-reset-password.tsx";

const router: RouteObject[] = [
    {
        path: "/auth",
        element: <Outlet/>,
        children: [
            {
                path: "",
                element: <Navigate to={'dang-nhap'} />,
            },
            {
                path: 'dang-nhap',
                element: <h1>Dang nhap</h1>,
            },
            {
                path:'reset-password/:token',
                element: <VerifyResetPassword/>
            }
        ],
    },
];
export default router;
