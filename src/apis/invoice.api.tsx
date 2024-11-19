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
    const URL = INVOICE_URL_BASE + `/all?pageNumber=${pageNumber}&status=${status}`;
    const res = await axios.get<IResponseLayout<FindAllByInvoiceStatusResponse>>(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

async function findAllByAppointmentIdInvoiceStatus(status: InvoiceStatus, pageNumber: number,appointmentId:number, token: string):
    Promise<IResponseLayout<FindAllByInvoiceStatusResponse>> {
    const URL = INVOICE_URL_BASE + `/all?pageNumber=${pageNumber}&status=${status}&appointmentId=${appointmentId}`;
    const res = await axios.get<IResponseLayout<FindAllByInvoiceStatusResponse>>(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}


export default {
    findAllByInvoiceStatus,
    findAllByAppointmentIdInvoiceStatus
}