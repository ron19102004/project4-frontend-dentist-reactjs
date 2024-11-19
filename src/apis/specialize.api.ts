import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout, Specialize} from "@/apis/models.d";


const SPECIALIZE_URL_BASE: string = URL_API_BASE + "/api/specializes/v1";

export interface CreateSpecializeRequest {
    "name": string,
    "description": string
}

async function create(data: CreateSpecializeRequest, token: string): Promise<IResponseLayout<Specialize>> {
    const URL = SPECIALIZE_URL_BASE + "/new"
    const res = await axios.post<IResponseLayout<Specialize>>(URL, data, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    });
    return res.data
}

async function getAll(): Promise<IResponseLayout<Specialize[]>> {
    const URL = SPECIALIZE_URL_BASE + "/all";
    const res = await axios.get<IResponseLayout<Specialize[]>>(URL)
    return res.data
}

async function del(specializeId: number, token: string): Promise<IResponseLayout<null>> {
    const URL = SPECIALIZE_URL_BASE + "/" + specializeId
    const res = await axios.delete<IResponseLayout<null>>(URL, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
    return res.data
}

export type UpdateSpecializeRequest = CreateSpecializeRequest

async function update(data: UpdateSpecializeRequest, token: string, specializeId: number): Promise<IResponseLayout<null>> {
    const URL = SPECIALIZE_URL_BASE + "/" + specializeId
    const res = await axios.put<IResponseLayout<null>>(URL, data, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
    return res.data
}
async function getById(id: number): Promise<IResponseLayout<Specialize>> {
    const URL = SPECIALIZE_URL_BASE + "/" + id;
    const res = await axios.get<IResponseLayout<Specialize>>(URL)
    return res.data
}
export default {
    create,
    getAll,
    del,
    update,
    getById
}