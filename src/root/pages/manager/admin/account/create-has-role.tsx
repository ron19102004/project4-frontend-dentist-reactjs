import * as React from 'react';
import {FC, Fragment, useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import {SubmitHandler, useForm} from "react-hook-form";
import {CheckUserExistResponse, CreateAccountantRequest, CreateDentistRequest} from "@/apis/user.api.ts";
import {useAuth} from "@/hooks";
import {cn} from "@/lib/cn.ts";
import useUser from "@/hooks/useUser.hook.tsx";
import toast from "react-hot-toast";
import {Role, Specialize} from "@/apis/models.d";
import useSpecialize from "@/hooks/useSpecialize.hook.tsx";
import {LoopUtil} from "@/components/utils";

interface ICreateAccountHasRoleDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

interface IFormInput {
    phoneNumber: string;
    email: string;
    specializeId?: number;
    description?: string;
}

const CreateAccountHasRoleDialog: FC<ICreateAccountHasRoleDialogProps> = ({isOpen, setOpen}) => {
    const {register, handleSubmit, formState: {errors,}, reset,} = useForm<IFormInput>();
    const [role, setRole] = useState<'BS' | 'TN'>('TN');  // Mặc định là Tư vấn viên (TN)
    const {accessToken} = useAuth()!
    const {checkUserExist,createDentistOrAccountant} = useUser(accessToken)
    const [userId, setUserId] = useState<number>(1)
    const {getAll} = useSpecialize()
    const [specializes, setSpecializes] = useState<Specialize[]>([])
    const [checkedUser, setCheckedUser] = useState<CheckUserExistResponse | null>(null)
    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        let req;
        if (role === "TN"){
            req = {
                email: data.email,
                phoneNumber: data.phoneNumber,
                userId: userId
            } as CreateAccountantRequest
        } else {
            req = {
                email: data.email,
                phoneNumber: data.phoneNumber,
                userId: userId,
                specializeId:data.specializeId,
                description:data.description,
            } as CreateDentistRequest
        }
        await createDentistOrAccountant(req,() => {
            toast.success("Tạo thành công")
            setOpen(false)
        },(message) => {
            toast.error(message)
        })
    };
    const checkUserHandler = async () => {
        await checkUserExist(userId, (data) => {
            setCheckedUser(data)
        }, (message) => {
            toast.error(message)
        })
    }
    const initialize = async () => {
        reset()
        setCheckedUser(null)
        setUserId(1)
        const res = await getAll();
        setSpecializes(res)
    }
    useEffect(() => {
        initialize().then()
    }, [isOpen]);
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6 p-6 bg-white rounded-lg shadow-lg mx-auto max-w-4xl">

                    {/* Vai trò */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">Chọn Vai Trò</label>
                        <select
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none
                            focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            value={role}
                            onChange={(e) => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                setRole(e.target.value)
                            }}
                        >
                            <option value="TN">Thu Ngân</option>
                            <option value="BS">Bác Sĩ</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">Mã số tài khoản</label>
                        <div className={"w-full md:flex md:items-center md:gap-2"}>
                            <input
                                disabled={!!(checkedUser && checkedUser.exist && checkedUser.role === Role.PATIENT)}
                                type="number"
                                value={userId}
                                className={cn("mt-2 p-3 w-full  border border-gray-300 rounded-lg focus:outline-none " +
                                    "focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50", {
                                    "md:w-fit": (!checkedUser || !checkedUser.exist || checkedUser.role !== Role.PATIENT)
                                })}
                                placeholder="Nhập mã số tài khoản"
                                onChange={(e) => {
                                    const val = parseInt(e.target.value)
                                    if (val <= 0) {
                                        toast.error("Mã người dùng không có số âm")
                                        setUserId(1)
                                        return
                                    }
                                    setUserId(val)
                                }}
                            />
                            {(!checkedUser || !checkedUser.exist || checkedUser.role !== Role.PATIENT) && <button
                                onClick={checkUserHandler}
                                className="rounded-md mt-2 w-full md:w-fit bg-red-600 py-3 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                Xác thực
                            </button>}
                        </div>
                        {(checkedUser && checkedUser.role && checkedUser.role !== Role.PATIENT) &&
                            <p className="text-red-500 text-xs mt-1">Tài khoản này đã có quyền trong hệ thống</p>}
                        {(checkedUser && !checkedUser.exist) &&
                            <p className="text-red-500 text-xs mt-1">Tài khoản này không tồn tại</p>}
                    </div>
                    {(checkedUser && checkedUser.role === Role.PATIENT) && <Fragment>
                        <div className={"border px-4 pb-4 pt-2 rounded-lg shadow-lg max-w-4xl"}>
                            <h1 className={"font-semibold underline"}>Thông tin cơ bản tài khoản</h1>
                            <ul className={"grid grid-cols-1 md:grid-cols-2 gap-2 pt-2"}>
                                <li>
                                    <span className={"font-semibold"}>Tên đầy đủ: </span>
                                    <span className={"break-all"}>{checkedUser.fullName}</span>
                                </li>
                                <li>
                                    <span className={"font-semibold"}>Tài khoản: </span>
                                    <span className={"break-all"}>{checkedUser.username}</span>
                                </li>
                                <li>
                                    <span className={"font-semibold"}>Email: </span>
                                    <span className={"break-all"}>
                                        <a href={`mailto:${checkedUser.email}`}>{checkedUser.email}</a>
                                    </span>
                                </li>
                                <li>
                                    <span className={"font-semibold"}>Số điện thoại: </span>
                                    <span className={"break-all"}>
                                        <a href={`tel:+${checkedUser.phone}`}>{checkedUser.phone}</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700">Số Điện Thoại</label>
                            <input
                                type="tel"
                                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                placeholder="Nhập số điện thoại"
                                {...register('phoneNumber', {required: 'Số điện thoại là bắt buộc'})}
                            />
                            {errors.phoneNumber &&
                                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                placeholder="Nhập email"
                                {...register('email', {required: 'Email là bắt buộc'})}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {role === 'BS' && (
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700">Chuyên Môn</label>
                                <select
                                    className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                    {...register('specializeId', {required: 'Chuyên môn là bắt buộc đối với BS'})}
                                >
                                    <LoopUtil data={specializes}
                                              render={item =>
                                                  <option value={item.id}>{item.name}</option>}/>
                                </select>
                                {errors.specializeId &&
                                    <p className="text-red-500 text-xs mt-1">{errors.specializeId.message}</p>}
                            </div>
                        )}

                        {role === 'BS' && (
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700">Mô Tả</label>
                                <textarea
                                    className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                    rows={4}
                                    placeholder="Nhập mô tả về bản thân hoặc công việc của bạn"
                                    {...register('description', {required: 'Mô tả là bắt buộc đối với BS'})}
                                ></textarea>
                                {errors.description &&
                                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>
                        )}

                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
                            >
                                Đăng Ký
                            </button>
                        </div>
                    </Fragment>}
                </form>
            </Dialog>
        </React.Fragment>
    );
}
export default CreateAccountHasRoleDialog