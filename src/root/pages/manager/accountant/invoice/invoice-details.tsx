import * as React from 'react';
import {FC} from 'react';
import Dialog from '@mui/material/Dialog';
import {InvoiceForAccountant, InvoiceStatus} from "@/apis/models.d";
import {cn} from "@/lib/cn.ts";
import {useBoolean} from "@/hooks";

interface IInvoiceDetailsDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    invoice: InvoiceForAccountant
}

const InvoiceDetailsDialog: FC<IInvoiceDetailsDialogProps> = ({isOpen, setOpen, invoice}) => {
    const {value: isOpenAddRewardHistory, setValue: setIsOpenAddRewadHistory} = useBoolean()
    const {value: isOpenAddPercentDiscount, setValue: setIsOpenAddPercentDiscount} = useBoolean()
    const handleClose = () => {
        setOpen(false);
    };
    const addRewardHistory = async () =>{
        setIsOpenAddRewadHistory(false)
    }
    const addPercentDiscount= async ()=>{
        setIsOpenAddPercentDiscount(false)
    }
    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <div
                    className="container mx-auto p-6 space-y-6 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-4">
                        <h2 className="text-xl font-semibold text-blue-700">
                            Chi tiết thanh toán - ID: {invoice.appointmentId}
                        </h2>
                        <span
                            className={cn(`px-3 py-1 rounded-md text-sm font-semibold}`, {
                                "bg-yellow-500 text-white": invoice.invoiceStatus === InvoiceStatus.PENDING,
                                "bg-green-500 text-white": invoice.invoiceStatus === InvoiceStatus.PAID,
                                "bg-red-500 text-white": invoice.invoiceStatus === InvoiceStatus.CANCELLED
                            })}
                        >
                             {invoice.invoiceStatus}
                        </span>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Tên khách hàng</h3>
                            <p className="text-gray-800">{invoice.patientName}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Mã hồ sơ</h3>
                            <p className="text-gray-800">{invoice.appointmentId}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Thời gian khởi tạo</h3>
                            <p className="text-gray-800">{new Date(invoice.createdAt).toLocaleString()}</p>
                        </div>
                        {invoice.updatedAt && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500">Cập nhật mới nhất</h3>
                                <p className="text-gray-800">{new Date(invoice.updatedAt).toLocaleString()}</p>
                            </div>
                        )}
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Thông tin thanh toán</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500">Tổng tiền phải thanh toán</h4>
                                <p className="text-gray-800">${invoice.payment.amountPaid.toFixed(2)}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-500">Loại thanh toán</h4>
                                <p className="text-gray-800">{invoice.payment.paymentType}</p>
                            </div>
                            {invoice.payment.discountPercent !== null && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Phần trăm giảm giá</h4>
                                    <p className="text-gray-800">{invoice.payment.discountPercent}%</p>
                                </div>
                            )}
                            {invoice.payment.paymentDate && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Ngày thanh toán</h4>
                                    <p className="text-gray-800">{new Date(invoice.payment.paymentDate).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Reward History */}
                    {invoice.rewardHistory && (
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">Lịch sử đổi thưởng</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Điểm đã đổi</h4>
                                    <p className="text-gray-800">{invoice.rewardHistory.pointsUsed}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Nội dung</h4>
                                    <p className="text-gray-800">{invoice.rewardHistory.content}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Thời gian đổi điểm thưởng</h4>
                                    <p className="text-gray-800">
                                        {new Date(invoice.rewardHistory.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Invoice Services */}
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Các dịch vụ đã dùng</h3>
                        <ul className="space-y-3">
                            {invoice.invoiceServiceList.map((service) => (
                                <li key={service.nameServiceCurrent} className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500">{service.nameServiceCurrent}</h4>
                                        <p className="text-gray-800">
                                            Điểm thưởng: {service.pointRewardCurrent} | Giá: $
                                            {service.priceServiceCurrent.toFixed(2)}
                                        </p>
                                    </div>
                                    <span className="text-gray-400 text-xs">
                                        {new Date(service.createdAt).toLocaleString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {invoice.accountant && (
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">Thu ngân thực hiện</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Email</h4>
                                    <p className="text-gray-800">{invoice.accountant.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Số điện thoại</h4>
                                    <p className="text-gray-800">{invoice.accountant.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={"grid grid-cols-2 gap-2"}>
                        {(invoice.invoiceStatus === InvoiceStatus.PENDING && invoice.rewardHistory === null && !isOpenAddRewardHistory) &&
                            <div>
                                <button
                                    onClick={() => {
                                        setIsOpenAddRewadHistory(true)
                                    }}
                                    className="w-full rounded-md bg-red-600 py-1 px-2 border border-transparent text-center
                                 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700
                                 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none
                                 disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Thêm mã đổi thưởng
                                </button>
                            </div>}
                        {(invoice.invoiceStatus === InvoiceStatus.PENDING && invoice.payment.discountPercent === null && !isOpenAddPercentDiscount) &&
                            <div>
                                <button
                                    onClick={() => {
                                        setIsOpenAddPercentDiscount(true)
                                    }}
                                    className="w-full rounded-md bg-red-600 py-1 px-2 border border-transparent
                                 text-center text-sm text-white transition-all shadow-md hover:shadow-lg
                                 focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700
                                 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Thêm phần trăm giảm giá
                                </button>
                            </div>}
                        {(invoice.invoiceStatus === InvoiceStatus.PENDING) && <div>
                            <button
                                className="w-full rounded-md bg-red-600 py-1 px-2 border border-transparent
                                 text-center text-sm text-white transition-all shadow-md hover:shadow-lg
                                 focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700
                                 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                Xác nhận đã thanh toán
                            </button>
                        </div>}
                    </div>
                    {isOpenAddRewardHistory && <div className="flex flex-col items-start space-y-4 w-full md:w-auto">
                        <label htmlFor="promoCode" className="text-sm font-medium text-gray-700">
                            Thêm mã đổi thưởng
                        </label>
                        <div className="flex items-center space-x-2 w-full md:w-auto">
                            <input
                                id="promoCode"
                                type="number"
                                className="block w-full md:w-64 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Nhập mã đổi thưởng"
                            />
                            <button
                                onClick={addRewardHistory}
                                type="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>}
                    {isOpenAddPercentDiscount && <div className="flex flex-col items-start space-y-4 w-full md:w-auto">
                        <label htmlFor="promoCodeDiscount" className="text-sm font-medium text-gray-700">
                            Thêm phần trăm giảm giá
                        </label>
                        <div className="flex items-center space-x-2 w-full md:w-auto">
                            <input
                                id="promoCodeDiscount"
                                type="number"
                                className="block w-full md:w-64 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Nhập phần trăm giảm giá"
                            />
                            <button
                                onClick={addPercentDiscount}
                                type="button"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>}
                </div>
            </Dialog>
        </React.Fragment>
    );
}
export default InvoiceDetailsDialog