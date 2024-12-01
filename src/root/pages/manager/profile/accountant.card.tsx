import {Accountant} from "@/apis/models.d";
import dateFormat from "@/components/utils/date-format.ts";
import React from "react";

const AccountantCard: React.FC<{ accountant: Accountant }> = ({ accountant }) => {
    return (
        <div
            className="p-6 w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-indigo-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-teal-600">Thông tin Thu Ngân</h2>
            </div>
            {/* Details */}
            <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-envelope mr-3 text-blue-400"></i>
                    <span className="font-semibold">Email:</span> {accountant.email}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-phone mr-3 text-green-400"></i>
                    <span className="font-semibold">Số điện thoại:</span> {accountant.phoneNumber}
                </p>
            </div>
            {/* Footer */}
            <p className="mt-6 text-xs text-gray-500 text-right">
                Ngày tạo: {dateFormat(accountant.createdAt)}
            </p>
        </div>
    );
};
export default AccountantCard