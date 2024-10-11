import { RouteObject } from "react-router-dom";
import Userlayout from "../layouts/user.layout";
import HomeUserPage from "../pages/user/home/page";

const router: RouteObject[] = [
  {
    path: "/",
    element: <Userlayout />,
    children: [
      {
        path: "/",
        element: <HomeUserPage />,
      },
    ],
  },
];
export default router;
