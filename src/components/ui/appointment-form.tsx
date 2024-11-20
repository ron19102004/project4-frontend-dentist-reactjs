import assets from "@/assets";
import { FC, useState } from "react";
import DatePicker from "react-datepicker";


const AppointmentForm: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <section className="grid lg:grid-cols-2 gap-8 p-8">
      {/* Form Section */}
      <div className="bg-blue-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
          Book an Appointment
        </h2>
        <p className="text-gray-600 mb-6">
          Chọn dịch vụ, nhập thông tin, và chúng tôi sẽ liên hệ lại để xác nhận
          lịch hẹn của bạn.
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="appointment-name"
              className="block text-indigo-900 font-medium mb-1"
            >
              Họ và tên
            </label>
            <input
              id="appointment-name"
              type="text"
              className="w-full p-2 border border-indigo-900 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="appointment-email"
              className="block text-indigo-900 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="appointment-email"
              type="email"
              className="w-full p-2 border border-indigo-900 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-indigo-900 font-medium mb-1">
                Ngày
              </label>
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)} // Lưu giá trị ngày được chọn
                  showTimeSelect // Hiển thị cả giờ
                  dateFormat="Pp" // Định dạng ngày/giờ (e.g., MM/dd/yyyy h:mm aa)
                  className="w-full p-2 border border-indigo-900 rounded-md"
                  placeholderText="Chọn ngày/giờ"
                />
              </div>
            </div>
            <div>
              <label className="block text-indigo-900 font-medium mb-1">
                Dịch vụ
              </label>
              <select className="w-full p-2 border border-indigo-900 rounded-md">
                <option>Chọn dịch vụ</option>
                <option>Vệ sinh răng</option>
                <option>Tẩy trắng răng</option>
                <option>Cấy ghép implant</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-indigo-900 font-medium mb-1">
              Bác sĩ
            </label>
            <select className="w-full p-2 border border-indigo-900 rounded-md">
              <option>Chọn bác sĩ</option>
              <option>Dr. Nguyễn Văn A</option>
              <option>Dr. Trần Thị B</option>
              <option>Dr. Lê Văn C</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="appointment-note"
              className="block text-indigo-900 font-medium mb-1"
            >
              Lời nhắn
            </label>
            <textarea
              id="appointment-note"
              className="w-full p-2 border border-indigo-900 rounded-md"
            ></textarea>
          </div>
          <button className="w-full p-3 text-white bg-indigo-900 rounded-md hover:bg-indigo-800">
            Gửi
          </button>
        </form>
      </div>

      {/* Information Section */}
      <div className="space-y-8">
        <div className="bg-indigo-900 text-white p-8 rounded-lg">
          <div className="space-y-4">
            {[
              { day: "Monday", time: "09:00 AM — 07:00 PM" },
              { day: "Tuesday", time: "09:00 AM — 07:00 PM" },
              { day: "Wednesday", time: "09:00 AM — 07:00 PM" },
              { day: "Thursday", time: "09:00 AM — 07:00 PM" },
              { day: "Friday", time: "09:00 AM — 07:00 PM" },
              { day: "Saturday", time: "09:00 AM — 07:00 PM" },
              { day: "Sunday", time: "Closed" },
            ].map((schedule, index) => (
              <div key={index} className="flex justify-between">
                <span>{schedule.day}</span>
                <span>{schedule.time}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <span className="material-icons">phone</span>
                <span>(237) 681-812-255</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[400px] rounded-lg overflow-hidden">
          <iframe
            src={assets.GGMapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
