import { FC, Fragment } from "react";
import HeadUtil from "../../../../components/utils/head.util";
import { cn } from "@/lib/cn";
import assets from "@/assets";

const ContactUserPage: FC = () => {
  return (
    <Fragment>
      <HeadUtil
        title={"Liên hệ"}
        author={"Ron"}
        urlImage={""}
        urlPageCurrent={""}
      />
      <section className="">
        <section className="text-3xl relative h-[260px] overflow-hidden">
          <img
            src={assets.BannerAppointment}
            alt="Dental Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container absolute bottom-[10%] md:bottom-[25%] left-[5%] sm:left-[10%] left-[5%] top-0 mx-auto px-4 h-full flex items-center">
            <h1 className="text-5xl font-bold text-white">LIÊN HỆ</h1>
          </div>
        </section>
        <section className="h-[450px] h-[100%] w-[100%] flex flex-col justify-center items-center z-50 bg-transparent backdrop-blur-sm transition-all">
          <iframe
          src={assets.GGMapSrc}
            allowFullScreen={true}
            loading="lazy"
            className={cn("w-full h-[calc(100%-40px)] rounded-b-lg")}
          ></iframe>
        </section>
        <section className="mx-40 mb-16 p-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#1a237e] mb-1">
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full p-2 border border-[#1a237e] rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#1a237e] mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 border border-[#1a237e] rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[#1a237e] mb-1"
                  >
                    Tiêu đề
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full p-2 border border-[#1a237e] rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#1a237e] mb-1"
                  >
                    Nội dung
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-2 border border-[#1a237e] rounded-md min-h-[150px]"
                  />
                </div>
                <button className="w-full p-3 text-white bg-[#1a237e] rounded-md hover:bg-[#1a237e]/90">
                  Gửi
                </button>
              </form>
            </div>

            {/* Information Section */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="bg-[#e3f2fd] p-6 rounded-md flex items-center gap-4">
                <span className="h-6 w-6 bg-[#1a237e] text-white flex items-center justify-center rounded-full">
                  📞
                </span>
                <div>
                  <p>(237) 681-812-255</p>
                  <p>(237) 666-331-894</p>
                </div>
              </div>
              {/* Address */}
              <div className="bg-[#1a237e] text-white p-6 rounded-md flex items-center gap-4">
                <span className="h-6 w-6 bg-white text-[#1a237e] flex items-center justify-center rounded-full">
                  📍
                </span>
                <p>470 Trần Đại Nghĩa, Hoà Quý, Ngũ Hành Sơn</p>
              </div>
              {/* Email */}
              <div className="bg-[#e3f2fd] p-6 rounded-md flex items-center gap-4">
                <span className="h-6 w-6 bg-[#1a237e] text-white flex items-center justify-center rounded-full">
                  ✉️
                </span>
                <div>
                  <p>EMAIL</p>
                  <p>dentify@gmail.com</p>
                </div>
              </div>
              {/* Working Hours */}
              <div className="bg-[#e3f2fd] p-6 rounded-md flex items-center gap-4">
                <span className="h-6 w-6 bg-[#1a237e] text-white flex items-center justify-center rounded-full">
                  ⏰
                </span>
                <p>Mon-Sat 09:00-07:00</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Fragment>
  );
};
export default ContactUserPage;
