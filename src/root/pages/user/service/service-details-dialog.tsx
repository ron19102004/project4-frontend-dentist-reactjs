import {Service} from "@/apis/models";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import formatCurrency from "@/components/utils/price-format.ts";
import React from "react";

interface ServiceDialogProps {
    service: Service;
    open: boolean;
    onClose: () => void;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({service, open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose}  fullWidth>
            <DialogTitle className="flex items-center">
                <i className="fas fa-info-circle mr-2 text-blue-600"/> {/* FontAwesome icon with <i> */}
                Chi Tiết Dịch Vụ
            </DialogTitle>
            <DialogContent>
                {/* Poster Service */}
                <div className="w-full h-64 md:h-96 mb-4">
                    <img src={service.poster} alt={service.name} className="w-full h-full object-cover rounded-lg"/>
                </div>
                {/* Service Information */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                    {service.description.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br/>
                        </React.Fragment>
                    ))}
                </p>
                {/* Price and Reward Points */}
                <div className="flex justify-between text-lg text-blue-600 font-semibold">
                    <span>{formatCurrency(service.price)}</span>
                    <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold py-1 px-3 rounded-full">
                        Điểm thưởng: +{service.pointReward} điểm
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceDialog;