import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {IRegisterRequest} from "@/apis/auth.api.ts";
import {useAuth} from "@/hooks";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const RegisterForm: React.FC = () => {
    const {register:registerApi} = useAuth()!
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterRequest>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<IRegisterRequest> = async (data) => {
       await registerApi(data,() => {
           toast.success("Đăng ký thành công")
           navigate("/dang-nhap")
       },(message) => {
           toast.error(message)
       })
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Đăng Ký Tài Khoản
                </h2>
                <p className="text-sm text-center text-gray-600">
                    Điền thông tin của bạn vào mẫu bên dưới.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            {...register("username", {
                                required: "Tên đăng nhập là bắt buộc",
                                maxLength: { value: 20, message: "Tối đa 20 ký tự" },
                            })}
                            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                                errors.username
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            } shadow-sm`}
                        />
                        {errors.username && (
                            <p className="text-sm text-red-500">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Mật khẩu là bắt buộc",
                                minLength: { value: 6, message: "Tối thiểu 6 ký tự" },
                            })}
                            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                                errors.password
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            } shadow-sm`}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            {...register("fullName", {
                                required: "Họ và tên là bắt buộc",
                            })}
                            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                                errors.fullName
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            } shadow-sm`}
                        />
                        {errors.fullName && (
                            <p className="text-sm text-red-500">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Giới tính
                        </label>
                        <select
                            {...register("gender", { required: "Vui lòng chọn giới tính" })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                        </select>
                        {errors.gender && (
                            <p className="text-sm text-red-500">{errors.gender.message}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            {...register("phoneNumber", {
                                required: "Số điện thoại là bắt buộc",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Chỉ được nhập số",
                                },
                            })}
                            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                                errors.phoneNumber
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            } shadow-sm`}
                        />
                        {errors.phoneNumber && (
                            <p className="text-sm text-red-500">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            {...register("address", { required: "Địa chỉ là bắt buộc" })}
                            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                                errors.address
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            } shadow-sm`}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500">{errors.address.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email là bắt buộc",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Email không hợp lệ",
                                },
                            })}
                            className={`mt-1 block w-full px-4 py-2 rounded-lg border ${
                                errors.email
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            } shadow-sm`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Đăng Ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
