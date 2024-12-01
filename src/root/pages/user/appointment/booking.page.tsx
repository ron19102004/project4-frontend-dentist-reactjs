import {FC, useEffect, useState} from "react";
import useDentist from "@/hooks/useDentist.hook.tsx";
import {DentistResponse, Service} from "@/apis/models.d";
import {LoopUtil} from "@/components/utils";
import {AppointmentDateDentistCheckResponse} from "@/apis/appointment-dentist.api.ts";
import useAppointmentDentist from "@/hooks/useAppointmentDentist.hook.tsx";
import {cn} from "@/lib/cn.ts";
import useService from "@/hooks/useService.hook.tsx";
import formatCurrency from "@/components/utils/price-format.ts";
import {useAuth, useList} from "@/hooks";
import useAppointmentUser from "@/hooks/useAppointmentUser.hook.tsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function completeAppointmentDates(data: AppointmentDateDentistCheckResponse[]) {
    const filledData = [];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const formattedDate = currentDate.toISOString().split('T')[0];
        const existing =
            data.find(item => item.appointmentDate === formattedDate);
        filledData.push(
            existing ?? {appointmentDate: formattedDate, quantity: 0}
        );
    }

    return filledData;
}

const BookingPage: FC = () => {
    const [dentists, setDentists] = useState<DentistResponse[]>([])
    const {getAll: getAllDentist} = useDentist()
    const {getListDateAppointmentCheck} = useAppointmentDentist()
    const {accessToken} = useAuth()!
    const {bookingReq} = useAppointmentUser(accessToken)
    const {list: services} = useService()!
    const {list: serviceList, set: setListService, remove: removeService, add: addServiceOnList} = useList<Service>()
    const {
        list: serviceListSelected,
        remove: removeServiceSelected,
        add: addServiceSelected,
        set: setServiceSelected
    } = useList<Service>()
    const navigate = useNavigate()

    const [dentistIdSelected, setDentistIdSelected] = useState<number>(0)
    const [listDateAptmDentist, setListDateAptmDentist] = useState<AppointmentDateDentistCheckResponse[]>([])
    const [datePicked, setDatePicked] = useState<string | null>(null)
    const [appointmentNote, setAppointmentNote] = useState<string>("");


    const init = async () => {
        const dts = await getAllDentist()
        setDentists(dts)
        setListService(services)
    }
    const loadListDateAppointmentOfDentist = async () => {
        const res = await getListDateAppointmentCheck(dentistIdSelected)
        setListDateAptmDentist(completeAppointmentDates(res))
    }
    useEffect(() => {
        init().then()
    }, []);
    useEffect(() => {
        try {
            if (dentistIdSelected === 0) {
                setListDateAptmDentist([])
            } else {
                loadListDateAppointmentOfDentist().then()
            }
        } finally {
            setDatePicked(null)
            setListService(services)
            setServiceSelected([])
        }
    }, [dentistIdSelected]);
    const serviceSelectHandler = (service: Service) => {
        addServiceSelected(service)
        removeService(service.id)
    }
    const cancelServiceSelectHandler = (service: Service) => {
        addServiceOnList(service)
        removeServiceSelected(service.id)
    }
    const submitHandler = async () => {
        if (dentistIdSelected === 0) {
            toast.error("Vui lòng chọn bác sĩ")
            return
        }
        if (datePicked === null) {
            toast.error("Vui lòng chọn ngày hẹn")
            return
        }
        if (serviceListSelected.length === 0) {
            toast.error("Vui lòng chọn dịch vụ")
            return
        }
        await bookingReq({
            appointmentDate: datePicked,
            appointmentNote: appointmentNote,
            dentistId: dentistIdSelected,
            services: serviceListSelected.map(service => service.id)
        }, () => {
            toast.success("Đặt lịch hẹn thành công")
            navigate("/tai-khoan")
        }, (error) => {
            toast.error(error)
        })
    }
    return (
        <section className={"bg-gradient-to-b from-blue-100 to-white"}>
            <div className="bg-blue-800 text-white text-center py-8">
                <h1 className="text-4xl font-extrabold tracking-wider uppercase">
                    Đặt lịch hẹn
                </h1>
            </div>
            <section className="p-6 min-h-screen max-w-4xl mx-auto">
                {/* Chọn bác sĩ */}
                <div className="p-6  mx-auto bg-white rounded-lg shadow-md space-y-6">
                    {/* Tiêu đề */}
                    <h1 className="text-xl font-bold text-gray-800 text-center">
                        Chọn bác sĩ cho cuộc hẹn <span className={"text-red-500"}>(*)</span>
                    </h1>
                    <div>
                        <select
                            onChange={(e) => {
                                setDentistIdSelected(parseInt(e.target.value));
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800
                shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value={0}>
                                Vui lòng lựa chọn bác sĩ
                            </option>
                            <LoopUtil
                                data={dentists}
                                render={(dentist) => (
                                    <option value={dentist.id} key={dentist.id}>
                                        🆔 Mã: {dentist.id} | 👤 {dentist.fullName}
                                    </option>
                                )}
                            />
                        </select>
                    </div>
                </div>

                {/* Chọn ngày */}
                {listDateAptmDentist && (
                    <div className="p-6 mt-8  mx-auto bg-white rounded-lg shadow-md space-y-6">

                        <div className={"text-center"}>
                            <h2 className={cn("text-xl font-bold  text-center", {
                                "text-green-800": datePicked !== null,
                                "text-gray-800": datePicked === null
                            })}>
                                {datePicked ? <>Ngày đặt lịch</> : <>Chọn ngày để đặt lịch <span
                                    className={"text-red-500"}>(*)</span></>}
                            </h2>
                            <p className={"italic"}>
                                {datePicked ? "Nhấn để đổi ngày" : "Nhấn để chọn ngày"}
                            </p>
                        </div>
                        {datePicked && <div
                            onClick={() => {
                                setDatePicked(null)
                            }}
                            className={cn(`border-2 p-4 rounded-lg text-center transition-all duration-300 border-cyan-500 
                            bg-cyan-50 hover:bg-cyan-100 cursor-pointer `, {})}>
                            <p className="font-semibold text-gray-800 text-xl">
                                {new Date(datePicked).toLocaleDateString("vi-VN", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "numeric",
                                })}
                            </p>
                        </div>}
                        {!datePicked &&
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                <LoopUtil data={listDateAptmDentist} render={(item) => {
                                    return <div
                                        key={item.appointmentDate}
                                        className={cn(`border-2 p-4 rounded-lg text-center transition-all duration-300`, {
                                            "border-green-500 bg-green-50 hover:bg-green-100 hover:scale-150 cursor-pointer ": item.quantity < 50,
                                            "border-red-300 bg-red-100 text-red-500": item.quantity === 50,
                                        })}
                                        onClick={() => {
                                            const cf = confirm("Bạn có chắc chắn muốn đặt lịch vào  " + new Date(item.appointmentDate).toLocaleDateString("vi-VN", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "numeric",
                                            }) + " không?")
                                            if (cf) {
                                                setDatePicked(item.appointmentDate)
                                            }
                                        }}
                                    >
                                        <p className="font-semibold text-gray-800">
                                            {new Date(item.appointmentDate).toLocaleDateString("vi-VN", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "numeric",
                                            })}
                                        </p>
                                        <p className="text-sm">
                                            Đã đặt:{" "}
                                            <span
                                                className={cn(`font-bold`, {
                                                    "text-blue-600": item.quantity > 0,
                                                    "text-red-500": item.quantity === 50
                                                })}
                                            >
                                            {item.quantity}/50
                                        </span>
                                        </p>
                                    </div>
                                }}/>
                            </div>}
                    </div>
                )}
                <div className="p-6 mt-8  mx-auto bg-white rounded-lg shadow-md space-y-6">
                    <div className={"text-center"}>
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            Chọn dịch vụ <span className={"text-red-500"}>(*)</span>
                        </h2>
                        <p className={"italic"}>
                            Nhấn để chọn dịch vụ
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <LoopUtil data={serviceList} render={(item) => {
                            return <div
                                key={item.id}
                                className={cn(`cursor-pointer border-2 p-4 rounded-lg text-center transition-all duration-300 
                                 border-blue-500 bg-blue-50 hover:bg-blue-100 hover:scale-150`)}
                                onClick={() => serviceSelectHandler(item)}
                            >
                                <p className="font-semibold text-gray-800">
                                    Mã dịch vụ: #{item.id}
                                </p>
                                <p className="text-sm">
                                    Tên:{" "}
                                    <span className={cn(`font-bold  text-blue-600`)}>
                                        {item.name}
                                    </span>
                                </p>
                                <p className="text-sm">
                                    Giá:{" "}
                                    <span className={cn(`font-bold  text-blue-600`)}>
                                        {formatCurrency(item.price)}
                                    </span>
                                </p>
                            </div>
                        }}/>
                    </div>
                </div>
                <div className="p-6 mt-8  mx-auto bg-white rounded-lg shadow-md space-y-6">
                    <div className={"text-center"}>
                        <h2 className="text-xl font-bold text-green-800 text-center">
                            Dịch vụ đã chọn
                        </h2>
                        <p className={"italic"}>
                            Nhấn để hủy chọn dịch vụ
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <LoopUtil data={serviceListSelected} render={(item) => {
                            return <div
                                key={item.id}
                                className={cn(`cursor-pointer border-2 p-4 rounded-lg text-center transition-all duration-300 
                                 border-yellow-500 bg-yellow-50 hover:bg-yellow-100 hover:scale-150`)}
                                onClick={() => cancelServiceSelectHandler(item)}
                            >
                                <p className="font-semibold text-gray-800">
                                    Mã dịch vụ: #{item.id}
                                </p>
                                <p className="text-sm">
                                    Tên:{" "}
                                    <span className={cn(`font-bold  text-blue-600`)}>
                                        {item.name}
                                    </span>
                                </p>
                                <p className="text-sm">
                                    Giá:{" "}
                                    <span className={cn(`font-bold  text-blue-600`)}>
                                        {formatCurrency(item.price)}
                                    </span>
                                </p>
                            </div>
                        }}/>
                    </div>
                </div>
                <div className="p-6 mt-8  mx-auto bg-white rounded-lg shadow-md space-y-6">
                    <div className={"text-center"}>
                        <h2 className="text-xl font-bold text-green-800 text-center">
                            Ghi chú
                        </h2>
                        <p className={"italic"}>
                            Nhập ghi chú cho cuộc hẹn
                        </p>
                    </div>
                    <div>
                    <textarea
                        placeholder="Nhập ghi chú cho cuộc hẹn..."
                        maxLength={500}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800
                        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        resize-none"
                        onChange={(e) => {
                            setAppointmentNote(e.target.value);
                        }}
                    ></textarea>
                        {/* Bộ đếm ký tự */}
                        <p className="text-right text-sm text-gray-500 mt-2">
                            {appointmentNote?.length || 0}/500 ký tự
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={submitHandler}
                    className="px-6 py-3 mt-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md
                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                        transition-all duration-300 w-full"
                >
                    Xác nhận đặt lịch
                </button>
            </section>
        </section>
    )
}
export default BookingPage