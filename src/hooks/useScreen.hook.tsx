import { ScreenContext } from "@/context/screen.context"
import { useContext, useEffect, useState } from "react"
export interface IUseScreen {
    width: number,
    height: number,
    isMobile: boolean
}
export const _useScreen = (): IUseScreen => {
    const [data, setData] = useState<IUseScreen>({
        width: 0,
        height: 0,
        isMobile: false
    })
    useEffect(() => {
        setData({ isMobile: window.screen.width <= 1024, height: window.screen.height, width: window.screen.width })
    }, [])
    return {
        width: data.width,
        height: data.height,
        isMobile: data.isMobile
    }
}
const useScreen = (): IUseScreen => useContext<IUseScreen>(ScreenContext)
export default useScreen
