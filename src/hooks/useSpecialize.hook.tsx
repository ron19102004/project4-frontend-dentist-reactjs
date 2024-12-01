import specializeApi, {CreateSpecializeRequest, UpdateSpecializeRequest} from "@/apis/specialize.api.ts";
import {Specialize} from "@/apis/models.d";

interface IUseSpecializeProps {
    create: (data: CreateSpecializeRequest,
             success: () => Promise<void>,
             error: (message: string) => void
    ) => Promise<void>;
    getAll: () => Promise<Specialize[]>
    remove: (specializeId: number,
             success: () => Promise<void>,
             error: (message: string) => void) => Promise<void>
    update: (data: UpdateSpecializeRequest,
             specializeId: number,
             success: () => Promise<void>,
             error: (message: string) => void) => Promise<void>
    getById: (id: number) => Promise<Specialize | null>
    getBySlug:(slug:string) => Promise<Specialize | null>
}

const useSpecialize = (token?: string): IUseSpecializeProps => {
    const create = async (
        data: CreateSpecializeRequest,
        success: () => Promise<void>,
        error: (message: string) => void
    ) => {
        if (!token) {
            error("Token không tồn tại")
            return
        }
        const res = await specializeApi.create(data, token);
        if (res.success) {
            await success()
            return
        }
        error(res.message)
    }
    const getAll = async () => {
        const data = await specializeApi.getAll();
        return data.success ? data.data : []
    }
    const remove = async (
        specializeId: number,
        success: () => Promise<void>,
        error: (message: string) => void) => {
        if (!token) {
            error("Token không tồn tại")
            return
        }
        const data = await specializeApi.del(specializeId, token)
        if (data.success) {
            await success()
            return
        }
        error(data.message)
    }
    const update = async (data: UpdateSpecializeRequest,
                          specializeId: number,
                          success: () => Promise<void>,
                          error: (message: string) => void) => {
        if (!token) {
            error("Token không tồn tại")
            return
        }
        const res = await specializeApi.update(data, token, specializeId);
        if (res.success) {
            await success()
            return
        }
        error(res.message)
    }
    const getById = async (id: number) => {
        const res = await specializeApi.getById(id)
        return res.success ? res.data : null
    }
    const getBySlug = async (slug:string) => {
        const res = await specializeApi.getBySlug(slug)
        return res.success ? res.data : null
    }
    return {
        create,
        getAll,
        remove,
        update,
        getById,
        getBySlug
    }
}
export default useSpecialize