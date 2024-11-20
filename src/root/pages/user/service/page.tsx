import { HeadUtil } from "@/components/utils";

import { FC, Fragment, useCallback, useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import assets from "@/assets";
import { HomeControllerUser } from "../home/home.controller";
import { Service } from "../home/interface";

const ServiceUserPage: FC = () => {
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
        title={"Dịch vụ"}
        author={"Ron"}
        urlImage={""}
        urlPageCurrent={""}
      />
      <section className="container mx-auto">
        <div className="min-h-screen bg-white">
          {/* Header */}

          {/* Hero Section */}
          <section className="relative h-[260px] overflow-hidden">
            <img
              src={assets.BannerAppointment}
              alt="Dental Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="container absolute bottom-[10%] md:bottom-[25%] left-[5%] sm:left-[10%] left-[5%] top-0 mx-auto px-4 h-full flex items-center">
              <h1 className="text-5xl font-bold text-white">DỊCH VỤ</h1>
            </div>
          </section>

          {/* Services Grid */}
          <section className="lg:px-36 py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className=" border rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="relative h-48 bg-primary/10">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt={service.name}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">{service.name}</h3>
                      {service.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {service.description}
                        </p>
                      )}

                      <Link
                        to={`/dich-vu/${service.id}`}
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        XEM THÊM
                        <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="lg:px-36 bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-center text-2xl font-bold mb-12">
                LIÊN HỆ VỚI CHÚNG TÔI ĐỂ ĐƯỢC TƯ VẤN THÊM TẠI
                <span className="text-primary block mt-2">DENTIFY</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Phone className="h-6 w-6 text-primary" />
                  <p className="font-medium">(237) 681-812-255</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <p className="font-medium">HOÀ QUÝ, NGŨ HÀNH SƠN</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <p className="font-medium">dentify@gmail.com</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <p className="font-medium">08:00 - 17:00</p>
                </div>
              </div>
            </div>
          </section>

          
         
        </div>
      </section>
    </Fragment>
  );
};
export default ServiceUserPage;
