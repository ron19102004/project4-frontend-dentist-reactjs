import assets from "@/assets";
import SubNav from "@/components/ui/sub-nav";
import { HeadUtil } from "@/components/utils";
import { cn } from "@/lib/cn";
import { FC, Fragment, useState } from "react";
import DatePicker from "react-datepicker";

const DoctorUserPage: FC = () => {
  const doctors = [
    {
      name: "Bác sĩ Nguyễn Văn A",
      image: "https://via.placeholder.com/300x400?text=Bác+sĩ+1",
    },
    {
      name: "Bác sĩ Trần Thị B",
      image: "https://via.placeholder.com/300x400?text=Bác+sĩ+2",
    },
    {
      name: "Bác sĩ Lê Minh C",
      image: "https://via.placeholder.com/300x400?text=Bác+sĩ+3",
    },
    {
      name: "Bác sĩ Phạm Thị D",
      image: "https://via.placeholder.com/300x400?text=Bác+sĩ+4",
    },
    {
      name: "Bác sĩ Hoàng Anh E",
      image: "https://via.placeholder.com/300x400?text=Bác+sĩ+5",
    },
  ];
 

  const news = [
    {
      title: "Tin tức 1: Sự kiện lớn tại bệnh viện",
      image: "https://via.placeholder.com/400x200?text=Tin+tức+1",
      time: "Ngày 12 tháng 11, 2024",
    },
    {
      title: "Tin tức 2: Khám phá các dịch vụ mới tại phòng khám",
      image: "https://via.placeholder.com/400x200?text=Tin+tức+2",
      time: "Ngày 11 tháng 11, 2024",
    },
    {
      title: "Tin tức 3: Những điều cần biết về chăm sóc răng miệng",
      image: "https://via.placeholder.com/400x200?text=Tin+tức+3",
      time: "Ngày 10 tháng 11, 2024",
    },
    {
      title: "Tin tức 4: Chúng tôi vừa khai trương chi nhánh mới",
      image: "https://via.placeholder.com/400x200?text=Tin+tức+4",
      time: "Ngày 9 tháng 11, 2024",
    },
  ];
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Fragment>
      <HeadUtil
        title={"Bac si"}
        author={"Ron"}
        urlImage={""}
        urlPageCurrent={""}
      />
      <section className="container mx-auto">
        <SubNav title="ĐỘI NGŨ CHUYÊN GIA" ></SubNav>
      </section>
     
      <section className="px-4 lg:px-36 mb-16 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="overflow-hidden w-full">
                <div className="relative h-[400px]">
                  <img
                    src={assets.DoctorImage}
                    alt={doctor.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="p-4 bg-[#1a237e] text-white text-center">
                  <h3 className="font-bold mb-2">{doctor.name}</h3>
                  <button className="border-2 border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-[#1a237e] transition duration-300">
                    XEM NGAY
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 lg:px-36 mb-16">
        <h1
          className={cn(
            "text-my_color_primary text-center font-semibold text-4xl m-14"
          )}
        >
          TIN TỨC
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <div key={index} className="overflow-hidden border rounded-lg">
              <div className="p-0">
                <div className="relative h-48">
                  <img
                    src={assets.NewImage}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{item.time}</span>
                    <button className="text-[#1a237e]">Xem thêm</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {[0, 1].map((index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentNewsSlide === index ? "bg-[#1a237e]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentNewsSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="mx-32 grid lg:grid-cols-2 gap-8 p-8">
        {/* Form Section */}
        <div className="bg-blue-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            Book an Appointment
          </h2>
          <p className="text-gray-600 mb-6">
            Chọn dịch vụ, nhập thông tin, và chúng tôi sẽ liên hệ lại để xác
            nhận lịch hẹn của bạn.
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
    </Fragment>
  );
};
export default DoctorUserPage;
