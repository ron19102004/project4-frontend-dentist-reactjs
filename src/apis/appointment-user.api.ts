import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout, MyBookingData} from "@/apis/models.d";

const APPOINTMENT_USER_URL_BASE: string = URL_API_BASE + "/api/users/appointments/v1";

async function getAllMyBooking(token: string): Promise<IResponseLayout<MyBookingData[]>> {
    const URL = APPOINTMENT_USER_URL_BASE + "/my-booking/all"
    const res = await axios.get<IResponseLayout<MyBookingData[]>>(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}

export interface BookingAppointmentRequest {
    "appointmentDate": string,
    "appointmentNote": string,
    "services": number[],
    "dentistId": number
}

async function bookingAppointment(token: string, body: BookingAppointmentRequest): Promise<IResponseLayout<number | any>> {
    const URL = APPOINTMENT_USER_URL_BASE + "/booking"
    const res = await axios.post<IResponseLayout<number | any>>(URL, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}

async function addRewardIntoAppointment(
    token: string,
    appointmentId: number,
    rewardHistoryId: number): Promise<IResponseLayout<null>> {
    const URL = APPOINTMENT_USER_URL_BASE + "/invoice/add-reward/" + appointmentId + "/" + rewardHistoryId
    const res = await axios.post<IResponseLayout<null>>(URL, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}

export default {
    getAllMyBooking,
    bookingAppointment,
    addRewardIntoAppointment
}