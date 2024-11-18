import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {InvoiceForAccountant, InvoiceStatus, IResponseLayout} from "@/apis/models.d";


const INVOICE_URL_BASE: string = URL_API_BASE + "/api/invoices/v1";

export interface FindAllByInvoiceStatusResponse {
    "invoices": InvoiceForAccountant[]
    "pageCurrent": 0,
    "pageSize": 0
}

async function findAllByInvoiceStatus(status: InvoiceStatus, pageNumber: number, token: string):
    Promise<IResponseLayout<FindAllByInvoiceStatusResponse>> {
    const URL = INVOICE_URL_BASE + `/all/${pageNumber}/${status}`;
    const res = await axios.get<IResponseLayout<FindAllByInvoiceStatusResponse>>(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

export default {
    findAllByInvoiceStatus
}