import {useAuth, useBoolean} from "@/hooks";
import {NavLink, Outlet} from "react-router-dom";
import {INavRoute} from "@/components/nav/user";
import LoopUtil from "../../components/utils/loop.util.tsx";
import {useEffect} from "react";
import {cn} from "@/lib/cn.ts";


export default function ManagerLayout() {
    const {value: isSidebarOpen, setValue: setSidebarOpen} = useBoolean()
    const {role, isAuthenticated} = useAuth()!;
    const managersRoutes = (): INavRoute[] => {
        if (!isAuthenticated) {
            return []
        }
        if (role === "ADMIN") {
            return [
                {path: "/quan-ly/admin/trang-chu", title: "Trang chủ"},
                {path: "/quan-ly/admin/thong-tin-ca-nhan", title: "Thông tin của tôi"},
                {path: "/quan-ly/admin/chuyen-nganh", title: "Chuyên ngành"},
                {path: "/quan-ly/admin/tai-khoan", title: "Tài khoản"}
            ]
        }
        if (role === "ACCOUNTANT") {
            return [
                {path: "/quan-ly/accountant/trang-chu", title: "Trang chủ"},
                {path: "/quan-ly/accountant/thong-tin-ca-nhan", title: "Thông tin của tôi"},
                {path: "/quan-ly/accountant/dich-vu", title: "Dịch vụ"},
                {path: "/quan-ly/accountant/phan-qua", title: "Phần quà"},
                {path: "/quan-ly/accountant/hoa-don", title: "Hóa đơn"}
            ]
        }
        return [
            {path: "/quan-ly/dentist/trang-chu", title: "Trang chủ"},
            {path: "/quan-ly/dentist/thong-tin-ca-nhan", title: "Thông tin của tôi"},
            {path: "/quan-ly/dentist/lich-hen", title: "Lịch hẹn"},
            {path: "/quan-ly/dentist/ho-so", title: "Hồ sơ bệnh án"}
        ]
    }
    useEffect(() => {
    }, [isAuthenticated])
    const roleVietnamese = (role: string) => {
        switch (role) {
            case "ADMIN": {
                return "Quản trị viên"
            }
            case "DENTIST": {
                return "Bác sĩ"
            }
            case "ACCOUNTANT": {
                return "Thu ngân"
            }
            default: {
                return "UNKNOWN"
            }
        }
    }
    return (
        <div className="md:flex h-screen bg-gray-100">
            <aside
                className={`${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } fixed z-50 top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform
                 duration-300 md:translate-x-0 md:relative md:flex flex-col`}
            >
                <div className="h-16 flex items-center justify-center bg-gray-900 text-lg font-bold">
                    Quản Lý
                </div>
                <nav className="flex-1 px-4 py-2">
                    <ul className="space-y-2">
                        <LoopUtil data={managersRoutes()} render={item => {
                            return (
                                <NavLink to={item.path}
                                         className={({isActive}) =>
                                             cn("block py-4 px-4 rounded hover:bg-gray-700", {
                                                 "bg-blue-700": isActive
                                             })
                                         }>
                                    {item.title}
                                </NavLink>
                            )
                        }}/>
                    </ul>
                </nav>
                <div className="p-4">
                    <button className="w-full py-4 bg-gray-700 hover:bg-blue-700 rounded">
                        Logout
                    </button>
                </div>
            </aside>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Main Content */}
            <div className="md:flex-1 flex flex-col">
                <header className="h-16 bg-white shadow flex items-center px-6">
                    <button
                        className="md:hidden mr-4 text-gray-800"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Vai trò: {roleVietnamese(role)}</h1>
                </header>
                <main className="md:flex-1 overflow-y-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
