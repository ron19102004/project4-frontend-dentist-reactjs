import {Navigate, RouteObject} from "react-router-dom";
import AuthSafe from "@/root/layouts/auth.safe.tsx";
import ManagerLayout from "@/root/layouts/manager.layout.tsx";
import DashboardAdminPage from "@/root/pages/manager/admin/dashboard.tsx";
import {useAuth} from "@/hooks";
import AccountantServicePage from "@/root/pages/manager/accountant/service/page.tsx";
import {Role} from "@/apis/models.d";
import AccountantInvoicePage from "@/root/pages/manager/accountant/invoice/page.tsx";
import AccountantRewardPage from "@/root/pages/manager/accountant/reward/page.tsx";
import AdminSpecializePage from "@/root/pages/manager/admin/specialize/page.tsx";
import AdminAccountPage from "@/root/pages/manager/admin/account/page.tsx";
import ProfileManagerPage from "@/root/pages/manager/profile/page.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const CheckDashBoard = () => {
    const {role} = useAuth()!
    if (role === Role.ADMIN) {
        return <Navigate to={"admin/trang-chu"}/>
    }
    if (role === Role.ACCOUNTANT) {
        return <Navigate to={"accountant/trang-chu"}/>
    }
    return <Navigate to={"dentist/trang-chu"}/>
}
const adminRouter: RouteObject = {
    path: "admin",
    element: <AuthSafe includeRoles={[Role.ADMIN]}/>,
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
            element: <ProfileManagerPage/>
        },
        {
            path: "chuyen-nganh",
            element: <AdminSpecializePage/>
        },
        {
            path: "tai-khoan",
            element: <AdminAccountPage/>
        }
    ]
};
const accountantRouter: RouteObject = {
    path: "accountant",
    element: <AuthSafe includeRoles={[Role.ACCOUNTANT]}/>,
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
            element: <ProfileManagerPage/>
        },
        {
            path: "phan-qua",
            element: <AccountantRewardPage/>
        },
        {
            path: "hoa-don",
            element: <AccountantInvoicePage/>
        }
    ]
}
const dentistRouter: RouteObject = {
    path: "dentist",
    element: <AuthSafe includeRoles={[Role.DENTIST]}/>,
    children: [
        {
            path: "",
            element: <Navigate to={"trang-chu"}/>
        },
        {
            path: "thong-tin-ca-nhan",
            element: <ProfileManagerPage/>
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
        element: <AuthSafe excludeRoles={[Role.PATIENT]}/>,
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
