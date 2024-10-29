import assets from "@/assets";
import { HeadUtil } from "@/components/utils";
import { FC, Fragment } from "react";

const HomeUserPage: FC = () => {
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
          <img src={assets.BSStoneHome} alt="banner" className="lg:h-[600px] h-[400px] w-full object-cover"/>
          <div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/20 via-indigo-900/40 to-blue-900/80">
          </div>
          <div className="absolute bottom-[10%] md:bottom-[25%] left-[5%] sm:left-[10%] space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
              Nhẹ nhàng
              <br/>
              Chăm sóc răng miệng
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-lg">
              Chúng tôi mang đến dịch vụ chăm sóc răng miệng toàn diện, giúp bạn luôn tự tin với nụ cười khỏe đẹp.
            </p>
            <button
                className="mt-4 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition duration-300">
              Đặt lịch hẹn
            </button>
          </div>
        </div>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
      </section>
    </Fragment>
  );
};
export default HomeUserPage;
