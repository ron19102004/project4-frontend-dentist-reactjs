import {Navigate, RouteObject} from "react-router-dom";
import AuthSafe from "@/root/layouts/auth.safe.tsx";
import ManagerLayout from "@/root/layouts/manager.layout.tsx";
import DashboardAdminPage from "@/root/pages/manager/admin/dashboard.tsx";
import {useAuth} from "@/hooks";
import AccountantServicePage from "@/root/pages/manager/accountant/service/page.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const CheckDashBoard = () => {
    const {role} = useAuth()!
    if (role === "ADMIN") {
        return <Navigate to={"admin/trang-chu"}/>
    }
    if (role === "ACCOUNTANT") {
        return <Navigate to={"accountant/trang-chu"}/>
    }
    return <Navigate to={"dentist/trang-chu"}/>
}
const adminRouter: RouteObject = {
    path: "admin",
    element: <AuthSafe includeRoles={["ADMIN"]}/>,
    children: [
        {
            path: "",
            element: <Navigate to={"trang-chu"}/>
        },
        {
            path: "trang-chu",
            element: <DashboardAdminPage/>
        },
        {
            path: "thong-tin-ca-nhan",
            element: <h1>thong-tin-ca-nhan</h1>
        },
        {
            path: "chuyen-nganh",
            element: <h1>chuyen-nganh</h1>
        },
        {
            path: "tai-khoan",
            element: <h1>tai-khoan</h1>
        }
    ]
};
const accountantRouter: RouteObject = {
    path: "accountant",
    element: <AuthSafe includeRoles={["ACCOUNTANT"]}/>,
    children: [
        {
            path: "",
            element: <Navigate to={"trang-chu"}/>
        },
        {
            path: "trang-chu",
            element: <DashboardAdminPage/>
        },
        {
            path: "dich-vu",
            element: <AccountantServicePage/>
        },
        {
            path: "thong-tin-ca-nhan",
            element: <h1>thong-tin-ca-nhan</h1>
        },
        {
            path: "phan-qua",
            element: <h1>phan-qua</h1>
        },
        {
            path: "hoa-don",
            element: <h1>hoa-don</h1>
        }
    ]
}
const dentistRouter: RouteObject = {
    path: "dentist",
    element: <AuthSafe includeRoles={["DENTIST"]}/>,
    children: [
        {
            path: "",
            element: <Navigate to={"trang-chu"}/>
        },
        {
            path: "thong-tin-ca-nhan",
            element: <h1>thong-tin-ca-nhan</h1>
        },
        {
            path: "trang-chu",
            element: <DashboardAdminPage/>
        },
        {
            path: "lich-hen",
            element: <h1>lich-hen</h1>
        },
        {
            path: "ho-so",
            element: <h1>ho-so</h1>
        }
    ]
}
const router: RouteObject[] = [
    {
        path: "/quan-ly",
        element: <AuthSafe excludeRoles={["PATIENT"]}/>,
        children: [
            {
                path: "",
                element: <ManagerLayout/>,
                children: [
                    {
                        path: "",
                        element: <CheckDashBoard/>
                    },
                    adminRouter,
                    accountantRouter,
                    dentistRouter,
                ]
            }
        ],
    },
];
export default router;
