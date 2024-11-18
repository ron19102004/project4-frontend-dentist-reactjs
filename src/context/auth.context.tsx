import React, {createContext} from "react";
import {_useAuth, IUseAuth} from "@/hooks/useAuth.hook.tsx";

export const AuthContext = createContext<IUseAuth|null>(null)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AuthContext.Provider value={_useAuth()}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider
