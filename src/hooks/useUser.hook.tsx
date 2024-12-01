import {UserDetailsForAdmin} from "@/apis/models.d";
import userApi, {
    CheckUserExistResponse,
    CreateAccountantRequest,
    CreateDentistRequest,
    IMyRewardHistoriesDataResponse
} from "@/apis/user.api.ts";

interface IUseUser {
    getUserDetailsForAdmin: (pageNumber: number) => Promise<UserDetailsForAdmin[]>
    createDentistOrAccountant: (data: CreateDentistRequest | CreateAccountantRequest,
                                success: () => void,
                                error: (message: string) => void,
    ) => Promise<void>;
    checkUserExist: (userId: number,
                     success: (data: CheckUserExistResponse) => void,
                     error: (message: string) => void) => Promise<void>
    resetRole: (userId: number,
                success: () => Promise<void>,
                error: (message: string) => void) => Promise<void>
    getMyRewardHistories: (success: (data: IMyRewardHistoriesDataResponse) => void,
                           error: (message: string) => void) => Promise<void>,
    useReward: (rewardId: number, success: () => Promise<void>,
                error: (message: string) => void) => Promise<void>
}

const useUser = (token: string): IUseUser => {
    const useReward = async (
        rewardId: number,
        success: () => Promise<void>,
        error: (message: string) => void) => {
        try {
            const data = await userApi.useReward(token, rewardId);
            if (data.success) {
                await success();
                return
            }
            error(data.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response.data.message)
        }
    }
    const getMyRewardHistories = async (success: (data: IMyRewardHistoriesDataResponse) => void,
                                        error: (message: string) => void) => {
        try {
            const res = await userApi.getMyRewardHistories(token);
            if (res.success) {
                success(res.data)
                return;
            }
            error(res.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response.data.message)
        }
    }
    const resetRole = async (
        userId: number,
        success: () => Promise<void>,
        error: (message: string) => void) => {
        try {
            const data = await userApi.resetRole(userId, token);
            if (data.success) {
                await success();
                return
            }
            error(data.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response.data.message)
        }

    }
    const getUserDetailsForAdmin = async (pageNumber: number) => {
        const data = await userApi.getAllUsersDetailsForAdmin(token, pageNumber);
        if (data.success) return data.data;
        return []
    }
    const createDentistOrAccountant = async (
        data: CreateDentistRequest | CreateAccountantRequest,
        success: () => void,
        error: (message: string) => void) => {
        try {
            const res = await userApi.createDentistOrAccountant(data, token)
            if (res.success) {
                success();
                return;
            }
            error(res.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.message)
        }
    }
    const checkUserExist = async (
        userId: number,
        success: (data: CheckUserExistResponse) => void,
        error: (message: string) => void) => {
        try {
            const res = await userApi.checkUserExistResponse(userId, token);
            if (res.success) {
                success(res.data)
                return;
            }
            error(res.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response.data.message)
        }
    }
    return {
        getUserDetailsForAdmin,
        createDentistOrAccountant,
        checkUserExist,
        resetRole,
        getMyRewardHistories,
        useReward
    }
}
export default useUser;