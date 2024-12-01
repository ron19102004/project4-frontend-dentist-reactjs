import {DentistResponse} from "@/apis/models.d";
import dentistApi from "@/apis/dentist.api.ts";

interface IUseDentist{
    getAll:() => Promise<DentistResponse[]>;
    getById:(id: number) => Promise<DentistResponse|null>;
}
const useDentist = ():IUseDentist => {
    const getAll = async () =>{
        try {
            const res = await dentistApi.getAll()
            return res.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
    const getById = async (id: number) =>{
        try {
            const res = await dentistApi.getById(id)
            return res.data
        } catch (error) {
            console.log(error)
            return null
        }
    }
    return {
        getAll,
        getById
    }
}
export default useDentist