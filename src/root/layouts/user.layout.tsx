import { Link, NavLink, Outlet } from "react-router-dom";
import constantHelper from "../../helper/constant.helper";
import { FcGlobe, FcCellPhone } from "react-icons/fc";
import assets from "../../assets/index.ts";
import { useEffect } from "react";
import LoopUtil from "../../components/utils/loop.util.tsx";
import { cn } from "@/lib/cn.ts";
interface INavRoute {
  title: string;
  path: string;
  children?: INavRoute[];
}
const navRoutesLeft: INavRoute[] = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Bảng giá dịch vụ",
    path: "/",
  },
  {
    title: "Dịch vụ",
    path: "/",
  },
];
const navRoutesRight: INavRoute[] = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Bảng giá dịch vụ",
    path: "/",
  },
  {
    title: "Dịch vụ",
    path: "/",
  },
];
export default function Userlayout() {
  useEffect(() => {}, []);
  return (
    <section>
      <header>
        <section>
          <section className="flex justify-between items-center py-2 px-4">
            <section className="flex justify-start items-center space-x-1">
              <FcGlobe size={20} />
              <h1>Nơi ở hiện tại: {constantHelper.addressCurrent}</h1>
            </section>
            <nav>
              <a href="/" className="hover:text-primary">
                Trang chủ
              </a>
            </nav>
          </section>
          <hr />
          <section className="relative flex justify-between items-center py-6 px-4">
            <section className="flex justify-start items-center space-x-1">
              <FcCellPhone size={20} />
              <h1 className="space-x-1">
                <span className="uppercase">Khám cấp cứu:</span>
                <span className="text-red-500 font-semibold">0392477615</span>
              </h1>
            </section>
            <section className="absolute w-24 h-24 bg-white rounded-full flex flex-col justify-center items-center left-[50%] -translate-x-[50%] shadow-2xl -bottom-10">
              <img
                src={assets.AppIcon}
                alt="logo"
                className="w-20 h-20 object-cover"
              />
            </section>
          </section>
        </section>
        <nav className="bg-primary py-4 flex justify-around items-center">
          <section>
            <ul className="flex justify-around items-center gap-3">
              <LoopUtil
                data={navRoutesLeft}
                render={(nav: INavRoute) => (
                  <li className="font-semibold">
                    <NavLink
                      to={nav.path}
                      className={({ isActive }) =>
                        cn({
                          "text-primary": isActive,
                          "text-white": !isActive,
                        })
                      }
                    >
                      {nav.title}
                    </NavLink>
                  </li>
                )}
              />
            </ul>
          </section>
          <section>
            <ul className="flex justify-around items-center gap-3">
              <LoopUtil
                data={navRoutesRight}
                render={(nav: INavRoute) => (
                  <li className="font-semibold">
                    <NavLink to={nav.path}>{nav.title}</NavLink>
                  </li>
                )}
              />
            </ul>
          </section>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </section>
  );
}
