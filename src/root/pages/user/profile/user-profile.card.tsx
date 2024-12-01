import React from "react";
import {Gender,User} from "@/apis/models.d";
import dateFormat from "@/components/utils/date-format.ts";
import {useAuth} from "@/hooks";
import {useNavigate} from "react-router-dom";

const UserProfileCard: React.FC<{ user: User }> = ({ user }) => {
    const {logout} = useAuth()!
    const navigate = useNavigate();
    return (
        <div
            className=" border hover:border-indigo-500  shadow rounded p-6 hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="mb-2 space-y-2">
                <h2 className="text-2xl font-bold text-blue-800">{user.fullName}</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                onClick={()=>{
                    logout()
                    navigate("/")
                }}>
                    Đăng xuất
                </button>
            </div>
            {/* User Details */}
            <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-user mr-3 text-blue-400"></i>
                    <span className="font-semibold">Tài khoản:</span> {user.username}
                </p>
                <p className="flex items-center text-gray-700">
                    <i className="fas fa-venus-mars mr-3 text-pink-400"></i>
                    <span className="font-semibold">Giới tính:</span> {user.gender === Gender.MALE ? "Nam" : "Nữ"}
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
export default UserProfileCard