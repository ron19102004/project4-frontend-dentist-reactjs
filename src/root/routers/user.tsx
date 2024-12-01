import {Navigate, Outlet, RouteObject} from "react-router-dom";
import Userlayout from "../layouts/user.layout";
import HomeUserPage from "../pages/user/home/page";
import ContactUserPage from "../pages/user/contact/page";
import SpecializeDetail from "@/root/pages/user/specialize/details-specialize.tsx";
import SpecializePage from "@/root/pages/user/specialize/page.tsx";
import MyProfile from "@/root/pages/user/profile/page.tsx";
import AuthSafe from "@/root/layouts/auth.safe.tsx";
import {Role} from "@/apis/models.d";
import DentistPage from "@/root/pages/user/dentist/page.tsx";
import DentistDetailPage from "@/root/pages/user/dentist/dentist-details.tsx";
import ServicePage from "@/root/pages/user/service/page.tsx";
import RewardPage from "@/root/pages/user/reward/page.tsx";


const router: RouteObject[] = [
    {
        path: "/",
        element: <Userlayout/>,
        children: [
            {
                path: "",
                element: <Navigate to={'trang-chu'}/>,
            },
            {
                path: 'trang-chu',
                element: <HomeUserPage/>,
            },
            {
                path: 'lien-he',
                element: <ContactUserPage/>
            },
            {
                path: "chuyen-nganh",
                element: <Outlet/>,
                children: [
                    {
                        path: "",
                        element: <SpecializePage/>
                    },
                    {
                        path: ":slug",
                        element: <SpecializeDetail/>
                    }
                ]
            },
            {
                path: "tai-khoan",
                element: <AuthSafe includeRoles={[Role.PATIENT]}/>,
                children: [
                    {path: "", element: <MyProfile/>}
                ]
            },
            {
                path:"bac-si",
                element: <Outlet/>,
                children:[
                    {
                        path:"",
                        element: <DentistPage/>,
                    },
                    {
                        path:":id",
                        element: <DentistDetailPage/>,
                    }
                ]
            },
            {
                path:"dich-vu",
                element: <Outlet/>,
                children:[
                    {
                        path: "",
                        element: <ServicePage/>
                    }
                ]
            },
            {
                path:"uu-dai",
                element: <RewardPage/>
            }
        ],
    },
];
export default router;
