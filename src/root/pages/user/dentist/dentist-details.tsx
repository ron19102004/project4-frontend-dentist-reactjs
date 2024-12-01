import React, {Fragment, useEffect, useState} from "react";
import {DentistResponse} from "@/apis/models";
import {useParams} from "react-router-dom";
import useDentist from "@/hooks/useDentist.hook.tsx";
import {useBoolean} from "@/hooks";


const DentistDetailPage: React.FC = () => {
    const {getById} = useDentist();
    const [data, setData] = useState<DentistResponse | null>(null)
    const {id} = useParams()
    const {value: fetching, setValue: setFetching} = useBoolean(true)
    const init = async () => {
        try {
            setFetching(true)
            if (id) {
                const res = await getById(parseInt(id));
                setData(res)
            }
        } finally {
            setFetching(false)
        }
    }
    useEffect(() => {
        init().then()
    }, []);
    return (
        <Fragment>
            {(data && !fetching) &&
                <div className={"p-6 bg-gradient-to-b from-blue-200 to-white"}>
                    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg space-y-6">
                        {/* Header Section */}
                        <header className="flex items-center space-x-4 border-b pb-4">
                            <i className="fas fa-user-md text-blue-500 text-4xl"></i>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{data.fullName}</h1>
                                <p className="text-sm text-gray-500">Mã số nha sĩ: #{data.id}</p>
                            </div>
                        </header>

                        {/* Contact Information */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-700">Thông tin liên hệ</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <p className="flex items-center text-gray-600">
                                    <i className="fas fa-envelope text-gray-400 mr-3"></i>
                                    <strong>Email:</strong> {data.dentist.email}
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <i className="fas fa-phone-alt text-gray-400 mr-3"></i>
                                    <strong>Số điện thoại:</strong> {data.dentist.phoneNumber}
                                </p>
                            </div>
                        </section>

                        {/* Specialization Section */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-700">Chuyên môn</h2>
                            <div className="p-4 border rounded-lg bg-white shadow-sm">
                                <h3 className="text-lg font-bold text-blue-600">
                                    {data.dentist.specialize.name}
                                </h3>
                                <p className="text-gray-600 bg-gray-50 p-4 rounded-md shadow-inner">
                                    {data.dentist.specialize.description.split("\n").map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br/>
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </section>

                        {/* Description Section */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-700">Mô tả</h2>
                            <div className="p-4 border rounded-lg bg-white shadow-sm">
                                <p className="text-gray-600">
                                    {data.dentist.description.split("\n").map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br/>
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </section>

                        {/* Metadata */}
                        <footer className="text-sm text-gray-500 pt-4 border-t">
                            <p>
                                Ngày tạo hồ sơ:{" "}
                                <span className="font-medium">
                        {new Date(data.dentist.createdAt).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                            </p>
                        </footer>
                    </div>
                </div>
            }
        </Fragment>
    )
};

export default DentistDetailPage;