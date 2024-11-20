import assets from "@/assets";
import ServiceCard from "@/components/card/service-card";
import { HeadUtil } from "@/components/utils";
import { cn } from "@/lib/cn";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { HomeControllerUser } from "./home.controller";
import { Service } from "./interface";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeUserPage: FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.image) {
        setImage(`data:image/jpeg;base64,${response.data.image}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = useCallback(async () => {
    try {
      const newServices = await HomeControllerUser.getServices();
      setServices(newServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, []);
  useEffect(() => {
    fetchServices();
    console.log(services);
  }, []);

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
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const slideWidth = 100 / 3;

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

  return (
    <Fragment>
      <HeadUtil
        title={"Trang chủ"}
        author={"Ron"}
        urlImage={""}
        urlPageCurrent={""}
      />
      <section className="container mx-auto">
        <div className="relative">
          <img
            src={assets.BSStoneHome}
            alt="banner"
            className="lg:h-[600px] h-[400px] w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/20 via-indigo-900/40 to-blue-900/80"></div>
          <div className="absolute bottom-[10%] md:bottom-[25%] left-[5%] sm:left-[10%] space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
              Nhẹ nhàng
              <br />
              Chăm sóc răng miệng
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-lg">
              Chúng tôi mang đến dịch vụ chăm sóc răng miệng toàn diện, giúp bạn
              luôn tự tin với nụ cười khỏe đẹp.
            </p>
            <button className="mt-4 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition duration-300">
              Đặt lịch hẹn
            </button>
          </div>
        </div>

        <div className="px-4 lg:px-8">
          <h1
            className={cn(
              "text-my_color_primary text-center font-semibold text-4xl m-14"
            )}
          >
            CÁC DỊCH VỤ HÀNG ĐẦU
          </h1>
          <div className="gap-12 service-list flex justify-center flex-col service-list flex justify-center flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
              {services.map((service, item) => (
                <ServiceCard
                  key={item}
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  price={service.price}
                  poster={service.poster}
                />
              ))}
            </div>
            <Link className="pb-12" to="/dich-vu">
              <Button className="px-4 py-4" size="large" variant="outlined">
                XEM TẤT CẢ
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="relative">
          <img
            src={assets.BannerAppointment}
            alt="banner"
            className="lg:h-[600px] h-[400px] w-full object-cover opacity-60"
          />
          <div className="absolute top-0 left-0 bg-gradient-to-b from-purple-500/10 via-indigo-900/20 to-blue-900/70 w-full h-full"></div>
          <div className="absolute bottom-[10%]  left-[5%] sm:left-[10%] space-y-6">
            <div className="relative z-10 bg-[#1a237e] bg-opacity-90 rounded-lg p-6 text-white max-w-lg w-full">
              <h2 className="text-2xl font-bold text-center mb-4">
                Đặt lịch ngay
              </h2>
              <form className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full p-2 bg-white text-black rounded-md"
                  />
                  <select
                    name="sex"
                    className="w-full p-2 bg-white text-black rounded-md"
                  >
                    <option>Giới tính</option>
                    <option>Nam</option>
                    <option>Nữ</option>
                  </select>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 bg-white text-black rounded-md"
                />
                <div className="flex gap-4">
                  <select className="w-full p-2 bg-white text-black rounded-md">
                    <option>Ngày</option>
                    <option>Hôm nay</option>
                    <option>Ngày mai</option>
                  </select>
                  <select className="w-full p-2 bg-white text-black rounded-md">
                    <option>Giờ</option>
                    <option>Sáng</option>
                    <option>Chiều</option>
                  </select>
                </div>
                <select className="w-full p-2 bg-white text-black rounded-md">
                  <option>Bác sĩ</option>
                  <option>Bác sĩ A</option>
                  <option>Bác sĩ B</option>
                </select>
                <textarea
                  placeholder="Lời nhắn"
                  className="w-full p-2 bg-white text-black rounded-md"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
                >
                  GỬI
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 lg:px-36 mb-16">
        <h1
          className={cn(
            "text-my_color_primary text-center font-semibold text-4xl m-14"
          )}
        >
          CÁC CHUYÊN GIA HÀNG ĐẦU
        </h1>
        <div className="relative">
          <div className="flex overflow-hidden justify-center">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentDoctorSlide * slideWidth}%)`,
              }}
            >
              {doctors.map((doctor, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4 md:w-1/3">
                  <div className="overflow-hidden">
                    <div className="p-0">
                      <div className="relative h-[400px]">
                        <img
                          src={assets.DoctorImage}
                          alt={doctor.name}
                          className="object-cover w-full h-full"
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
                </div>
              ))}
            </div>
          </div>

          {/* Phần thụt vào các chấm điều hướng */}
          <div className="flex justify-center gap-2 mt-4">
            {doctors.length > 3 &&
              doctors.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentDoctorSlide === index
                      ? "bg-[#1a237e]"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentDoctorSlide(index)} // Cập nhật slide khi nhấn
                />
              ))}
          </div>
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
      <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {image && (
        <div>
          <h3>Processed Image:</h3>
          <img src={image} alt="Processed result" />
        </div>
      )}
    </div>
    </Fragment>
  );
};
export default HomeUserPage;
