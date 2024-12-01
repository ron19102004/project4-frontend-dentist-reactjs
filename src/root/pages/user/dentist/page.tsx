import {FC, useEffect, useState} from "react";
import useDentist from "@/hooks/useDentist.hook.tsx";
import {DentistResponse} from "@/apis/models.d";
import {LoopUtil} from "@/components/utils";
import {Link} from "react-router-dom";

const DentistPage: FC = () => {
    const {getAll} = useDentist()
    const [dentists, setDentists] = useState<DentistResponse[]>([]);
    const init = async () => {
        const data = await getAll()
        setDentists(data)
        console.log(data)
    }
    useEffect(() => {
        init().then()
    }, []);
    return (
        <section className={"bg-gradient-to-b from-blue-200 to-white"}>
            <div className="bg-blue-800 text-white text-center py-8">
                <h1 className="text-4xl font-extrabold tracking-wider uppercase">
                    Đội ngũ Bác sĩ
                </h1>
                <p className="text-lg mt-2 ">
                    Khám phá đội ngũ Bác sĩ chất lượng tại phòng khám
                </p>
            </div>
            <ul className={"grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 "}>
                <LoopUtil data={dentists} render={(dentist) => {
                    return <Link to={"/bac-si/" + dentist.id}>
                        <div
                            className="border rounded-lg p-6 shadow-lg bg-white space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300">
                            {/* Avatar */}
                            {dentist.dentist.avatar && (
                                <div className="flex justify-center">
                                    <img
                                        src={dentist.dentist.avatar}
                                        alt="Dentist Avatar"
                                        className="w-24 h-24 object-cover rounded-full shadow-md transform
                                         transition-transform duration-200 hover:scale-150 border"
                                    />
                                </div>
                            )}

                            {/* Header */}
                            <div className="flex items-center space-x-3">
                                <i className="fas fa-user-md text-blue-600 text-3xl"></i>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {dentist.fullName}
                                </h3>
                            </div>

                            {/* ID */}
                            <p className="flex items-center text-gray-600">
                                <i className="fas fa-id-badge text-gray-400 mr-2"></i>
                                <span><strong>ID:</strong> {dentist.id}</span>
                            </p>

                            {/* Email */}
                            <p className="flex items-center text-gray-600">
                                <i className="fas fa-envelope text-gray-400 mr-2"></i>
                                <span><strong>Email:</strong> {dentist.dentist.email}</span>
                            </p>

                            {/* Phone Number */}
                            <p className="flex items-center text-gray-600">
                                <i className="fas fa-phone-alt text-gray-400 mr-2"></i>
                                <span><strong>Số điện thoại:</strong> {dentist.dentist.phoneNumber}</span>
                            </p>

                            {/* Specialize */}
                            <p className="flex items-center text-gray-600">
                                <i className="fas fa-tooth text-gray-400 mr-2"></i>
                                <span><strong>Chuyên môn:</strong> {dentist.dentist.specialize.name}</span>
                            </p>

                            {/* Description */}
                            <p className="flex items-center text-gray-600">
                                <i className="fas fa-info-circle text-gray-400 mr-2"></i>
                                <span><strong>Mô tả:</strong> {dentist.dentist.description || "Không có mô tả"}</span>
                            </p>
                        </div>

                    </Link>
                }}/>
            </ul>
        </section>
    )
}
export default DentistPage