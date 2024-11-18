import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import useService from "@/hooks/useService.hook.tsx";
import {useAuth} from "@/hooks";
import toast from "react-hot-toast";

export interface CreateServiceFormData {
    name: string;
    price: number;
    description: string;
    pointReward: number;
}

interface ICreateServiceDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const CreateServiceDialog: FC<ICreateServiceDialogProps> = ({isOpen, setOpen}) => {
    const {newService} = useService()!;
    const {accessToken} = useAuth()!
    const {register, handleSubmit, formState: {errors}} = useForm<CreateServiceFormData>();

    const onSubmit: SubmitHandler<CreateServiceFormData> = async (data) => {
        await newService(data, accessToken, () => {
            toast.success("Thêm dịch vụ thành công")
            setOpen(false)
        }, (message) => {
            toast.error(message)
        })
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>Thêm mới dịch vụ</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg  md:max-w-2xl lg:max-w-4xl"
                    >
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', {required: 'Yêu cầu tên dịch vụ'})}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                                )}
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Giá
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    step="0.01"
                                    {...register('price', {required: 'Yêu cầu giá'})}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.price && (
                                    <span className="text-red-500 text-sm">{errors.price.message}</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Mô tả
                            </label>
                            <textarea
                                id="description"
                                {...register('description', {required: 'Yêu cầu mô tả'})}
                                rows={4}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.description && (
                                <span className="text-red-500 text-sm">{errors.description.message}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="pointReward" className="block text-sm font-medium text-gray-700">
                                Điểm thưởng khi hoàn thành
                            </label>
                            <input
                                type="number"
                                id="pointReward"
                                {...register('pointReward', {required: 'Yêu cầu điểm thưởng khi hoàn thành', min: 0})}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.pointReward && (
                                <span className="text-red-500 text-sm">{errors.pointReward.message}</span>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md
                                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default CreateServiceDialog