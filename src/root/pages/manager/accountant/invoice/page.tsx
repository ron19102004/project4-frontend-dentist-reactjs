import {ChangeEvent, FC, Fragment, useEffect, useState} from "react";
import HeadUtil from "../../../../../components/utils/head.util.tsx";
import {useAuth, useBoolean} from "@/hooks";
import useInvoice from "@/hooks/useInvoice.tsx";
import {InvoiceForAccountant, InvoiceStatus} from "@/apis/models.d";
import {LoopUtil} from "@/components/utils";
import dateFormat from "@/components/utils/date-format.ts";
import {FindAllByInvoiceStatusResponse} from "@/apis/invoice.api.tsx";
import InvoiceDetailsDialog from "@/root/pages/manager/accountant/invoice/invoice-details.tsx";
import {cn} from "@/lib/cn.ts";
import useDebounce from "@/hooks/useDebounce.hook.tsx";

const AccountantInvoicePage: FC = () => {
    const {accessToken} = useAuth()!
    const {getInvoicesByStatusAndPage, getInvoicesByAppointmentIdAndStatusAndPage} = useInvoice(accessToken)
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatus>(InvoiceStatus.PENDING);
    const [searchByAppointmentId, setSearchByAppointmentId] = useState<number>(0)
    const searchByAppointmentDebounce = useDebounce<number>(searchByAppointmentId, 500)
    const {value: isOpenInvoiceDetails, setValue: setIsOpenInvoiceDetails} = useBoolean()
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceForAccountant | null>(null);
    const [listInvoice, setListInvoice] = useState<InvoiceForAccountant[]>([]);
    const [listInvoiceByAppointmentId, setListInvoiceByAppointmentId] = useState<InvoiceForAccountant[]>([]);
    const initialize = async (pageCurrent: number, status: InvoiceStatus) => {
        const invoices: FindAllByInvoiceStatusResponse | null = await getInvoicesByStatusAndPage(pageCurrent, status);
        if (invoices != null) {
            setListInvoice(invoices.invoices)
        }
    }
    const findInvoiceByAppointmentIdHandler = async (
        pageCurrent: number,
        status: InvoiceStatus,
        appointmentId: number) => {
        const invoices: FindAllByInvoiceStatusResponse | null = await getInvoicesByAppointmentIdAndStatusAndPage(appointmentId, pageCurrent, status);
        if (invoices != null) {
            setListInvoiceByAppointmentId(invoices.invoices)
        }
    }
    useEffect(() => {
        initialize(pageNumber, invoiceStatus).then()
    }, [])
    useEffect(() => {
        if (searchByAppointmentDebounce > 0) {
            setPageNumber(1)
            findInvoiceByAppointmentIdHandler(1, invoiceStatus, searchByAppointmentDebounce).then()
        }
    }, [searchByAppointmentDebounce]);

    const handlePageChange = async (type: "plus" | "minus") => {
        if (pageNumber > 0 && (listInvoice.length === 10 || listInvoiceByAppointmentId.length === 10)) {
            let pageNew = pageNumber;
            if (type === "plus") {
                pageNew += 1
                setPageNumber(pageNew);
            } else if (type === "minus") {
                pageNew -= 1
                setPageNumber(pageNew);
            }
            await initialize(pageNew, invoiceStatus)
        }
    };
    const invoiceStatusChangeEvent = async (event: ChangeEvent<HTMLSelectElement>) => {
        const invoiceStatus: InvoiceStatus = event.target.value as InvoiceStatus
        setInvoiceStatus(invoiceStatus)
        setPageNumber(1);
        await initialize(1, invoiceStatus)
    }

    return <Fragment>
        <HeadUtil
            title={"Quản lý hóa đơn"}
            author={""}
            urlImage={""}
            urlPageCurrent={""}
        />
        <section className={"max-w-screen px-4 pt-2"}>
            <div className="flex items-center justify-between py-4 text-white">
                <div className="flex items-center md:justify-between md:space-x-4 w-full gap-2">
                    <div className="flex flex-col items-start space-y-2 w-full md:w-auto">
                        <label className="text-sm font-medium text-gray-700">
                            Bộ lọc trạng thái hóa đơn
                        </label>
                        <select
                            value={invoiceStatus}
                            className="block w-full md:w-auto px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                            onChange={invoiceStatusChangeEvent}
                        >
                            <LoopUtil
                                data={Object.values(InvoiceStatus)}
                                render={(status) => (
                                    <option
                                        value={status}
                                        className="text-gray-700 bg-gray-50 hover:bg-gray-100"
                                    >
                                        {status}
                                    </option>
                                )}
                            />
                        </select>
                    </div>
                    <div className="flex flex-col items-start space-y-2 w-full md:w-auto">
                        <label className="text-sm font-medium text-gray-700">
                            Tìm kiếm
                        </label>
                        <input
                            onChange={async (e) => {
                                const value = parseInt(e.target.value);
                                if (value > 0) {
                                    setSearchByAppointmentId(value);
                                } else if (e.target.value === '') {
                                    setSearchByAppointmentId(0);
                                    setPageNumber(1)
                                    await initialize(1, invoiceStatus)
                                }
                            }}
                            placeholder={"Nhập mã hồ sơ"}
                            type="number"
                            className={"block w-full md:w-auto px-3 py-2 border border-gray-300 bg-white" +
                                " rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" +
                                " focus:border-blue-500 sm:text-sm text-black"}/>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr className={"bg-gray-700 text-white"}>
                        <th className="border border-gray-200 px-4 py-2 text-left">ID Hóa Đơn</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Tên khách hàng</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Giá</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Trạng thái</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Thời gian tạo</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <LoopUtil
                        data={searchByAppointmentId > 0 ? listInvoiceByAppointmentId : listInvoice}
                        render={invoice => {
                            console.log(invoice)
                            return <tr className="hover:bg-gray-50 shadow">
                                <td className="border border-gray-200 px-4 py-2">
                                    <span className={"font-semibold"}>{invoice.appointmentId}</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">{invoice.patientName}</td>
                                <td className="border border-gray-200 px-4 py-2">{invoice.payment.amountPaid}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <span className={cn('font-semibold px-2 py-1 rounded', {
                                        "bg-green-200 text-green-700": invoice.invoiceStatus === InvoiceStatus.PAID,
                                        "bg-red-200 text-red-700": invoice.invoiceStatus === InvoiceStatus.CANCELLED,
                                        "bg-yellow-200 text-yellow-700": invoice.invoiceStatus === InvoiceStatus.PENDING
                                    })}>{invoice.invoiceStatus}</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">{dateFormat(invoice.createdAt)}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        onClick={() => {
                                            setInvoiceDetails(invoice)
                                            setIsOpenInvoiceDetails(true)
                                        }}
                                        className="rounded-md bg-gray-600 hover:bg-gray-700 py-2 px-4 border border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                        type="button">
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        }}
                    />
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                    onClick={async () => {
                        await handlePageChange('minus')
                    }}
                    className="flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-600 font-medium rounded-md hover:bg-gray-200 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                    </svg>
                    Trang trước
                </button>
                <span className="text-sm font-semibold text-gray-700">
                        Trang {pageNumber}
                    </span>
                <button
                    onClick={async () => {
                        await handlePageChange('plus')
                    }}
                    className="flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-600 font-medium rounded-md hover:bg-gray-200 transition"
                >
                    Trang sau
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                </button>
            </div>
        </section>
        {invoiceDetails && <InvoiceDetailsDialog invoice={invoiceDetails}
                                                 isOpen={isOpenInvoiceDetails}
                                                 setOpen={setIsOpenInvoiceDetails}/>}
        {/*<EditServiceDialog isOpen={isOpenEditDialog}*/}
        {/*                   setOpen={setIsOpenEdit}*/}
        {/*                   service={serviceEdit}/>*/}
        {/*<CreateServiceDialog isOpen={isOpenCreateDialog} setOpen={setIsOpenCreate}/>*/}
        {/*<Dialog*/}
        {/*    style={{backgroundColor: "transparent"}}*/}
        {/*    open={isServicesFetching}*/}
        {/*>*/}
        {/*    <section className={"m-5 flex flex-col justify-center items-center"}>*/}
        {/*        <CircularProgress/>*/}
        {/*    </section>*/}
        {/*</Dialog>*/}
    </Fragment>
}
export default AccountantInvoicePage
