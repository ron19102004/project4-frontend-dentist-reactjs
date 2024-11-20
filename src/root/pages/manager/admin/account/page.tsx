import {FC, Fragment, useEffect, useState} from "react";
import HeadUtil from "../../../../../components/utils/head.util.tsx";
import {useAuth, useBoolean} from "@/hooks";
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser.hook.tsx";
import {Role, UserDetailsForAdmin} from "@/apis/models.d";
import {LoopUtil} from "@/components/utils";
import {cn} from "@/lib/cn.ts";
import AccountDetailsDialog from "@/root/pages/manager/admin/account/account-details.tsx";
import CreateAccountHasRoleDialog from "@/root/pages/manager/admin/account/create-has-role.tsx";

const AdminAccountPage: FC = () => {
    const {accessToken} = useAuth()!
    const {getUserDetailsForAdmin, resetRole} = useUser(accessToken);
    const [userDetailsForAdmin, setUserDetailsForAdmin] = useState<UserDetailsForAdmin[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1);
    const {value: isOpenDetails, setValue: setIsOpenDetails} = useBoolean()
    const {value: isOpenCreateUR, setValue: setIsOpenCreateUR} = useBoolean()
    const [userDetail, setUserDetail] = useState<UserDetailsForAdmin | null>(null)
    const initialize = async (pageCurrent: number) => {
        const data = await getUserDetailsForAdmin(pageCurrent)
        setUserDetailsForAdmin(data)
    }
    useEffect(() => {
        initialize(pageNumber).then()
    }, [])
    const handlePageChange = async (type: "plus" | "minus") => {
        if (pageNumber > 0 && userDetailsForAdmin.length === 10) {
            let pageNew = pageNumber;
            if (type === "plus") {
                pageNew += 1
                setPageNumber(pageNew);
            } else if (type === "minus") {
                pageNew -= 1
                setPageNumber(pageNew);
            }
            await initialize(pageNew);
        }
    };
    const delRoleHandler = async (userId: number) => {
        const isDel = confirm("Bạn có chắc chắn muốn xóa hay không?")
        if (isDel) {
            await resetRole(userId, async () => {
                toast.success("Xóa quyền thành công")
                await initialize(pageNumber);
            }, (message) => {
                toast.error(message)
            })
        }
    }
    return <Fragment>
        <HeadUtil
            title={"Quản lý tài khoản"}
            author={""}
            urlImage={""}
            urlPageCurrent={""}
        />
        <section className={"max-w-screen px-4 pt-2"}>
            <div className="flex items-center justify-between py-4 text-white">
                <div className="flex items-center md:justify-between md:space-x-4 w-full gap-2">
                    <div className={"flex flex-row gap-2 w-full"}>
                        <button
                            onClick={() => {
                                setIsOpenCreateUR(true)
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Thêm BS/TN
                        </button>
                        <button
                            onClick={async () => {
                                await initialize(pageNumber)
                                toast.success("Đã tải lại")
                            }}
                            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 4v6h4M20 20v-6h-4M8 20h8M16 4h-8"/>
                            </svg>
                            Tải lại
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr className={"bg-gray-700 text-white"}>
                        <th className="border border-gray-200 px-4 py-2 text-left">ID tài khoản</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Tên</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Tên tài khoản</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Vai trò</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Số điện thoại</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <LoopUtil
                        data={userDetailsForAdmin}
                        render={userDetails => {
                            return <tr className="hover:bg-gray-50 shadow">
                                <td className="border border-gray-200 px-4 py-2">
                                    <span className={"font-semibold"}>{userDetails.id}</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">{userDetails.fullName}</td>
                                <td className="border border-gray-200 px-4 py-2">{userDetails.username}</td>
                                <td className="px-4 py-2 flex flex-col justify-center items-center">
                                    <span className={cn("font-semibold px-2 py-1 rounded", {
                                        "bg-blue-200 text-blue-700": userDetails.role === Role.ADMIN,
                                        "bg-green-200 text-green-700": userDetails.role === Role.ACCOUNTANT,
                                        "bg-yellow-200 text-yellow-700": userDetails.role === Role.DENTIST
                                    })}>{userDetails.role}</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {(userDetails.role === Role.ACCOUNTANT && userDetails.accountant) ? userDetails.accountant.email : ""}
                                    {(userDetails.role === Role.ADMIN) ? userDetails.email : ""}
                                    {(userDetails.role === Role.DENTIST && userDetails.dentist) ? userDetails.dentist.email : ""}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {(userDetails.role === Role.ACCOUNTANT && userDetails.accountant) ? userDetails.accountant.phoneNumber : ""}
                                    {(userDetails.role === Role.ADMIN) ? userDetails.phone : ""}
                                    {(userDetails.role === Role.DENTIST && userDetails.dentist) ? userDetails.dentist.phoneNumber : ""}
                                </td>
                                <td className="border border-gray-200 px-4 py-2 flex flex-col md:flex-row items-center w-full gap-2">
                                    <button
                                        onClick={() => {
                                            setUserDetail(userDetails)
                                            setIsOpenDetails(true)
                                        }}
                                        className=" w-full rounded-md bg-gray-600 hover:bg-gray-700 py-2 px-4 border border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                        type="button">
                                        Chi tiết
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await delRoleHandler(userDetails.id)
                                        }}
                                        className="w-full rounded-md bg-red-600 hover:bg-red-700 py-2 px-4 border border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                        type="button">
                                        Xóa quyền
                                    </button>
                                </td>
                            </tr>
                        }}
                    />
                    </tbody>
                </table>

            </div>
            <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                    onClick={async () => {
                        await handlePageChange('minus')
                    }}
                    className="flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-600 font-medium rounded-md hover:bg-gray-200 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                    </svg>
                    Trang trước
                </button>
                <span className="text-sm font-semibold text-gray-700">
                        Trang {pageNumber}
                    </span>
                <button
                    onClick={async () => {
                        await handlePageChange('plus')
                    }}
                    className="flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-600 font-medium rounded-md hover:bg-gray-200 transition"
                >
                    Trang sau
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                </button>
            </div>
        </section>
        {userDetail && <AccountDetailsDialog isOpen={isOpenDetails} setOpen={setIsOpenDetails} user={userDetail}/>}
        <CreateAccountHasRoleDialog isOpen={isOpenCreateUR} setOpen={setIsOpenCreateUR}/>
    </Fragment>
}
export default AdminAccountPage
