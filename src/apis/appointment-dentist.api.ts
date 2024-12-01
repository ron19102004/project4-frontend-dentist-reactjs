import {URL_API_BASE} from "@/helper/constant.helper.ts";
import {AppointmentStatus, IResponseLayout, MyBookingData} from "@/apis/models.d";
import axios from "axios";

const APPOINTMENT_DENTIST_URL_BASE: string = URL_API_BASE + "/api/dentists/appointments/v1";

export interface AppointmentDateDentistCheckResponse {
    "appointmentDate": string,
    "quantity": number
}

async function getListToCheckAppointmentDentist(dentistId: number): Promise<IResponseLayout<AppointmentDateDentistCheckResponse[]>> {
    const URL = APPOINTMENT_DENTIST_URL_BASE + "/" + dentistId + "/in-7-days-later"
    const res = await axios.get<IResponseLayout<AppointmentDateDentistCheckResponse[]>>(URL)
    return res.data
}

export interface AppointmentForDentist {
    appointments: MyBookingData[],
    size: number
}

async function getAllAppointmentInDate(token: string, status: AppointmentStatus, date: string): Promise<IResponseLayout<AppointmentForDentist>> {
    const URL = APPOINTMENT_DENTIST_URL_BASE + "/all"
    const res = await axios.post<IResponseLayout<AppointmentForDentist>>(URL, {
        "date": date,
        "status": status
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}

async function getAppointmentById(appointmentId: number, token: string): Promise<IResponseLayout<MyBookingData>> {
    const URL = APPOINTMENT_DENTIST_URL_BASE + "/booking/" + appointmentId
    const res = await axios.get<IResponseLayout<MyBookingData>>(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}

export interface UpdateDentalRecordRequest {
    "diagnosis": string,
    "treatment": string,
    "notes": string,
}
async function updateDentalRecord(token: string, appointmentId: number, body: UpdateDentalRecordRequest): Promise<IResponseLayout<null>> {
    const URL = APPOINTMENT_DENTIST_URL_BASE + "/" + appointmentId + "/edit"
    const res = await axios.patch<IResponseLayout<null>>(URL, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}
async function changeStatusAppointment(token: string, appointmentId: number,status:AppointmentStatus):Promise<IResponseLayout<null>>{
    const URL = APPOINTMENT_DENTIST_URL_BASE +"/change-status-appointment/"+appointmentId+"/"+status
    const res = await axios.post<IResponseLayout<null>>(URL,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}
export default {
    getListToCheckAppointmentDentist,
    getAllAppointmentInDate,
    getAppointmentById,
    updateDentalRecord,
    changeStatusAppointment
}