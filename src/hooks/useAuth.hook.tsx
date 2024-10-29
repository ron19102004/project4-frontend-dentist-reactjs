import {IResponseLayout} from "@/apis/models";
import authApi from "@/apis/auth.api.ts";

interface IUseAuth {
    verifyResetPassword(token: string): Promise<IResponseLayout<null>>
}

const useAuth = (): IUseAuth => {
    const verifyResetPassword = async (token: string): Promise<IResponseLayout<null>> => {
        return await authApi.verifyResetPassword(token);
    }
    return {
        verifyResetPassword
    }
}
export default useAuth;