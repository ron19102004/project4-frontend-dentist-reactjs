import{FC, Fragment, useEffect, useState} from "react";
import {AppointmentStatus, Gender, InvoiceStatus, MyBookingData} from "@/apis/models.d";
import {useAuth, useBoolean} from "@/hooks";
import useAppointmentDentist from "@/hooks/useAppointmentDentist.hook.tsx";
import {useParams} from "react-router-dom";
import LoadingCircle from "@/components/ui/loading-circle.ui.tsx";
import HeadUtil from "../../../../../components/utils/head.util.tsx";
import {LoopUtil} from "@/components/utils";
import dateFormat from "@/components/utils/date-format.ts";

const AppointmentDetailsPage: FC = () => {
    const {accessToken} = useAuth()!
    const {getAppointmentById} = useAppointmentDentist(accessToken)
    const [bookingData, setBookingData] = useState<MyBookingData | null>(null)
    const {value: fetching, setValue: setFetching} = useBoolean(true)
    const {id} = useParams()
    const init = async () => {
        try {
            setFetching(true)
            if (id) {
                const res = await getAppointmentById(parseInt(id))
                setBookingData(res)
            }
        } finally {
            setFetching(false)
        }
    }
    useEffect(() => {
        init().then()
    }, []);
    return (
        <Fragment>
            {fetching && <LoadingCircle/>}
            {(bookingData && !fetching) &&
                <Fragment>
                    <HeadUtil
                        title={"BN:" + bookingData.user.id + "|" + bookingData.user.fullName}
                        author={""}
                        urlImage={""}
                        urlPageCurrent={""}
                    />
                    <section className={"bg-gray-400 min-w-screen min-h-screen p-6"}>
                        <div
                            className="max-w-5xl mx-auto px-4 py-6 bg-white rounded-lg">
                            <h1 className="text-2xl font-bold text-center mb-6 text-blue-700 ">Thông Tin Hồ Sơ</h1>
                            <section className="mb-6 border-b-2 border-blue-300 pb-4">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Người Dùng</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong className="text-blue-800">Họ và tên:</strong> {bookingData.user.fullName}
                                    </p>
                                    <p><strong className="text-blue-800">Email:</strong> {bookingData.user.email}</p>
                                    <p><strong className="text-blue-800">Điện
                                        thoại:</strong> <a href={"https://zalo.me/" + bookingData.user.phoneNumber} target={"_blank"}
                                           className={"hover:underline hover:text-blue-600"}>{bookingData.user.phoneNumber}</a>
                                    </p>
                                    <p><strong className="text-blue-800">Địa chỉ:</strong> {bookingData.user.address}
                                    </p>
                                    <p><strong className="text-blue-800">Giới
                                        tính:</strong> {bookingData.user.gender === Gender.MALE ? "Nam" : "Nữ"}
                                    </p>
                                </div>
                            </section>

                            <section className="mb-6 border-b-2 border-blue-300 pb-4">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Cuộc Hẹn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong className="text-blue-800">Ngày
                                        tạo:</strong> {dateFormat(bookingData.appointment.createdAt)}
                                    </p>
                                    <p><strong className="text-blue-800">Ngày
                                        hẹn:</strong> {bookingData.appointment.appointmentDate.split("-").reverse().join("-")}
                                    </p>
                                    <p><strong className="text-blue-800">Trạng
                                        thái:</strong> {bookingData.appointment.status === AppointmentStatus.SCHEDULED
                                        ? "Đã lên lịch"
                                        : bookingData.appointment.status === AppointmentStatus.COMPLETED
                                            ? "Hoàn thành"
                                            : "Đã hủy"}
                                    </p>
                                    <p><strong className="text-blue-800">Ghi
                                        chú:</strong> {bookingData.appointment.notes}
                                    </p>
                                </div>
                            </section>

                            <section className="mb-6 border-b-2 border-blue-300 pb-4">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Hóa Đơn</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong className="text-blue-800">Số
                                        tiền:</strong> {bookingData.invoice.amountOriginPaid}</p>
                                    <p><strong className="text-blue-800">Trạng
                                        thái:</strong> {bookingData.invoice.status === InvoiceStatus.PENDING
                                        ? "Chưa thanh toán"
                                        : bookingData.invoice.status === InvoiceStatus.PAID
                                            ? "Hoàn thành"
                                            : "Đã hủy"}
                                    </p>
                                    <p><strong className="text-blue-800">Ngày
                                        tạo:</strong> {dateFormat(bookingData.invoice.createdAt)}
                                    </p>
                                </div>
                            </section>

                            <section className="mb-6 border-b-2 border-blue-300 pb-4">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Thanh Toán</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong className="text-blue-800">Ngày thanh
                                        toán:</strong> {bookingData.payment.paymentDate}</p>
                                    <p><strong className="text-blue-800">Số tiền thanh
                                        toán:</strong> {bookingData.payment.amountPaid}</p>
                                    <p><strong className="text-blue-800">Loại thanh
                                        toán:</strong> {bookingData.payment.paymentType}</p>
                                    <p><strong className="text-blue-800">Giảm giá(%):</strong> {bookingData.payment.discountPercent}</p>
                                </div>
                            </section>

                            <section className="mb-6 border-b-2 border-blue-300 pb-4">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Bác Sĩ</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong className="text-blue-800">Tên bác
                                        sĩ:</strong> {bookingData.dentist.fullName}
                                    </p>
                                    <p><strong className="text-blue-800">Chuyên
                                        khoa:</strong> {bookingData.dentist.dentist.specialize.name}</p>
                                    <p><strong
                                        className="text-blue-800">Email:</strong> {bookingData.dentist.dentist.email}
                                    </p>
                                    <p><strong className="text-blue-800">Điện
                                        thoại:</strong> {bookingData.dentist.dentist.phoneNumber}</p>
                                </div>
                            </section>

                            <section className="mb-6 border-b-2 border-blue-300 pb-4">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Hồ Sơ Điều Trị</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong className="text-blue-800">Ngày
                                        khám:</strong> {bookingData.dentalRecord?.examinationDate}</p>
                                    <p><strong className="text-blue-800">Chẩn
                                        đoán:</strong> {bookingData.dentalRecord?.diagnosis}</p>
                                    <p><strong className="text-blue-800">Phương pháp điều
                                        trị:</strong> {bookingData.dentalRecord?.treatment}</p>
                                    <p><strong className="text-blue-800">Ghi
                                        chú:</strong> {bookingData.dentalRecord?.notes}
                                    </p>
                                </div>
                            </section>

                            <section className="mb-6 border-b-2 border-blue-300 pb-4">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Dịch Vụ Hóa Đơn</h2>
                                <div className="space-y-4">
                                    <LoopUtil
                                        data={bookingData.invoiceServices}
                                        render={(service, index) => <div key={index}
                                                                         className="border-l-4 border-blue-500 p-4 bg-gray-50 rounded-md">
                                            <p><strong className="text-blue-800">Dịch
                                                vụ:</strong> {service.nameServiceCurrent}
                                            </p>
                                            <p><strong
                                                className="text-blue-800">Giá:</strong> {service.priceServiceCurrent}
                                            </p>
                                            <p><strong className="text-blue-800">Điểm
                                                thưởng:</strong> {service.pointRewardCurrent}</p>
                                        </div>}
                                    />
                                </div>
                            </section>

                            <section className="mb-6">
                                <h2 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Kế Toán</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <p><strong className="text-blue-800">Email:</strong> {bookingData.accountant?.email}
                                    </p>
                                    <p><strong className="text-blue-800">Điện
                                        thoại:</strong> {bookingData.accountant?.phoneNumber}</p>
                                </div>
                            </section>
                        </div>
                    </section>
                </Fragment>
            }
        </Fragment>
    );
};
export default AppointmentDetailsPage