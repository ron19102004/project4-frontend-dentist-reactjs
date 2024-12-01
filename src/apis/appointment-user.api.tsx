import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout, MyBookingData} from "@/apis/models.d";

const APPOINTMENT_USER_URL_BASE: string = URL_API_BASE + "/api/users/appointments/v1";

async function getAllMyBooking(token:string):Promise<IResponseLayout<MyBookingData[]>>{
    const URL =  APPOINTMENT_USER_URL_BASE+"/my-booking/all"
    const res = await axios.get<IResponseLayout<MyBookingData[]>>(URL,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}
export default {
    getAllMyBooking
}