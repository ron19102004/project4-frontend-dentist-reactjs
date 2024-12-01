import {AppointmentStatus, InvoiceStatus, MyBookingData} from "@/apis/models.d";
import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import dateFormat from "@/components/utils/date-format.ts";
import {LoopUtil} from "@/components/utils";
import {cn} from "@/lib/cn.ts";
import {Link} from "react-router-dom";
import formatCurrency from "@/components/utils/price-format.ts";
import {useAuth, useBoolean} from "@/hooks";
import useAppointmentUser from "@/hooks/useAppointmentUser.hook.tsx";
import toast from "react-hot-toast";


interface MyBookingDialogProps {
    myBookingData: MyBookingData;
    isOpen: boolean;
    setOpen: (value: boolean) => void;
}


const MyBookingDialog: React.FC<MyBookingDialogProps> = ({myBookingData, isOpen, setOpen}) => {
    const {accessToken} = useAuth()!
    const {addRewardIntoAppointment} = useAppointmentUser(accessToken)
    const {value: openAddRewardHistory, setValue: setOpenAddRewardHistory} = useBoolean()
    const [transactionRewardCode, setTransactionRewardCode] = useState<number>(1)
    useEffect(() => {
        setTransactionRewardCode(1)
        setOpenAddRewardHistory(false)
    }, [myBookingData]);
    const handleClose = () => {
        setOpen(false);
    };
    const addRewardHistory = async () => {
        if (transactionRewardCode === 1) {
            toast.error("Mã giao dịch không hợp lệ");
            return
        }
        await addRewardIntoAppointment(
            myBookingData.appointment.id,
            transactionRewardCode, () => {
                toast.success("Thêm thành công. Vui lòng tải lại trang")
                setOpenAddRewardHistory(false)
            }, (message) => {
                toast.error(message)
            })
    }
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth>
            <DialogTitle className="text-lg font-semibold text-gray-800 flex justify-between items-center border-b-2">
                <div className={"font-semibold"}>
                    <i className="fas fa-file-invoice text-blue-600 mr-2"></i>
                    Chi tiết đặt lịch #{myBookingData.appointment.id}
                </div>
                {!myBookingData.invoice.rewardHistory && <div>
                    <button
                        onClick={()=>{
                            setOpenAddRewardHistory(true)
                        }}
                        className={"text-sm bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-2 rounded font-bold"}>Thêm
                        phần thưởng
                    </button>
                </div>}
                {myBookingData.invoice.rewardHistory && <h1 className={"text-sm font-semibold underline"}>Đã quy đổi quà với mã: {myBookingData.invoice.rewardHistory.id}</h1>}
            </DialogTitle>
            <DialogContent className="space-y-6">
                {openAddRewardHistory && <section className="my-4 border px-4 py-2">
                <label htmlFor="transactionCode" className="block text-sm font-medium text-gray-700 mb-2">
                        Nhập mã giao dịch phần thưởng
                    </label>
                    <input
                        onChange={(e) => {
                            setTransactionRewardCode(parseInt(e.target.value))
                        }}
                        type="number"
                        id="transactionCode"
                        name="transactionCode"
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 shadow-sm text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-all duration-300"
                        placeholder="Nhập mã"
                    />
                    <div className={"flex justify-end items-center mt-2"}>
                        <button onClick={addRewardHistory}
                                className={"border border-green-300 bg-green-200 text-green-800 font-bold " +
                                    "hover:bg-green-300 px-2 py-1"}>Thực hiện
                        </button>
                    </div>
                </section>}
                {/* Appointment Details */}
                <section className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-600">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        Thông tin cuộc hẹn
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                        <p><strong>Ngày
                            hẹn:</strong> {new Date(myBookingData.appointment.appointmentDate).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>

                        <p><strong>Trạng thái:&nbsp;</strong>
                            <span className={cn('px-2 py-1 rounded font-semibold', {
                                "bg-yellow-200 text-yellow-700": myBookingData.appointment.status === AppointmentStatus.SCHEDULED,
                                "bg-red-200 text-red-700": myBookingData.appointment.status === AppointmentStatus.CANCELLED,
                                "bg-green-200 text-green-700": myBookingData.appointment.status === AppointmentStatus.COMPLETED
                            })}>
                              {myBookingData.appointment.status === AppointmentStatus.SCHEDULED
                                  ? "Đã lên lịch"
                                  : myBookingData.appointment.status === AppointmentStatus.COMPLETED
                                      ? "Hoàn thành"
                                      : "Đã hủy"}
                        </span>
                        </p>
                        <p className="col-span-2"><strong>Ghi
                            chú:</strong> {myBookingData.appointment.notes || "Không có ghi chú"}</p>
                    </div>
                </section>

                {/* Dental Record */}
                <section>
                    <h3 className="text-lg font-semibold text-green-600">
                        <i className="fas fa-tooth mr-2"></i>
                        Hồ sơ nha khoa
                    </h3>
                    {myBookingData.dentalRecord ? (
                        <div className="grid grid-cols-2 gap-2 text-gray-700">
                            <p><strong>Ngày
                                khám:</strong> {myBookingData.dentalRecord.examinationDate.split("-").reverse().join("-")}
                            </p>
                            <p><strong>Chẩn đoán:</strong> {myBookingData.dentalRecord.diagnosis}</p>
                            <p><strong>Điều trị:</strong> {myBookingData.dentalRecord.treatment}</p>
                            <p className="col-span-2"><strong>Ghi
                                chú:</strong> {myBookingData.dentalRecord.notes || "Không có ghi chú"}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">Chưa có thông tin hồ sơ nha khoa.</p>
                    )}
                </section>

                {/* Invoice Details */}
                <section>
                    <h3 className="text-lg font-semibold text-yellow-600">
                        <i className="fas fa-file-invoice mr-2"></i>
                        Thông tin hóa đơn
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                        <p><strong>Trạng thái:&nbsp;</strong>
                            <span className={cn('px-2 py-1 rounded font-semibold', {
                                "bg-yellow-200 text-yellow-700": myBookingData.invoice.status === InvoiceStatus.PENDING,
                                "bg-red-200 text-red-700": myBookingData.invoice.status === InvoiceStatus.CANCELLED,
                                "bg-green-200 text-green-700": myBookingData.invoice.status === InvoiceStatus.PAID
                            })}>
                                 {myBookingData.invoice.status === InvoiceStatus.PENDING
                                     ? "Chưa thanh toán"
                                     : myBookingData.invoice.status === InvoiceStatus.PAID
                                         ? "Hoàn thành"
                                         : "Đã hủy"}
                        </span>
                        </p>
                        <p><strong>Số tiền gốc:</strong> {formatCurrency(myBookingData.invoice.amountOriginPaid)}
                        </p>
                    </div>
                </section>

                {/* Payment Details */}
                <section>
                    <h3 className="text-lg font-semibold text-purple-600">
                        <i className="fas fa-money-bill-wave mr-2"></i>
                        Thông tin thanh toán
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                        <p>
                            <strong>Ngày thanh
                                toán:</strong> {myBookingData.payment.paymentDate ? dateFormat(myBookingData.payment.paymentDate) : "Chưa thanh toán"}
                        </p>
                        <p><strong>Số tiền đã thanh
                            toán:</strong> {myBookingData.payment.amountPaid.toLocaleString()} VND</p>
                        <p><strong>Hình thức thanh toán:</strong> {myBookingData.payment.paymentType}</p>
                        <p><strong>Giảm giá(%):</strong> {myBookingData.payment.discountPercent ?? "Không có"}</p>
                    </div>
                </section>

                {/* Invoice Services */}
                <section>
                    <h3 className="text-lg font-semibold text-teal-600">
                        <i className="fas fa-tag mr-2"></i>
                        Dịch vụ
                    </h3>
                    {myBookingData.invoiceServices.length > 0 ? (
                        <ul className="list-decimal pl-5 text-gray-700">
                            <LoopUtil
                                data={myBookingData.invoiceServices}
                                render={(service) => {
                                    return <li key={service.id}>
                                        <strong>{service.nameServiceCurrent}</strong>: {formatCurrency(service.priceServiceCurrent)}
                                    </li>
                                }}
                            />
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">Chưa có dịch vụ nào.</p>
                    )}
                </section>

                {/* Dentist Details */}
                <section>
                    <h3 className="text-lg font-semibold text-indigo-600">
                        <i className="fas fa-user-md mr-2"></i>
                        Nha sĩ
                    </h3>
                    <p className="text-gray-700"><strong>Tên:&nbsp;</strong>
                        <Link to={"/bac-si/" + myBookingData.dentist.id}
                              className={"underline hover:text-blue-600"}>
                            {myBookingData.dentist.fullName}
                        </Link>
                    </p>
                    <p className="text-gray-700"><strong>Số điện
                        thoại:</strong>
                        <a href={"https://zalo.me/" + myBookingData.dentist.dentist.phoneNumber}
                           className={"underline hover:text-blue-600"}>{myBookingData.dentist.dentist.phoneNumber}</a>
                    </p>
                    <p className="text-gray-700"><strong>Email:</strong> {myBookingData.dentist.dentist.email}</p>
                </section>
            </DialogContent>
        </Dialog>
    );
};
export default MyBookingDialog;