import useSpecialize from "@/hooks/useSpecialize.hook.tsx";
import {useEffect, useState} from "react";
import {Specialize} from "@/apis/models.d";
import {LoopUtil} from "@/components/utils";
import {Link} from "react-router-dom";

const SpecializePage: React.FC = () => {
    const {getAll} = useSpecialize()
    const [specializes, setSpecializes] = useState<Specialize[]>([])
    const init = async () => {
        const data = await getAll();
        setSpecializes(data)
    }
    useEffect(() => {
        init().then()
    }, [])
    return (
        <section className="bg-gradient-to-b from-blue-200 to-white">
            <div className="bg-blue-800 text-white text-center py-8">
                <h1 className="text-4xl font-extrabold tracking-wider uppercase">
                    Chuyên ngành
                </h1>
                <p className="text-lg mt-2 ">
                    Khám phá các chuyên ngành chất lượng tại phòng khám
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                <LoopUtil
                    data={specializes}
                    render={(specialize, index) => (
                        <div
                            key={index}
                            className="shadow-lg rounded-lg p-6 border hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between bg-white"
                        >
                            {/* Tên chuyên ngành */}
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 truncate text-center">{specialize.name}</h2>

                            {/* Mô tả */}
                            <p className="text-sm text-gray-600 mb-6 line-clamp-3">{specialize.description}</p>

                            {/* Button */}
                            <Link
                                to={`/chuyen-nganh/${specialize.slug}`}
                                className="mt-auto py-2 px-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-gradient-to-l text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center"
                            >
                                Xem thêm
                            </Link>
                        </div>
                    )}
                />
            </div>
        </section>
    );
};

export default SpecializePage;