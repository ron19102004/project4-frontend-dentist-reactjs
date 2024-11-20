import {Fragment, useEffect, useState} from "react";
import HeadUtil from "../../../../../components/utils/head.util.tsx";
import useService, {_useService} from "@/hooks/useService.hook.tsx";
import {LoopUtil} from "@/components/utils";
import EditServiceDialog from "@/root/pages/manager/accountant/service/edit.tsx";
import {useBoolean} from "@/hooks";
import {Service} from "@/apis/models";
import CreateServiceDialog from "@/root/pages/manager/accountant/service/create.tsx";
import Dialog from "@mui/material/Dialog";
import {CircularProgress} from "@mui/material";

const AccountantServicePage = () => {
    const {list: services, isServicesFetching, getAllService} = useService()!;
    const {value: isOpenEditDialog, setValue: setIsOpenEdit} = useBoolean()
    const {value: isOpenCreateDialog, setValue: setIsOpenCreate} = useBoolean()
    const {value: isMenuOpen, setValue: setIsMenuOpen} = useBoolean()
    const [serviceEdit, setServiceEdit] = useState<Service | null>(null)
    useEffect(() => {
    }, [isServicesFetching])
    return <Fragment>
        <HeadUtil
            title={"Quản lý dịch vụ"}
            author={""}
            urlImage={""}
            urlPageCurrent={""}
        />
        <section className={"max-w-screen p-4"}>
            <div className="flex items-center justify-between py-4 text-white">
                <div className="flex items-center md:justify-between md:space-x-4 w-full">
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => {
                                setIsOpenCreate(true)
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Thêm Dịch Vụ
                        </button>
                        <button
                            onClick={async () => {
                                await getAllService()
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
                    <div className={"flex items-center w-full md:w-fit gap-2"}>
                        <div className="md:hidden ">
                            <button
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                className="p-2 bg-gray-600 hover:bg-gray-700 rounded-md focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor"
                                     className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                        <div className="w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Tìm kiếm dịch vụ..."
                                className="text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none
                             focus:ring-2 focus:ring-indigo-500 w-full"
                            />
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="absolute top-16 right-4 bg-white text-black rounded-md shadow-lg w-40 md:hidden">
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Thêm Dịch Vụ
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
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
                )}
            </div>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr className={"bg-gray-700 text-white"}>
                        <th className="border border-gray-200 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Tên</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Giá</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Điểm tích lũy</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Mô tả</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Ảnh</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <LoopUtil
                        data={services}
                        render={service => {
                            return <tr className="hover:bg-gray-50 shadow">
                                <td className="border border-gray-200 px-4 py-2">{service.id}</td>
                                <td className="border border-gray-200 px-4 py-2">{service.name}</td>
                                <td className="border border-gray-200 px-4 py-2 text-center">{service.price}</td>
                                <td className="border border-gray-200 px-4 py-2 text-center">{service.pointReward}</td>
                                <td className="border border-gray-200">
                                     <textarea cols={50} className={"w-full p-4 rounded-xl w-96 h-28 outline-none"}
                                               disabled={true}>
                                        {service.description}
                                    </textarea>
                                </td>
                                <td className=" flex flex-col justify-center items-center">
                                    <img
                                        src={(service.poster && service.poster.length > 0) ? service.poster : "https://via.placeholder.com/50"}
                                        alt="Poster"
                                        className="w-20 h-20 object-cover rounded-md"/>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                        type="button" onClick={_ => {
                                        setServiceEdit(service)
                                        setIsOpenEdit(true)
                                    }}>
                                        Sửa
                                    </button>
                                    <button
                                        className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                        type="button">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        }}
                    />
                    </tbody>
                </table>
            </div>
        </section>
        <EditServiceDialog isOpen={isOpenEditDialog}
                           setOpen={setIsOpenEdit}
                           service={serviceEdit}/>
        <CreateServiceDialog isOpen={isOpenCreateDialog} setOpen={setIsOpenCreate}/>
        <Dialog
            style={{backgroundColor: "transparent"}}
            open={isServicesFetching}
        >
            <section className={"m-5 flex flex-col justify-center items-center"}>
                <CircularProgress/>
            </section>
        </Dialog>
    </Fragment>
}
export default AccountantServicePage
