import { Entity } from "@/apis/models";
import { useState } from "react"

interface IUseList<X extends Entity> {
    list: Array<X>,
    add: (value: X) => void;
    remove: (id: number) => void;
    update: (index: number, value: X) => void;
}
const useList = <X extends Entity,>(defaultList: X[] = []): IUseList<X> => {
    const [list, setList] = useState<Array<X>>(defaultList)
    return {
        list,
        add(value) {
            setList(preList => [...preList, value]);
        },
        remove(id) {
            setList(prevList => prevList.filter(item => item.id !== id));
        },
        update(index, value) {
            setList(prevList => {
                const listCopy = [...prevList];
                listCopy[index] = value;
                return listCopy;
            });
        },
    }
}
export default useList