import { Service } from "@/apis/models";
import serviceApi from "@/apis/service.api";
import useList from "@/hooks/useList.hook";
import { useEffect,useContext } from "react";
import { ServiceContext } from "@/context/service.context"

export interface IUseService {
  list: Service[];
  getAllService(): Promise<void>;
}
export const _useService = (): IUseService => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { list, set } = useList<Service>();
  const getAllService = async () => {
    const data = await serviceApi.getAllServices();
    if (data.success) {
      set(data.data);
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    getAllService()
  },[])
  return { list, getAllService };
};

const useService = (): IUseService => useContext<IUseService>(ServiceContext)
export default useService