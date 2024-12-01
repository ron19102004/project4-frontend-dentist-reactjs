import {ServiceHot} from "@/apis/models.d";
import formatCurrency from "@/components/utils/price-format.ts";

interface ServiceHotCardProps {
    service: ServiceHot;
}

const ServiceHotCard: React.FC<ServiceHotCardProps> = ({ service }) => {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105">
            {/* Service Poster */}
            <div className="w-full h-56">
                <img
                    src={service.poster}
                    alt={service.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Service Info */}
            <div className="p-4 flex flex-col gap-3">
                {/* Service Name */}
                <h3 className="text-xl font-bold text-gray-800 truncate">{service.name}</h3>

                {/* Service Description */}
                <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>

                {/* Price and Points */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-blue-600">
                        {formatCurrency(service.price)}
                    </span>
                    <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold py-1 px-3 rounded-full">
                        {service.pointReward} Điểm
                    </span>
                </div>

                {/* Quantity Used */}
                <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-cart-plus mr-2 text-blue-600" />
                  {service.quantityUsed} khách hàng đã sử dụng
                </div>
            </div>
        </div>
    );
};

export default ServiceHotCard;