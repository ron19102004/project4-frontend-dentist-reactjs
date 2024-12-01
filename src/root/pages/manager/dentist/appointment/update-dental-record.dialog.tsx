import {FC, useEffect} from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {MyBookingData} from "@/apis/models.d";
import {UpdateDentalRecordRequest} from "@/apis/appointment-dentist.api.ts";
import {useForm} from "react-hook-form";
import {useAuth} from "@/hooks";
import useAppointmentDentist from "@/hooks/useAppointmentDentist.hook.tsx";
import toast from "react-hot-toast";

interface IUpdateDentalRecordDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    myBooking: MyBookingData
}

const UpdateDentalRecordDialog: FC<IUpdateDentalRecordDialogProps> = ({isOpen, setOpen, myBooking}) => {
    const {accessToken} = useAuth()!
    const {updateDentalRecord} = useAppointmentDentist(accessToken)
    const {register, handleSubmit} = useForm<UpdateDentalRecordRequest>({
        defaultValues: {
            diagnosis: myBooking.dentalRecord?.diagnosis,
            treatment: myBooking.dentalRecord?.treatment,
            notes: myBooking.dentalRecord?.notes,
        }
    });
    const onSubmit = async (data: UpdateDentalRecordRequest) => {
        await updateDentalRecord(myBooking.appointment.id, data, () => {
            toast.success("Cập nhật thành công");
            setOpen(false)
        }, (message) => {
            toast.error(message);
        })
    };
    useEffect(() => {
    }, [isOpen]);
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                        Cập Nhật Hồ Sơ Điều Trị #{myBooking.appointment.id}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Diagnosis Field */}
                        <div className="mb-4">
                            <label htmlFor="diagnosis" className="block text-gray-700 font-medium mb-2">
                                Chẩn đoán
                            </label>
                            <textarea
                                id="diagnosis"
                                {...register("diagnosis")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                rows={4}
                            ></textarea>
                        </div>

                        {/* Treatment Field */}
                        <div className="mb-4">
                            <label htmlFor="treatment" className="block text-gray-700 font-medium mb-2">
                                Phương pháp điều trị
                            </label>
                            <textarea
                                id="treatment"
                                {...register("treatment")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                rows={4}
                            ></textarea>
                        </div>

                        {/* Notes Field */}
                        <div className="mb-4">
                            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                                Ghi chú
                            </label>
                            <textarea
                                id="notes"
                                {...register("notes")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                rows={4}
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </React.Fragment>
    )
}
export default UpdateDentalRecordDialog;