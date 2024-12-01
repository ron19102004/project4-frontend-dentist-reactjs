import {Gender, Role, User} from "@/apis/models.d";
import dateFormat from "@/components/utils/date-format.ts";
import React from "react";

const UserCard: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div
            className="p-6 w-full  bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-indigo-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-800">{user.fullName}</h2>
                <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        user.role === Role.ADMIN
                            ? "bg-red-100 text-red-600"
                            : user.role === Role.DENTIST
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                    }`}
                >
          {user.role}
        </span>
            </div>
            {/* User Details */}
            <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-user mr-3 text-blue-400"></i>
                    <span className="font-semibold">Tài khoản:</span> {user.username}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-venus-mars mr-3 text-pink-400"></i>
                    <span className="font-semibold">Giới tính:</span> {user.gender === Gender.MALE ? "Nam": "Nữ"}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-phone mr-3 text-green-400"></i>
                    <span className="font-semibold">Số điện thoại:</span> {user.phoneNumber}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-envelope mr-3 text-yellow-400"></i>
                    <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-map-marker-alt mr-3 text-red-400"></i>
                    <span className="font-semibold">Địa chỉ:</span> {user.address}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-trophy mr-3 text-orange-400"></i>
                    <span className="font-semibold">Điểm thưởng:</span>{" "}
                    {user.rewardPoint.point} (Đã dùng: {user.rewardPoint.pointsUsed})
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-lock mr-3 text-purple-400"></i>
                    <span className="font-semibold">Xác thực 2 yếu tố: </span>{" "}
                    {user.activeTwoFactorAuthentication ? "Bật" : " Tắt"}
                </p>
            </div>
            {/* Footer */}
            <p className="mt-6 text-xs text-gray-500 text-right">
                Ngày tạo: {dateFormat(user.createdAt)}
            </p>
        </div>
    );
};
export default UserCard