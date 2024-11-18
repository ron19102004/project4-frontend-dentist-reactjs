import {InvoiceStatus} from "@/apis/models.d";
import invoiceApi, {FindAllByInvoiceStatusResponse} from "@/apis/invoice.api.tsx";

interface IUseInvoice {
    getInvoicesByStatusAndPage: (pageNumber: number, status: InvoiceStatus) => Promise<FindAllByInvoiceStatusResponse | null>;
}

const useInvoice = (token: string): IUseInvoice => {
    const getInvoicesByStatusAndPage = async (pageNumber: number, status: InvoiceStatus) => {
        const data = await invoiceApi.findAllByInvoiceStatus(status, pageNumber, token);
        if (data.success) return data.data
        return null
    }
    return {
        getInvoicesByStatusAndPage
    }
}
export default useInvoice;