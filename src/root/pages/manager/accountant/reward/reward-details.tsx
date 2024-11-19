import * as React from 'react';
import {FC} from 'react';
import Dialog from '@mui/material/Dialog';
import {Reward} from "@/apis/models.d";
import {useBoolean} from "@/hooks";

interface IRewardDetailsDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    reward: Reward
}

const RewardDetailsDialog: FC<IRewardDetailsDialogProps> = ({isOpen, setOpen, reward}) => {
    const {value: isOpenEdit, setValue: setOpenEdit} = useBoolean()
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
                    {/* Header: Poster or default image */}
                    {!isOpenEdit ? <div>
                        <div className="flex justify-center">
                            {reward.poster ? (
                                <img
                                    src={reward.poster}
                                    alt="Reward Poster"
                                    className="w-full md:w-96 h-48 object-cover rounded-md"
                                />
                            ) : (
                                <div
                                    className="w-full md:w-96 h-48 bg-gray-300 flex items-center justify-center rounded-md text-gray-500">
                                    Không có hình ảnh
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-lg font-semibold text-gray-800">
                                {reward.content}
                            </p>
                            <p className="text-sm text-gray-600">Điểm: {reward.points}</p>
                            <p className="text-xs text-gray-500">Ngày
                                tạo: {new Date(reward.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                        <span
                            className={`text-xs font-semibold py-2 px-2 rounded-full ${
                                reward.isOpened ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}
                        >
                          {reward.isOpened ? 'Mở' : 'Chưa mở'}
                        </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">ID: {reward.id}</span>
                        </div>
                    </div> : <div>edit</div>}
                    <hr/>
                    <div className={"flex flex-row justify-end items-center gap-2"}>
                        {isOpenEdit ? <>
                            <button
                                onClick={()=>{
                                    setOpenEdit(false);
                                }}
                                className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700
                             focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Lưu
                            </button>
                        </> : <button
                            onClick={() => {
                                setOpenEdit(true)
                            }}
                            className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Chỉnh sửa
                        </button>}
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    );
}
export default RewardDetailsDialog