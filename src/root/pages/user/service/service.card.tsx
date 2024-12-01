import {Service} from "@/apis/models.d";
import formatCurrency from "@/components/utils/price-format.ts";
import React from "react";

interface ServiceCardProps {
    service: Service;
    openDetails: ( service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service,openDetails }) => {
    return (
        <div
            className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-transform duration-300">
            {/* Service Poster */}
            <div className="relative w-full h-40 sm:h-56 bg-gray-200">
                <img
                    src={service.poster}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                    {formatCurrency(service.price)}
                </div>
            </div>

            {/* Service Info */}
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{service.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center mt-3">
                    <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold py-1 px-3 rounded-full">
                        +{service.pointReward} điểm tích lũy
                    </span>
                </div>
                <div className={"grid grid-cols-2 gap-4"}>
                    <button
                        className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-indigo-700 transition-colors">
                        Đặt dịch vụ
                    </button>
                    <button
                        onClick={()=>{
                            openDetails(service)
                        }}
                        className="mt-4 w-full py-2 bg-gradient-to-r from-gray-50 to-white text-sm font-semibold rounded-md shadow-md hover:from-gray-100 hover:to-white transition-colors border">
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;