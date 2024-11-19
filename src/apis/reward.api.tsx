import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout, Reward} from "@/apis/models.d";


const REWARD_URL_BASE: string = URL_API_BASE + "/api/rewards/v1";

export interface CreateRewardRequest {
    "points": number,
    "content": string
    "poster": string
}

async function create(data: CreateRewardRequest, token: string): Promise<IResponseLayout<Reward>> {
    const URL = REWARD_URL_BASE + "/new"
    const res = await axios.post<IResponseLayout<Reward>>(URL, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}

export interface RewardChangeOpenRequest {
    "listRewardId": number[],
    "isOpen": "ON" | "OFF"
}

async function changeOpen(data: RewardChangeOpenRequest, token: string): Promise<IResponseLayout<null>> {
    const URL = REWARD_URL_BASE + "/change-open"
    const res = await axios.post<IResponseLayout<null>>(URL, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}

async function getAllForAccountant(token: string, pageNumber: number, isDeleted: boolean): Promise<IResponseLayout<Reward[]>> {
    const URL = REWARD_URL_BASE + `/accountant/all?pageNumber=${pageNumber}&isDeleted=${isDeleted}`;
    const res = await axios.get<IResponseLayout<Reward[]>>(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data;
}

async function getAll(): Promise<IResponseLayout<Reward[]>> {
    const URL = REWARD_URL_BASE + "/all";
    const res = await axios.get<IResponseLayout<Reward[]>>(URL)
    return res.data;
}

async function del(token: string, rewardId: number): Promise<IResponseLayout<null>> {
    const URL = REWARD_URL_BASE + "/" + rewardId;
    const res = await axios.delete<IResponseLayout<null>>(URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}

export default {
    create,
    changeOpen,
    getAllForAccountant,
    getAll,
    del
}