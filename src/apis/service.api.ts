import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout,Service} from "@/apis/models";
const SERVICE_URL_BASE: string = URL_API_BASE + "/api/services/v1";

async function getAllServices():Promise<IResponseLayout<Service[]|[]>>{
    const getAllServiceURL: string = SERVICE_URL_BASE + "/all";
    const response = await axios.get<IResponseLayout<Service[]|[]>>(getAllServiceURL)
    console.log(response)
    return response.data;
}
async function getDetailsServices(id:number):Promise<IResponseLayout<Service|null>>{
    const getDetailsServiceURL: string = SERVICE_URL_BASE + "/" +  id;
    const response = await axios.post<IResponseLayout<Service|null>>(getDetailsServiceURL)
    return response.data;
}
export default{
    getAllServices,
    getDetailsServices
}
