import {MyBookingData} from "@/apis/models.d";
import appointmentUserApi from "@/apis/appointment-user.api.tsx";

interface IUseAppointmentUser {
    getAllMyBooking: () => Promise<MyBookingData[]>;
}

const useAppointmentUser = (token: string): IUseAppointmentUser => {
    const getAllMyBooking = async () => {
        try {
            const data = await appointmentUserApi.getAllMyBooking(token)
            return data.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
    return {
        getAllMyBooking
    }
}
export default useAppointmentUser