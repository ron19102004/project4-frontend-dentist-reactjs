import * as React from 'react';
import {FC, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateAccountantRequest, CreateDentistRequest} from "@/apis/user.api.ts";

interface ICreateAccountHasRoleDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

interface IFormInput {
    "userId": number,
    phoneNumber: string;
    email: string;
    specializeId?: number;
    description?: string;
}

const CreateAccountHasRoleDialog: FC<ICreateAccountHasRoleDialogProps> = ({isOpen, setOpen}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();
    const [role, setRole] = useState<'BS' | 'TN'>('TN');  // Mặc định là Tư vấn viên (TN)
    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
    };
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto md:w-96">

                    {/* Vai trò */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700">Chọn Vai Trò</label>
                        <select
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
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
                        <input
                            type="number"
                            className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            placeholder="Nhập mã số tài khoản"
                            {...register('userId', {required: 'Mã số tài khoản là bắt buộc'})}
                        />
                        {errors.userId &&
                            <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
                    </div>
                    {/* Số Điện Thoại */}
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

                    {/* Chuyên Môn - Chỉ hiển thị khi chọn Bác Sĩ */}
                    {role === 'BS' && (
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700">Chuyên Môn</label>
                            <select
                                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                {...register('specializeId', {required: 'Chuyên môn là bắt buộc đối với BS'})}
                            >
                                <option value={0}>Chọn Chuyên Môn</option>
                                <option value={1}>Chuyên Môn 1</option>
                                <option value={2}>Chuyên Môn 2</option>
                                <option value={3}>Chuyên Môn 3</option>
                            </select>
                            {errors.specializeId &&
                                <p className="text-red-500 text-xs mt-1">{errors.specializeId.message}</p>}
                        </div>
                    )}

                    {/* Mô Tả - Chỉ hiển thị khi chọn Bác Sĩ */}
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

                    {/* Nút Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
                        >
                            Đăng Ký
                        </button>
                    </div>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
export default CreateAccountHasRoleDialog