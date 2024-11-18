import {IResponseLayout, User} from "@/apis/models";
import authApi, {ILoginResponse} from "@/apis/auth.api.ts";
import userApi from "@/apis/user.api.ts";
import useBoolean from "@/hooks/useBoolean.hook.tsx";
import {useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {AuthContext} from "@/context/auth.context.tsx";

export interface IUseAuth {
    isAuthenticated: boolean;
    userCurrent: User | null;
    role: string,
    isUserFetching: boolean;
    accessToken:string

    verifyResetPassword(token: string): Promise<IResponseLayout<null>>

    login(username: string, password: string): Promise<IResponseLayout<ILoginResponse>>
}

export const _useAuth = (): IUseAuth => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {value: isAuthenticated, setValue: setIsAuth} = useBoolean(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {value: isUserFetching, setValue: setUserFetching} = useBoolean(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userCurrent, setUserCurrent] = useState<User | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [role, setRole] = useState<string>("")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [accessToken, setToken] = useState<string>("")
    const verifyResetPassword = async (token: string): Promise<IResponseLayout<null>> => {
        return await authApi.verifyResetPassword(token);
    }
    const login = async (username: string, password: string): Promise<IResponseLayout<ILoginResponse>> => {
        const data = await authApi.login(username, password);
        if (!data.data.user.activeTwoFactorAuthentication) {
            Cookies.set("access-token", data.data.accessToken)
            Cookies.set("refresh-token", data.data.refreshToken)
            setToken(data.data.accessToken)
            setIsAuth(true)
            setUserCurrent(data.data.user)
            setRole(data.data.user.role)
        }
        return data;
    }
    const getMyInfo = async () => {
        setUserFetching(true)
        const accessToken: string | undefined = Cookies.get("access-token")
        try {
            if (accessToken && accessToken.length > 0) {
                try {
                    const data = await userApi.getMyInfo(accessToken);
                    setIsAuth(true)
                    setUserCurrent(data)
                    setRole(data.role)
                    setToken(accessToken)
                } catch (error) {
                    console.log(error);
                }
            }
        } finally {
            setUserFetching(false)
        }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getMyInfo().then(_ => {
        })
    }, [])
    return {
        isAuthenticated,
        userCurrent,
        role,
        isUserFetching,
        accessToken,
        verifyResetPassword,
        login
    }
}
const useAuth = () => useContext(AuthContext)
export default useAuth