import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import { User} from "@/apis/models";

const AUTH_URL_BASE: string = URL_API_BASE + "/api/users/v1";

async function getMyInfo(token:string):Promise<User>{
    const getMeURL = AUTH_URL_BASE + "/me"
    const response = await axios.get<User>(getMeURL,{
        headers:{
            "Authorization": "Bearer " + token,
        }
    });
    return response.data
}

export default {
    getMyInfo
}