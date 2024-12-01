import appointmentDentistApi, {
    AppointmentDateDentistCheckResponse,
    AppointmentForDentist, UpdateDentalRecordRequest
} from "@/apis/appointment-dentist.api.ts";
import {AppointmentStatus, MyBookingData} from "@/apis/models.d";

interface IUseAppointmentDentist {
    getListDateAppointmentCheck: (dentistId: number) => Promise<AppointmentDateDentistCheckResponse[]>
    getAllAppointmentInDate: (date: string, status: AppointmentStatus) => Promise<AppointmentForDentist | null>
    getAppointmentById: (appointmentId: number) => Promise<MyBookingData | null>,
    updateDentalRecord: (appointmentId: number, body: UpdateDentalRecordRequest, success: () => void, error: (message: string) => void) => Promise<void>
    changeStatusAppointment: (appointmentId: number, appointmentStatus: AppointmentStatus, success: () => void, error: (message: string) => void) => Promise<void>
}

const useAppointmentDentist = (token?: string): IUseAppointmentDentist => {
    const changeStatusAppointment = async (
        appointmentId: number,
        appointmentStatus: AppointmentStatus,
        success: () => void,
        error: (message: string) => void) => {
        if (token) {
            try {
                const data = await appointmentDentistApi.changeStatusAppointment(token,appointmentId,appointmentStatus)
                if (data.success) {
                    success();
                    return
                }
                error(data.message)
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                error(e?.response.data.message)
            }
        } else {
            error("Thiếu token")
        }
    }
    const updateDentalRecord = async (
        appointmentId: number,
        body: UpdateDentalRecordRequest,
        success: () => void,
        error: (message: string) => void) => {
        if (token) {
            try {
                const data = await appointmentDentistApi.updateDentalRecord(token, appointmentId, body);
                if (data.success) {
                    success();
                    return
                }
                error(data.message)
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                error(e?.response.data.message)
            }
        } else {
            error("Thiếu token")
        }
    }
    const getListDateAppointmentCheck = async (dentistId: number) => {
        try {
            const data = await appointmentDentistApi.getListToCheckAppointmentDentist(dentistId)
            return data.data
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return []
        }
    }
    const getAllAppointmentInDate = async (date: string, status: AppointmentStatus) => {
        if (token) {
            const res = await appointmentDentistApi.getAllAppointmentInDate(token, status, date);
            if (res.success) return res.data
            return null
        } else {
            console.log("Thiếu TOKEN ở useAppointmentDentist")
            return null;
        }
    }
    const getAppointmentById = async (appointmentId: number) => {
        if (token) {
            const res = await appointmentDentistApi.getAppointmentById(appointmentId, token);
            if (res.success) return res.data
            return null
        } else {
            console.log("Thiếu TOKEN ở useAppointmentDentist")
            return null;
        }
    }
    return {
        getListDateAppointmentCheck,
        getAllAppointmentInDate,
        getAppointmentById,
        updateDentalRecord,
        changeStatusAppointment
    }
}
export default useAppointmentDentist