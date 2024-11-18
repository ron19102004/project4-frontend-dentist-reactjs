import {Service} from "@/apis/models";
import serviceApi from "@/apis/service.api";
import {useEffect, useContext, useState} from "react";
import {ServiceContext} from "@/context/service.context"
import {useBoolean} from "@/hooks/index.ts";
import {CreateServiceFormData} from "@/root/pages/manager/accountant/service/create.tsx";

export interface IUseService {
    list: Service[];

    getAllService(): Promise<void>;

    isServicesFetching: boolean;
    newService: (data: CreateServiceFormData,
                 token: string,
                 success: () => void,
                 error: (message: string) => void) => Promise<void>;
}

export const _useService = (): IUseService => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list, setList] = useState<Service[] | []>([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {value: isServicesFetching, setValue: setFetching} = useBoolean(true)
    const getAllService = async () => {
        setFetching(true)
        const data = await serviceApi.getAllServices();
        if (data.success) {
            setList(data.data);
        }
        setTimeout(() => {
            setFetching(false)
        }, 500)
    };
    const newService = async (data: CreateServiceFormData,
                              token: string,
                              success: () => void,
                              error: (message: string) => void) => {
        try {
            const res = await serviceApi.createService(data, token);
            if (res.success) {
                success();
                await getAllService()
            } else {
                error(res.message);
            }
        } catch (err) {
            console.log(err)
            error("Lỗi thêm dịch vụ");
        }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getAllService().then()
    }, [])
    return {list, getAllService, isServicesFetching, newService};
};

const useService = () => useContext(ServiceContext)
export default useService