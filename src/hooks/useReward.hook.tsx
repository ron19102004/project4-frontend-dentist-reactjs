import {Reward} from "@/apis/models";
import rewardApi, {CreateRewardRequest, RewardChangeOpenRequest} from "@/apis/reward.api.tsx";

interface IUseReward {
    create: (data: CreateRewardRequest,
             success: () => void,
             error: (message: string) => void) => Promise<void>
    getAll: () => Promise<Reward[]>
    getAllForAccountant: (pageNumber: number,
                          isDeleted: boolean,
                          success: (data: Reward[]) => void,
                          error: (message: string) => void) => Promise<void>
    changeOpen: (data: RewardChangeOpenRequest,
                 success: () => Promise<void>,
                 error: (message: string) => void) => Promise<void>,
    remove: (rewardId: number,
             success: () => Promise<void>,
             error: (message: string) => void) => Promise<void>
}

const useReward = (token?: string): IUseReward => {
    const remove = async (
        rewardId: number,
        success: () => Promise<void>,
        error: (message: string) => void) => {
        if (!token) {
            error("Token không tồn tại")
            return
        }
        try{
            const res = await rewardApi.del(token, rewardId);
            if (res.success) {
                await success()
                return
            }
            error(res.message)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error(e?.response?.data?.message)
        }
    }
    const getAll = async () => {
        const data = await rewardApi.getAll();
        return data.data
    }
    const getAllForAccountant = async (
        pageNumber: number,
        isDeleted: boolean,
        success: (data: Reward[]) => void,
        error: (message: string) => void) => {
        if (!token) {
            error("Token không tồn tại")
            return
        }
        const data = await rewardApi.getAllForAccountant(token, pageNumber, isDeleted);
        if (data.success) {
            success(data.data)
            return
        }
        error(data.message)
    }
    const changeOpen = async (data: RewardChangeOpenRequest,
                              success: () => Promise<void>,
                              error: (message: string) => void) => {
        if (!token) {
            error("Token không tồn tại")
            return
        }
        const res = await rewardApi.changeOpen(data, token);
        if (res.success) {
            await success()
            return
        }
        error(res.message)
    }
    const create = async (data: CreateRewardRequest,
                          success: () => void,
                          error: (message: string) => void) => {
        if (!token) {
            error("Token không tồn tại")
            return
        }
        const res = await rewardApi.create(data, token);
        if (res.success) {
            success()
            return
        }
        error(res.message)
    }
    return {
        create,
        getAll,
        getAllForAccountant,
        changeOpen,
        remove
    }
}
export default useReward