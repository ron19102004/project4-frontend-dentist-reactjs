import { Navigate, RouteObject } from "react-router-dom";
import Userlayout from "../layouts/user.layout";
import HomeUserPage from "../pages/user/home/page";
import ContactUserPage from "../pages/user/contact/page";
import ServiceUserPage from "../pages/user/service/page";
import SingleServiceUserPage from "../pages/user/service/single";
import BookingUserPage from "../pages/user/booking/page";
import DoctorUserPage from "../pages/user/doctor/page";


const router: RouteObject[] = [
  {
    path: "/",
    element: <Userlayout />,
    children: [
      {
        path: "",
        element: <Navigate to={'trang-chu'} />,
      },
      {
        path: 'trang-chu',
        element: <HomeUserPage />,
      },
      {
        path: 'lien-he',
        element: <ContactUserPage />
      },
      {
        path: 'dich-vu',
        element: <ServiceUserPage />
      },
      {
        path: 'dich-vu/:id',
        element: <SingleServiceUserPage  />
      }
      ,
      {
        path: 'dat-lich',
        element: <BookingUserPage  />
      } ,
      {
        path: 'bac-si',
        element: <DoctorUserPage  />
      }
    ],
  },
];
export default router;
