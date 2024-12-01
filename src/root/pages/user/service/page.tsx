import ServiceCard from "@/root/pages/user/service/service.card.tsx";
import {LoopUtil} from "@/components/utils";
import useService from "@/hooks/useService.hook.tsx";
import {Fragment, useState} from "react";
import {Service} from "@/apis/models.d";
import {useBoolean} from "@/hooks";
import ServiceDetailsDialog from "@/root/pages/user/service/service-details-dialog.tsx";
import {Link} from "react-router-dom";

const ServicePage: React.FC = () => {
    const {list: services} = useService()!
    const [serviceCurrent, setServiceCurrent] = useState<Service | null>(null)
    const {value: openServiceDetails, setValue: setOpenServiceDetails} = useBoolean()
    return (
        <Fragment>
            <section className="bg-gradient-to-b from-blue-200 via-blue-100 to-white">
                {/* Header */}
                <div className="bg-blue-800 text-white text-center py-8">
                    <h1 className="text-4xl font-extrabold tracking-wider uppercase">
                        Dịch Vụ
                    </h1>
                    <p className="text-lg mt-2 ">
                        Khám phá các dịch vụ chất lượng hàng đầu tại phòng khám
                    </p>
                </div>

                {/* Service Grid */}
                <div
                    className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {services.length > 0 ? (
                        <LoopUtil
                            data={services}
                            render={(service, index) => (
                                <ServiceCard key={index} service={service} openDetails={(service) => {
                                    setServiceCurrent(service)
                                    setOpenServiceDetails(true)
                                }}/>
                            )}
                        />
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-600 text-lg italic">
                                Hiện tại chưa có dịch vụ nào.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-8 text-center mt-8">
                    <h2 className="text-2xl font-semibold">
                        Đặt lịch ngay hôm nay để nhận ưu đãi hấp dẫn!
                    </h2>
                    <Link to={"/uu-dai"}
                        className="inline-block mt-4 px-6 py-3 bg-yellow-400 text-blue-900 rounded-md text-lg font-bold hover:bg-yellow-300 transition">
                        Xem các ưu đãi
                    </Link>
                </div>
            </section>
            {serviceCurrent && <ServiceDetailsDialog service={serviceCurrent}
                                                     open={openServiceDetails}
                                                     onClose={() => {
                                                         setOpenServiceDetails(false)
                                                     }}/>}
        </Fragment>
    );
}
export default ServicePage;