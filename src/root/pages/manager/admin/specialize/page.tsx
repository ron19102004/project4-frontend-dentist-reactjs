import {FC, Fragment, useEffect, useState} from "react";
import HeadUtil from "../../../../../components/utils/head.util.tsx";
import {useAuth, useBoolean} from "@/hooks";
import {Specialize} from "@/apis/models.d";
import useSpecialize from "@/hooks/useSpecialize.hook.tsx";
import {LoopUtil} from "@/components/utils";
import CreateSpecializeDialog from "@/root/pages/manager/admin/specialize/create.tsx";
import toast from "react-hot-toast";
import UpdateSpecializeDialog from "@/root/pages/manager/admin/specialize/update.tsx";

const AdminSpecializePage: FC = () => {
    const {accessToken} = useAuth()!
    const {getAll, remove} = useSpecialize(accessToken)
    const [specializes, setSpecializes] = useState<Specialize[]>([])
    const {value: isOpenCreate, setValue: setIsOpenCreate} = useBoolean()
    const {value: isOpenEdit, setValue: setIsOpenEdit} = useBoolean()
    const [specializeEdit,setSpecializeEdit] = useState<Specialize|null>(null)
    const initialize = async () => {
        const data = await getAll();
        setSpecializes(data)
    }
    useEffect(() => {
        initialize().then()
    }, [])
    const removeSpecializeHandler = async (id: number) => {
        const isDel = confirm("Bạn có chắc chắn muốn xóa hay không?")
        if (isDel) {
            await remove(id, async () => {
                await initialize()
                toast.success("Xóa thành công")
            }, (error) => {
                toast.error(error)
            })
        }
    }
    return <Fragment>
        <HeadUtil
            title={"Quản lý chuyên ngành"}
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
                                setIsOpenCreate(true)
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Thêm chuyên ngành
                        </button>
                        <button
                            onClick={async () => {
                                await initialize()
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
                        <th className="border border-gray-200 px-4 py-2 text-left">ID chuyên ngành</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Tên</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Slug</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Mô tả</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Thời gian tạo</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <LoopUtil
                        data={specializes}
                        render={specialize => {
                            console.log(specialize)
                            return <tr className="hover:bg-gray-50 shadow">
                                <td className="border border-gray-200 px-4 py-2">
                                    <span className={"font-semibold"}>{specialize.id}</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">{specialize.name}</td>
                                <td className="border border-gray-200 px-4 py-2">{specialize.slug}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {specialize.description}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">{specialize.createdAt}</td>
                                <td className="border border-gray-200 px-4 py-2 flex flex-col md:flex-row items-center w-full gap-2">
                                    <button
                                        onClick={()=>{setSpecializeEdit(specialize);setIsOpenEdit(true)}}
                                        className=" w-full  rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                        type="button">
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await removeSpecializeHandler(specialize.id)
                                        }}
                                        className="w-full  rounded-md bg-red-600 hover:bg-red-700 py-2 px-4 border border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
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
        <CreateSpecializeDialog isOpen={isOpenCreate} setOpen={setIsOpenCreate}/>
        {specializeEdit && <UpdateSpecializeDialog isOpen={isOpenEdit} setOpen={setIsOpenEdit} specialize={specializeEdit}/>}
    </Fragment>
}
export default AdminSpecializePage
