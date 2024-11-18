import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {IResponseLayout, User} from "@/apis/models";

const AUTH_URL_BASE: string = URL_API_BASE + "/api/auth/v1";

async function verifyResetPassword(token: string): Promise<IResponseLayout<null>> {
    const verifyResetPasswordURL: string = AUTH_URL_BASE + "/verify-reset-password?token=" + token;
    try {
        const response = await axios.post<IResponseLayout<null>>(verifyResetPasswordURL)
        return response.data;
    } catch (e: any) {
        return e.response.data;
    }
}

export interface ILoginResponse {
    "accessToken": string,
    "refreshToken": string,
    "user": User
}

async function login(username: string, password: string): Promise<IResponseLayout<ILoginResponse>> {
    const loginURL: string = AUTH_URL_BASE + "/login"
    const response = await axios.post<IResponseLayout<ILoginResponse>>(loginURL, {
        username: username,
        password: password,
    })
    return response.data
}

export default {
    verifyResetPassword,
    login
}