import {UserDetailsForAdmin} from "@/apis/models.d";
import userApi, {CreateAccountantRequest, CreateDentistRequest} from "@/apis/user.api.ts";

interface IUseUser {
    getUserDetailsForAdmin: (pageNumber: number) => Promise<UserDetailsForAdmin[]>
    createDentistOrAccountant: (data: CreateDentistRequest | CreateAccountantRequest,
                                success: () => void,
                                error: (message: string) => void,
    ) => Promise<void>;
}

const useUser = (token: string): IUseUser => {
    const getUserDetailsForAdmin = async (pageNumber: number) => {
        const data = await userApi.getAllUsersDetailsForAdmin(token, pageNumber);
        if (data.success) return data.data;
        return []
    }
    const createDentistOrAccountant = async (
        data: CreateDentistRequest | CreateAccountantRequest,
        success: () => void,
        error: (message: string) => void) => {
        const res = await userApi.createDentistOrAccountant(data,token)
        if (res.success){
            success();
            return;
        }
        error(res.message)
    }
    return {
        getUserDetailsForAdmin,
        createDentistOrAccountant
    }
}
export default useUser;