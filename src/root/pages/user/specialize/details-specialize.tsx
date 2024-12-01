import {Specialize} from "@/apis/models.d";
import React, {Fragment, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import useSpecialize from "@/hooks/useSpecialize.hook.tsx";
import {useBoolean} from "@/hooks";
import LoadingCircle from "@/components/ui/loading-circle.ui.tsx";

const SpecializeNotFound: React.FC = () => {
    return <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
        <div className="text-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Không tìm thấy chuyên ngành
            </h1>
            <p className="text-gray-500 mb-6">
                Dữ liệu chuyên ngành không tồn tại hoặc đã bị xóa.
            </p>
            <Link to={"/"} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
                Trang chủ
            </Link>
        </div>
    </div>
}

const SpecializeDetail: React.FC = () => {
    const {slug} = useParams();
    const [specialize, setSpecialize] = useState<Specialize | null>(null);
    const {getBySlug} = useSpecialize()
    const {value:fetching,setValue:setFetching} = useBoolean(true)
    const init = async () => {
        try {
            if (slug != null) {
                setFetching(true);
                const data = await getBySlug(slug);
                setSpecialize(data)
            }
        } finally {
            setFetching(false);
        }
    }
    useEffect(() => {
        init().then()
    }, []);
    return (
        <Fragment>
            {fetching && <LoadingCircle/>}
            {(!fetching && specialize) && <div className=" bg-gradient-to-b from-blue-200 to-white p-6">
                {/* Header */}
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-indigo-600 text-white text-center py-6">
                        <h1 className="text-3xl font-bold">{specialize.name}</h1>
                        <p className="text-sm mt-2">
                            Ngày tạo: {specialize.createdAt}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">Tên chuyên ngành</h2>
                            <p className="text-gray-500 bg-gray-100 p-2 rounded-md">{specialize.name}</p>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700">Mô tả</h2>
                            <p className="text-gray-600 bg-gray-50 p-4 rounded-md shadow-inner">
                                {specialize.description.split("\n").map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
                        <button
                            className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                            onClick={() => window.history.back()}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>}
            {(!fetching && !specialize) && <SpecializeNotFound/>}
        </Fragment>
    );
};

export default SpecializeDetail;