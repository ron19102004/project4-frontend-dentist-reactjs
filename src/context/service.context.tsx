import {_useService,IUseService } from "@/hooks/useService.hook";
import React, { createContext } from "react";

export const ServiceContext = createContext<IUseService>({
    list: [],
    getAllService: function (): Promise<void> {
        throw new Error("Function not implemented.");
    }
})

const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ServiceContext.Provider value={_useService()}>
        {children}
    </ServiceContext.Provider>
}

export default ServiceProvider
