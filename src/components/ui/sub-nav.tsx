import assets from "@/assets";
import React from "react";

interface Title {
  title: string;
}

const SubNav: React.FC<Title> = ({ title }) => {
  return (
    <section className="text-3xl relative h-[260px] overflow-hidden">
      <img
        src={assets.BannerAppointment}
        alt="Dental Services"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container absolute bottom-[10%] md:bottom-[25%] left-[5%] sm:left-[10%] top-0 mx-auto px-4 h-full flex items-center">
        <h1 className="text-5xl font-bold text-white">{title}</h1>
      </div>
    </section>
  );
};

export default SubNav;
