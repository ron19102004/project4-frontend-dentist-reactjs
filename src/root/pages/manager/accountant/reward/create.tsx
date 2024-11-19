import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAuth} from "@/hooks";
import {CreateRewardRequest} from "@/apis/reward.api.tsx";
import useReward from "@/hooks/useReward.hook.tsx";
import toast from "react-hot-toast";

interface ICreateRewardDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const CreateRewardDialog: FC<ICreateRewardDialogProps> = ({isOpen, setOpen}) => {
    const {accessToken} = useAuth()!
    const {create} = useReward(accessToken)
    const {register, handleSubmit, formState: {errors},reset} = useForm<CreateRewardRequest>();

    const onSubmit: SubmitHandler<CreateRewardRequest> = async (data) => {
        await create(data,() => {
            toast.success("Thêm phần thưởng thành công");
            setOpen(false);
            reset()
        },(error) => {
            toast.error(error);
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
                <DialogTitle>Thêm mới phần thưởng</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="points" className="block text-sm font-medium text-gray-700">
                                Điểm
                            </label>
                            <input
                                id="points"
                                type="number"
                                {...register('points', {
                                    required: 'Điểm là bắt buộc',
                                    min: {value: 1, message: 'Điểm phải lớn hơn 1'},
                                })}
                                className="mt-1 block w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.points && (
                                <span className="text-red-500 text-sm">{errors.points.message}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Nội Dung
                            </label>
                            <textarea
                                id="content"
                                {...register('content', {required: 'Nội dung là bắt buộc'})}
                                rows={5}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.content && (
                                <span className="text-red-500 text-sm">{errors.content.message}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
                                Đường dẫn hình ảnh
                            </label>
                            <input
                                placeholder={"https://drive.google.com/file/d/1ojlIQ1R8e6LY1K09ogo4lOQ255vfuCP9/view?usp=drive_link"}
                                id="poster"
                                type="text"
                                {...register('poster', {
                                    required: 'Đường dẫn là bắt buộc',
                                })}
                                className="mt-1 block w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.poster && (
                                <span className="text-red-500 text-sm">{errors.poster.message}</span>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Thêm Phần Thưởng
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default CreateRewardDialog