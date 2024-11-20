import {URL_API_BASE} from "@/helper/constant.helper.ts";
import axios from "axios";
import {Gender, IResponseLayout, User} from "@/apis/models";

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

export interface IRegisterRequest {
    username: string;
    password: string;
    fullName: string;
    gender: Gender;
    phoneNumber: string;
    address: string;
    email: string;
}

async function register(body: IRegisterRequest): Promise<IResponseLayout<User>> {
    const URL = AUTH_URL_BASE + "/register"
    const res = await axios.post<IResponseLayout<User>>(URL, body)
    return res.data
}

export default {
    verifyResetPassword,
    login,
    register
}