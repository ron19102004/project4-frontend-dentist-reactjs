import { FC, Fragment } from "react";
import HeadUtil from "../../../../components/utils/head.util";
import assets from "@/assets";

import "react-datepicker/dist/react-datepicker.css";
import AppointmentForm from "@/components/ui/appointment-form";

const BookingUserPage: FC = () => {
 
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
            <h1 className="text-5xl font-bold text-white">ĐẶT LỊCH HẸN NGAY</h1>
          </div>
        </section>

        <section className="mx-36">
         <AppointmentForm></AppointmentForm>
        </section>
      </section>
    </Fragment>
  );
};
export default BookingUserPage;
