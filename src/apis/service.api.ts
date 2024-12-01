import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout, Service, ServiceHot} from "@/apis/models";
import {CreateServiceFormData} from "@/root/pages/manager/accountant/service/create.tsx";

const SERVICE_URL_BASE: string = URL_API_BASE + "/api/services/v1";

async function getAllServices(): Promise<IResponseLayout<Service[] | []>> {
    const getAllServiceURL: string = SERVICE_URL_BASE + "/all";
    const response = await axios.get<IResponseLayout<Service[] | []>>(getAllServiceURL)
    return response.data;
}

async function getDetailsServices(id: number): Promise<IResponseLayout<Service | null>> {
    const getDetailsServiceURL: string = SERVICE_URL_BASE + "/" + id;
    const response = await axios.get<IResponseLayout<Service | null>>(getDetailsServiceURL)
    return response.data;
}

async function createService(dataForm: CreateServiceFormData, token: string): Promise<IResponseLayout<Service | null>> {
    const createServiceURL: string = SERVICE_URL_BASE + "/new";
    const response = await axios.post<IResponseLayout<Service | null>>(createServiceURL, dataForm, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}
async function getServiceHot():Promise<IResponseLayout<ServiceHot[]>>{
    const URL = SERVICE_URL_BASE + "/hot";
    const response = await axios.get<IResponseLayout<ServiceHot[]>>(URL)
    return response.data
}
export default {
    getAllServices,
    getDetailsServices,
    createService,
    getServiceHot
}
