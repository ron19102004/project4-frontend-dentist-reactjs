import {InvoiceStatus} from "@/apis/invoice.api.tsx";

export interface IResponseLayout<D> {
    success: boolean;
    message: string;
    data: D
}

export interface Entity {
    id: number
}

export interface Service extends Entity {
    "createdAt": string,
    "description": string,
    "poster": string,
    "name":string,
    "slug": string,
    "price": number,
    "pointReward": number
}
export interface ServiceHot {
    "description": string,
    "poster": string,
    "name": string,
    "slug": string,
    "price": number,
    "pointReward": number,
    "quantityUsed": number,
    "serviceId":number
}
export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export enum Role {
    DENTIST = "DENTIST",
    ADMIN = "ADMIN",
    PATIENT = "PATIENT",
    ACCOUNTANT = "ACCOUNTANT",
}

export interface RewardPoint {
    "point": number,
    "pointsUsed": number,
    "lastUpdatedAt": string
}

export interface RewardHistory {
    "id": number,
    "pointsUsed": number,
    "content": string,
    "createdAt": string,
    "used": boolean
}

export interface User extends Entity {
    "createdAt": string,
    "username": string,
    "fullName": string,
    "gender": Gender,
    "phoneNumber": string,
    "address": string,
    "email": string,
    "activeTwoFactorAuthentication": boolean
    "rewardPoint": RewardPoint,
    "role": Role,
}

export interface Payment extends Entity {
    "id": number,
    "paymentDate": string | null,
    "amountPaid": number,
    "paymentType": "CASH",
    "discountPercent": number | null
}

export interface RewardHistory extends Entity {
    "createdAt": string,
    "pointsUsed": number,
    "content": string
}

export interface InvoiceService extends Entity {
    "createdAt": string,
    "priceServiceCurrent": number,
    "nameServiceCurrent": string,
    "pointRewardCurrent": number
}

export interface Accountant extends Entity {
    "email": string,
    "phoneNumber": string,
    "createdAt": string,
    "avatar":string
}

export enum InvoiceStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
}

export interface InvoiceForAccountant {
    "appointmentId": number,
    "rewardHistory": RewardHistory | null,
    "payment": Payment,
    "invoiceServiceList": InvoiceService[],
    "amountOriginPaid": number,
    "accountant": Accountant | null,
    "patientName": string,
    "invoiceStatus": InvoiceStatus,
    "createdAt": string,
    "updatedAt": string | null
}

export interface Reward {
    "id": number,
    "createdAt": string,
    "points": number,
    "content": string,
    "poster": string | null,
    "isOpened": boolean
}

export interface Specialize extends Entity {
    "createdAt": string,
    "name": string,
    "slug": string,
    "description": string
}

export interface Dentist extends Entity {
    "email": string,
    "phoneNumber": string,
    "createdAt": string,
    "description": string,
    "specialize": Specialize,
    "avatar":string
}
export interface DentistResponse{
    dentist: Dentist,
    fullName: string,
    id: number
}
export interface Accountant extends Entity {
    "email": string,
    "phoneNumber": string,
    "createdAt": string
}

export interface UserDetailsForAdmin extends Entity {
    "username": string,
    "role": Role,
    "fullName": string,
    "dentist": Dentist | null,
    "accountant": Accountant | null,
    "email": string,
    "phone": string
}

export enum AppointmentStatus {
    SCHEDULED="SCHEDULED",
    COMPLETED="COMPLETED",
    CANCELLED="CANCELLED",
}
export interface Appointment {
    "id": number,
    "createdAt": string,
    "appointmentDate": string,
    "status": AppointmentStatus,
    "notes": string
}

export interface DentalRecord {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "examinationDate": string,
    "diagnosis": string,
    "treatment": string,
    "notes": string
}
export enum PaymentType {
    CASH="CASH",
    CREDIT_CARD="CREDIT_CARD",
    BANK_TRANSFER="BANK_TRANSFER",
}

export interface Payment {
    "id": number,
    "paymentDate": string,
    "amountPaid": number,
    "paymentType": PaymentType,
    "discountPercent": number
}

export interface InvoiceService {
    "id": number,
    "createdAt": string,
    "priceServiceCurrent": number,
    "nameServiceCurrent": string,
    "pointRewardCurrent": number
}
export enum InvoiceStatus {
    PENDING="PENDING",
    PAID="PAID",
    CANCELLED="CANCELLED",
}

export interface Invoice {
    "id": number,
    "createdAt": string,
    "updatedAt": string,
    "status": InvoiceStatus,
    "amountOriginPaid": number,
    rewardHistory: RewardHistory | null,
}

interface MyBookingData {
    appointment: Appointment,
    invoice: Invoice,
    payment: Payment,
    dentist:DentistResponse,
    user: User,
    invoiceServices: InvoiceService[],
    accountant: Accountant | null,
    dentalRecord: DentalRecord|null
}
