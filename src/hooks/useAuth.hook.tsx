import {Accountant, Dentist, IResponseLayout, Role, User} from "@/apis/models.d";
import authApi, {ILoginResponse, IRegisterRequest} from "@/apis/auth.api.ts";
import userApi from "@/apis/user.api.ts";
import useBoolean from "@/hooks/useBoolean.hook.tsx";
import {useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {AuthContext} from "@/context/auth.context.tsx";

export interface IUseAuth {
    isAuthenticated: boolean;
    userCurrent: User | null;
    role: Role,
    isUserFetching: boolean;
    accessToken: string;
    infoUserMore: Dentist | Accountant | null

    verifyResetPassword(token: string): Promise<IResponseLayout<null>>

    login(username: string, password: string): Promise<IResponseLayout<ILoginResponse>>

    logout: () => void;
    register: (data: IRegisterRequest, success: () => void, error: (message: string) => void) => Promise<void>
}
export const _useAuth = (): IUseAuth => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {value: isAuthenticated, setValue: setIsAuth} = useBoolean(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {value: isUserFetching, setValue: setUserFetching} = useBoolean(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userCurrent, setUserCurrent] = useState<User | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [role, setRole] = useState<Role>(Role.PATIENT)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [accessToken, setToken] = useState<string>("")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [infoUserMore,setInfoUserMore] = useState<Dentist | Accountant | null>(null)
    const verifyResetPassword = async (token: string): Promise<IResponseLayout<null>> => {
        return await authApi.verifyResetPassword(token);
    }
    const register = async (
        data: IRegisterRequest,
        success: () => void,
        error: (message: string) => void) => {
        try {
            const res = await authApi.register(data)
            if (res.success) {
                success();
                return
            }
            error(res.message)
        } catch (e){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response.data.message)
        }
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
                    setUserCurrent(data.user)
                    setRole(data.user.role)
                    setToken(accessToken)
                    setInfoUserMore(data.dentist ?? data.accountant)
                } catch (error) {
                    console.log(error);
                }
            }
        } finally {
            setUserFetching(false)
        }
    }
    const logout = () => {
        Cookies.remove("access-token")
        Cookies.remove("refresh-token")
        setIsAuth(false)
        setUserCurrent(null)
        setToken("")
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getMyInfo().then()
    }, [])
    return {
        isAuthenticated,
        userCurrent,
        role,
        isUserFetching,
        accessToken,
        infoUserMore,
        verifyResetPassword,
        login,
        logout,
        register
    }
}
const useAuth = () => useContext(AuthContext)
export default useAuth