import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ForbiddenPage from "@/root/pages/errors/forbidden.tsx";
import { useAuth, useBoolean } from "@/hooks";
import { useQuery } from 'react-query';
import { IResponseLayout } from '@/apis/models';

const VerifyResetPassword: React.FC = () => {
    const { value: success, setValue: setSuccess } = useBoolean()
    const [message, setMessage] = useState<string | null>(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token: string | null = queryParams.get('token')
    const { verifyResetPassword } = useAuth()
    if (!token) {
        return <ForbiddenPage />;
    }
    const { isLoading } = useQuery<IResponseLayout<null>>(
        'verifyResetPassword', // Query key
        () => verifyResetPassword(token),
        {
            onSuccess: (data) => {
                setSuccess(data.success)
                setMessage(data.message)
            },
            onError: (err:any) => {
                setMessage(err.message);
                setSuccess(false);
            },
            staleTime: Infinity
        }
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="flex flex-col items-center">
                    <div
                        className="animate-spin rounded-full h-24 w-24 border-8 border-t-8 border-t-blue-500 border-solid bg-transparent shadow-lg"></div>
                    <p className="mt-4 text-3xl font-semibold text-gray-800">Đang xử lý...</p>
                    <p className="text-gray-600 mt-2">Vui lòng chờ trong giây lát.</p>
                    <div className="mt-6 animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-2 0v4a1 1 0 002 0V6zm0 6a1 1 0 00-2 0v2a1 1 0 002 0v-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
            <div
                className={`bg-white shadow-lg rounded-xl p-8 max-w-md w-full transition-transform transform hover:scale-105 ${success ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                <h1 className={`text-3xl font-semibold text-center mb-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
                    {success ? "Khôi Phục Mật Khẩu Thành Công!" : 'Có Lỗi Xảy Ra!'}
                </h1>
                <p className="text-gray-800 text-center mb-8">
                    {message}
                </p>
               <div className='flex justify-center items-center'>
               <Link
                    to="/"
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-full text-center transform hover:scale-105"
                >
                    Quay lại
                </Link>
               </div>
            </div>
        </div>
    );
};

export default VerifyResetPassword;
