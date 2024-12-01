import {MyBookingData} from "@/apis/models.d";
import appointmentUserApi, {BookingAppointmentRequest} from "@/apis/appointment-user.api.ts";

interface IUseAppointmentUser {
    getAllMyBooking: () => Promise<MyBookingData[]>;
    bookingReq: (body: BookingAppointmentRequest, success: () => void, error: (message: string) => void) => Promise<void>
    addRewardIntoAppointment: (appointmentId: number, rewardHistoryId: number, success: () => void, error: (message: string) => void) => Promise<void>
}

const useAppointmentUser = (token: string): IUseAppointmentUser => {
    const addRewardIntoAppointment = async (
        appointmentId: number,
        rewardHistoryId: number,
        success: () => void,
        error: (message: string) => void) => {
        try {
            const res = await appointmentUserApi.addRewardIntoAppointment(token,appointmentId,rewardHistoryId)
            if (res.success) {
                success();
                return;
            }
            error(res.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response.data.message)
        }
    }
    const getAllMyBooking = async () => {
        try {
            const data = await appointmentUserApi.getAllMyBooking(token)
            return data.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
    const bookingReq = async (
        body: BookingAppointmentRequest,
        success: () => void,
        error: (message: string) => void) => {
        try {
            const res = await appointmentUserApi.bookingAppointment(token, body)
            if (res.success) {
                success();
                return;
            }
            error(res.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response.data.message)
        }
    }
    return {
        getAllMyBooking,
        bookingReq,
        addRewardIntoAppointment
    }
}
export default useAppointmentUser