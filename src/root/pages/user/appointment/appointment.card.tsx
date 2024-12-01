import {Appointment, AppointmentStatus, MyBookingData} from "@/apis/models.d";
import React, {useState} from "react";
import dateFormat from "@/components/utils/date-format.ts";

interface AppointmentCardProps {
    myBookingData: MyBookingData;
    onClick: (myBookingData: MyBookingData) => Promise<void>;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({myBookingData, onClick}) => {
    const [appointment] = useState<Appointment>(myBookingData.appointment);

    const getStatusStyles = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.SCHEDULED:
                return "bg-blue-50 border-blue-300 text-blue-700";
            case AppointmentStatus.COMPLETED:
                return "bg-green-50 border-green-300 text-green-700";
            case AppointmentStatus.CANCELLED:
                return "bg-red-50 border-red-300 text-red-700";
            default:
                return "";
        }
    };

    return (
        <div onClick={async () => {
            await onClick(myBookingData)
        }} className="bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-lg
        rounded-2xl p-6 border hover:shadow-2xl transition-shadow
        duration-300 hover:scale-105 transform cursor-pointer ">
            <div className="flex justify-between items-start">
                {/* ID và ngày tạo */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Cuộc hẹn #{appointment.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Tạo vào: {dateFormat((appointment.createdAt))}
                    </p>
                </div>
                {/* Trạng thái */}
                <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusStyles(
                        appointment.status
                    )}`}
                >
          {appointment.status === AppointmentStatus.SCHEDULED
              ? "Đã lên lịch"
              : appointment.status === AppointmentStatus.COMPLETED
                  ? "Hoàn thành"
                  : "Đã hủy"}
        </span>
            </div>
            {/* Ngày hẹn */}
            <div className="mt-1">
                <p className="text-gray-700 flex items-center">
                    <svg
                        className="w-5 h-5 mr-2 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <strong>Ngày hẹn: &nbsp;</strong>
                    {new Date(appointment.appointmentDate).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
            {/* Ghi chú */}
            {appointment.notes && (
                <div className="mt-1">
                    <label htmlFor="notes" className="block text-gray-700 font-semibold">
                        Ghi chú:
                    </label>
                    <textarea
                        id="notes"
                        value={appointment.notes}
                        readOnly
                        className="mt-2 w-full p-3 border border-gray-300
                        rounded-lg bg-gray-50 text-gray-700 resize-none shadow-sm
                        focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                        rows={2}
                    />
                </div>
            )}
        </div>
    );
};

export default AppointmentCard;