import assets from "@/assets";
import ServiceCard from "@/components/card/service-card";
import { HeadUtil } from "@/components/utils";
import { cn } from "@/lib/cn";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { HomeControllerUser } from "./home.controller";
import { Service } from "./interface";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomeUserPage: FC = () => {
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
    </Fragment>
  );
};
export default HomeUserPage;
