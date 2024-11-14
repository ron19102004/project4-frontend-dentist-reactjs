import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout,Service} from "@/apis/models";
const SERVICE_URL_BASE: string = URL_API_BASE + "/api/services/v1";

async function getAllServices():Promise<IResponseLayout<Service[]|[]>>{
    const getAllServiceURL: string = SERVICE_URL_BASE + "/";
    const response = await axios.post<IResponseLayout<Service[]|[]>>(getAllServiceURL)
    return response.data;
}
async function getDetailsServices(id:number):Promise<IResponseLayout<Service|null>>{
    const getAllServiceURL: string = SERVICE_URL_BASE + "/" +  id;
    const response = await axios.post<IResponseLayout<Service|null>>(getAllServiceURL)
    return response.data;
}
export default{
    getAllServices,
    getDetailsServices
}
