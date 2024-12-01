import axios from "axios";
import { FC, useState } from "react";

const XRayToolPage: FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/predict/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.image) {
                setImage(`data:image/jpeg;base64,${response.data.image}`);
            }
        } catch (error) {
            console.error("Lỗi khi tải lên file:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                {/* Tiêu đề */}
                <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
                    <i className="fas fa-x-ray mr-2"></i>
                    Công Cụ Phân Tích Ảnh X-Quang
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Hãy tải lên ảnh X-quang và nhận kết quả xử lý.
                </p>

                {/* Input và Button */}
                <div className="flex flex-col items-center gap-4">
                    <label
                        htmlFor="file-upload"
                        className="w-full px-4 py-3 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <i className="fas fa-upload mr-2"></i>
                        Chọn Tệp
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <button
                        onClick={handleUpload}
                        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
                    >
                        <i className="fas fa-cloud-upload-alt mr-2"></i>
                        Tải Lên và Xử Lý
                    </button>
                </div>

                {/* Kết quả ảnh */}
                {image && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-blue-500 mb-4 text-center">
                            <i className="fas fa-image mr-2"></i>
                            Ảnh Kết Quả Xử Lý
                        </h3>
                        <div className="flex justify-center">
                            <img
                                src={image}
                                alt="Processed result"
                                className="w-full max-w-md rounded-lg shadow-lg border border-gray-200"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default XRayToolPage;
