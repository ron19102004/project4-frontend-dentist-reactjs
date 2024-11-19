import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAuth} from "@/hooks";
import toast from "react-hot-toast";
import { UpdateSpecializeRequest} from "@/apis/specialize.api.ts";
import useSpecialize from "@/hooks/useSpecialize.hook.tsx";
import {Specialize} from "@/apis/models";

interface IUpdateSpecializeDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    specialize:Specialize;
}

const UpdateSpecializeDialog: FC<IUpdateSpecializeDialogProps> = ({isOpen, setOpen,specialize}) => {
    const {accessToken} = useAuth()!
    const {update} = useSpecialize(accessToken)
    const {register, handleSubmit, formState: {errors},reset} = useForm<UpdateSpecializeRequest>({
        values:{
            name: specialize.name,
            description: specialize.description,
        }
    });

    const onSubmit: SubmitHandler<UpdateSpecializeRequest> = async (data) => {
        await update(data,specialize.id,async () => {
            toast.success("Cập nhật thành công")
            reset()
            setOpen(false)
        },(error) => {
            toast.error(error)
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
                <DialogTitle>Thêm mới chuyên ngành</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Tên
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register("name", {required: "Tên là bắt buộc", maxLength: 50})}
                                className={`mt-1 block w-full px-4 py-2 border ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Mô tả
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                {...register("description", {required: "Mô tả là bắt buộc"})}
                                className={`mt-1 md:w-96 block w-full px-4 py-2 border ${
                                    errors.description ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <i className="fas fa-save mr-2"></i> Lưu
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default UpdateSpecializeDialog