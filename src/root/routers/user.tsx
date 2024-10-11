import { Navigate, RouteObject } from "react-router-dom";
import Userlayout from "../layouts/user.layout";
import HomeUserPage from "../pages/user/home/page";
import ContactUserPage from "../pages/user/contact/page";


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
      }
    ],
  },
];
export default router;
