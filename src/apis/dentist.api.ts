import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {DentistResponse, IResponseLayout} from "@/apis/models.d";

const DENTIST_URL_BASE: string = URL_API_BASE + "/api/dentists/v1";

async function getById(id: number):Promise<IResponseLayout<DentistResponse>> {
    const URL = DENTIST_URL_BASE + "/" + id;
    const res = await axios.get<IResponseLayout<DentistResponse>>(URL);
    return res.data;
}
async function getAll():Promise<IResponseLayout<DentistResponse[]>> {
    const URL = DENTIST_URL_BASE + "/all" ;
    const res = await axios.get<IResponseLayout<DentistResponse[]>>(URL);
    return res.data;
}
export default {
    getById,
    getAll
}