import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {
    Accountant,
    Dentist,
    IResponseLayout,
    RewardHistory,
    RewardPoint,
    Role,
    User,
    UserDetailsForAdmin
} from "@/apis/models.d";

const USER_URL_BASE: string = URL_API_BASE + "/api/users/v1";

export interface IMyInfoDetailsResponse{
    user: User,
    dentist: Dentist | null,
    accountant: Accountant | null,
}
async function getMyInfo(token: string): Promise<IMyInfoDetailsResponse> {
    const getMeURL = USER_URL_BASE + "/me"
    const response = await axios.get<IMyInfoDetailsResponse>(getMeURL, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    });
    return response.data
}

async function getAllUsersDetailsForAdmin(token: string, pageNumber: number): Promise<IResponseLayout<UserDetailsForAdmin[]>> {
    const URL = USER_URL_BASE + "/admin/all-user-has-role?pageNumber=" + pageNumber;
    const res = await axios.get<IResponseLayout<UserDetailsForAdmin[]>>(URL, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
    return res.data
}

export interface CreateAccountantRequest {
    "userId": number,
    "phoneNumber": string,
    "email": string
}

export interface CreateDentistRequest extends CreateAccountantRequest {
    "specializeId": number,
    "description": string
}

async function createDentistOrAccountant(data: CreateAccountantRequest | CreateDentistRequest, token: string): Promise<IResponseLayout<null>> {
    const URL = USER_URL_BASE + "/new-dentist-or-accountant"
    const res = await axios.post<IResponseLayout<null>>(URL, data, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    })
    return res.data
}

export interface CheckUserExistResponse{
    "role": Role,
    "exist": boolean,
    "fullName": string,
    "username": string,
    "phone": string,
    "email": string,
}
async function checkUserExistResponse(userId:number, token: string): Promise<IResponseLayout<CheckUserExistResponse>> {
    const URL = USER_URL_BASE + "/admin/check-user-exist/" + userId;
    const res = await axios.post<IResponseLayout<CheckUserExistResponse>>(URL,{},{
        headers: {
            "Authorization": "Bearer " + token,
        }
    })

    return res.data
}
async function resetRole(userId:number,token:string):Promise<IResponseLayout<null>>{
    const URL = USER_URL_BASE + "/reset-role/" + userId;
    const res = await axios.post<IResponseLayout<null>>(URL, {},{
        headers:{
            "Authorization": "Bearer " + token,
        }
    })
    return res.data
}
export interface IMyRewardHistoriesDataResponse{
    rewardPoint: RewardPoint,
    rewardHistories: RewardHistory[]
}
async function getMyRewardHistories(token:string):Promise<IResponseLayout<IMyRewardHistoriesDataResponse>>{
    const URL = USER_URL_BASE + "/my-reward-history"
    const res = await axios.get<IResponseLayout<IMyRewardHistoriesDataResponse>>(URL, {
        headers:{
            "Authorization": "Bearer " + token,
        }
    })
    return res.data
}
async function useReward(token:string,rewardId:number):Promise<IResponseLayout<RewardHistory>> {
    const URL = USER_URL_BASE + "/my-reward/use-point/"+rewardId;
    const res = await axios.post<IResponseLayout<RewardHistory>>(URL,{}, {
        headers:{
            "Authorization": "Bearer " + token,
        }
    })
    return res.data
}
export default {
    getMyInfo,
    getAllUsersDetailsForAdmin,
    createDentistOrAccountant,
    checkUserExistResponse,
    resetRole,
    getMyRewardHistories,
    useReward
}