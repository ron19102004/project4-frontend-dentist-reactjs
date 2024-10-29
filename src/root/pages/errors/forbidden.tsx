import React from 'react';
import { Link } from 'react-router-dom'; // Đảm bảo bạn đã cài react-router-dom

const ForbiddenPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Truy cập bị từ chối!</h2>
                <p className="text-gray-600 mb-6">
                    Bạn không có quyền truy cập vào trang này.
                    Vui lòng kiểm tra lại quyền truy cập của bạn.
                </p>
                <Link
                    to="/"
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                    Quay lại trang chính
                </Link>
            </div>
        </div>
    );
};

export default ForbiddenPage;
