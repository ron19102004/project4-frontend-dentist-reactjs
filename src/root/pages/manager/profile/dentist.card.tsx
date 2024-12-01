import {Dentist} from "@/apis/models.d";
import React from "react";
import dateFormat from "@/components/utils/date-format.ts";
import {Link} from "react-router-dom";


const DentistCard: React.FC<{ dentist: Dentist }> = ({dentist}) => {
    return (
        <div
            className="p-6 w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-indigo-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-indigo-600">Thông tin Nha sĩ</h2>
            </div>
            {/* Details */}
            <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-envelope mr-3 text-blue-400"></i>
                    <span className="font-semibold">Email:</span> {dentist.email}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-phone mr-3 text-green-400"></i>
                    <span className="font-semibold">Số điện thoại:</span> {dentist.phoneNumber}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-user-md mr-3 text-purple-400"></i>
                    <span className="font-semibold">Chuyên môn:</span>
                    <Link to={"/chuyen-nganh/" + dentist.specialize.slug} className={"hover:underline hover:text-blue-600"}>
                        {dentist.specialize.name}
                    </Link>
                </p>
                <div>
                    <label className="block text-gray-600 font-semibold mb-2" htmlFor="description">
                        Mô tả:
                    </label>
                    <textarea
                        id="description"
                        value={dentist.description}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none bg-gray-50 text-gray-700"
                        rows={4}
                    ></textarea>
                </div>
            </div>
            {/* Footer */}
            <p className="mt-6 text-xs text-gray-500 text-right">
                Ngày tạo: {dateFormat(dentist.createdAt)}
            </p>
        </div>
    );
};

export default DentistCard;