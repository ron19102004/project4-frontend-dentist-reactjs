import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout} from "@/apis/models";

const AUTH_URL_BASE: string = URL_API_BASE + "/api/auth/v1";

async function verifyResetPassword(token: string): Promise<IResponseLayout<null>> {
    const verifyResetPasswordURL: string = AUTH_URL_BASE + "/verify-reset-password?token=" + token;
   try {
       const response = await axios.post<IResponseLayout<null>>(verifyResetPasswordURL)
       return response.data;
   } catch (e:any) {
       return e.response.data;
   }
}
async function login(){
    
}
export default {
    verifyResetPassword
}