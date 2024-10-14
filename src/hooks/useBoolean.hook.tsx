import { useEffect, useState } from "react";

interface IUseBoolean {
    value: boolean,
    autoChange: () => void;
    setValue: (value: boolean) => void
}
const useBoolean = (value?: boolean): IUseBoolean => {
    const [_value, setValue] = useState<boolean>(value ?? false)
    return {
        value: _value,
        autoChange() {
            setValue(!_value)
        },
        setValue(value) {
            setValue(value)
        },
    }
}
export default useBoolean;