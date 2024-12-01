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
import BookingPage from "@/root/pages/user/appointment/booking.page.tsx";
import AppointmentDetailsPage from "@/root/pages/manager/dentist/appointment/appointment-details.page.tsx";


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
                path: "",
                element: <AuthSafe includeRoles={[Role.PATIENT]}/>,
                children: [
                    {path: "tai-khoan", element: <MyProfile/>},
                    {path: "dat-lich-hen", element: <BookingPage/>},
                ]
            },
            {
                path: "bac-si",
                element: <Outlet/>,
                children: [
                    {
                        path: "",
                        element: <DentistPage/>,
                    },
                    {
                        path: ":id",
                        element: <DentistDetailPage/>,
                    }
                ]
            },
            {
                path: "dich-vu",
                element: <Outlet/>,
                children: [
                    {
                        path: "",
                        element: <ServicePage/>
                    }
                ]
            },
            {
                path: "uu-dai",
                element: <RewardPage/>
            }
        ],
    },
    {
        path: "ho-so",
        element: <AuthSafe includeRoles={[Role.PATIENT,Role.DENTIST]}/>,
        children: [
            {path: ":id",element: <AppointmentDetailsPage/>}
        ]
    },
];
export default router;
