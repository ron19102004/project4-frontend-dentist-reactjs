import { _useScreen, IUseScreen } from "@/hooks/useScreen.hook";
import React, { createContext } from "react";

export const ScreenContext = createContext<IUseScreen>({
    width: 0,
    height: 0,
    isMobile: false
})


const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ScreenContext.Provider value={_useScreen()}>
        {children}
    </ScreenContext.Provider>
}

export default ScreenProvider
