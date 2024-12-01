import {FC, Fragment, useEffect, useState} from "react";
import {useAuth, useBoolean} from "@/hooks";
import useAppointmentDentist from "@/hooks/useAppointmentDentist.hook.tsx";
import {AppointmentStatus, MyBookingData} from "@/apis/models.d";
import HeadUtil from "../../../../../components/utils/head.util.tsx";
import toast from "react-hot-toast";
import {LoopUtil} from "@/components/utils";
import UpdateDentalRecordDialog from "@/root/pages/manager/dentist/appointment/update-dental-record.dialog.tsx";

function getDateCurrent() {
    const now = new Date()
    return now.toISOString().split('T')[0];
}

const AppointmentTodayPage: FC = () => {
    const {accessToken} = useAuth()!
    const {getAllAppointmentInDate,changeStatusAppointment} = useAppointmentDentist(accessToken)
    // const [appointments, setAppointments] = useState<AppointmentForDentist | null>(null)
    const [bookings, setBookings] = useState<MyBookingData[]>([])

    const [bookingEditCurrent, setBookingEditCurrent] = useState<MyBookingData|null>(null)
    const {value:openEdit,setValue:setOpenEdit}= useBoolean()

    const init = async (date: string) => {
        const _appointments = await getAllAppointmentInDate(date, AppointmentStatus.SCHEDULED)
        if (_appointments) {
            // setAppointments(_appointments)
            setBookings(_appointments.appointments)
        }
    }
    useEffect(() => {
        init(getDateCurrent()).then()
    }, []);
    const cancelAppointment = async (aptId:number) =>{
        const cf = confirm("Bạn có chắc muốn xác nhận yêu cầu với ID:"+ aptId+" không?");
        if (cf){
            await changeStatusAppointment(aptId,AppointmentStatus.CANCELLED, () => {
                init(getDateCurrent()).then()
                toast.success("Xác nhận thành công")
            },(message) => {
                toast.error(message)
            })
        }
    }
    const finishAppointment = async (aptId:number) =>{
        const cf = confirm("Bạn có chắc muốn xác nhận yêu cầu với ID:"+ aptId+" không?");
        if (cf){
            await changeStatusAppointment(aptId,AppointmentStatus.COMPLETED, () => {
                init(getDateCurrent()).then()
                toast.success("Xác nhận thành công")
            },(message) => {
                toast.error(message)
            })
        }
    }
    return (
        <Fragment>
            <HeadUtil
                title={"Lịch hẹn hôm nay"}
                author={""}
                urlImage={""}
                urlPageCurrent={""}
            />
            <section className={"max-w-screen px-4 pt-2 py-6"}>
                <div className="flex items-center justify-between py-4 text-white">
                    <div className="flex items-center md:justify-between md:space-x-4 w-full gap-2">
                        <div className={"flex flex-row gap-2 w-full"}>
                            <button
                                onClick={async () => {
                                    await init(getDateCurrent())
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
                            <th className="border border-gray-200 px-4 py-2 text-left">Mã hẹn</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Tên khách hàng</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Số điện thoại</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Ghi chú</th>
                            <th className="border border-gray-200 px-4 py-2 text-left">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        <LoopUtil
                            data={bookings}
                            render={booking => {
                                return <tr className="hover:bg-gray-50 shadow">
                                    <td className="border border-gray-200 px-4 py-2">
                                        <span className={"font-semibold"}>{booking.appointment.id}</span>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.user.fullName}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        <a href={"https://zalo.me/" + booking.user.phoneNumber} target={"_blank"}
                                           className={"underline hover:text-blue-600"}>{booking.user.phoneNumber}</a>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.user.email}</td>
                                    <td className="border border-gray-200 p-4">
                                        <textarea
                                            cols={50}
                                            className="w-full min-w-96 p-4 rounded-xl h-28 outline-none bg-gray-50 border border-gray-300
                                                       text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                                       transition-all duration-300 resize-none"
                                            disabled
                                        >
                                            {booking.appointment.notes}
                                        </textarea>
                                    </td>

                                    <td className="px-4 py-2 grid grid-cols-2 gap-2 min-w-96">
                                        <a target={"_blank"} href={"/ho-so/" + booking.appointment.id}
                                              className="w-full  rounded-md bg-green-600 hover:bg-green-700 py-2 px-4 border
                                             border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                              type="button">
                                            Xem chi tiết
                                        </a>
                                        <button
                                            onClick={()=>{
                                                setBookingEditCurrent(booking)
                                                setOpenEdit(true)
                                            }}
                                            className="w-full  rounded-md bg-yellow-600 hover:bg-yellow-700 py-2 px-4 border
                                             border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                            type="button">
                                            Cập nhật bệnh án
                                        </button>
                                        <button
                                            onClick={async ()=>{
                                                await finishAppointment(booking.appointment.id)
                                            }}
                                            className="w-full  rounded-md bg-blue-600 hover:bg-blue-700 py-2 px-4 border
                                             border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                            type="button">
                                            Xác nhận hoàn thành
                                        </button>
                                        <button
                                            onClick={async ()=>{
                                                await cancelAppointment(booking.appointment.id)
                                            }}
                                            className="w-full  rounded-md bg-red-600 hover:bg-red-700 py-2 px-4 border
                                             border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                            type="button">
                                            Xác nhận hủy
                                        </button>

                                    </td>
                                </tr>
                            }}
                        />
                        </tbody>
                    </table>
                </div>
            </section>
            {bookingEditCurrent && <UpdateDentalRecordDialog isOpen={openEdit} setOpen={setOpenEdit} myBooking={bookingEditCurrent}/>}
        </Fragment>
    )
}
export default AppointmentTodayPage;