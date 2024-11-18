import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks";
import ForbiddenPage from "@/root/pages/errors/forbidden.tsx";
import {FC, useEffect} from "react";
import {CircularProgress} from '@mui/material';

const AuthSafe: FC<{
    excludeRoles?: string[],
    includeRoles?: string[]
}> = ({excludeRoles,includeRoles}) => {
    const {isAuthenticated, role, isUserFetching} = useAuth()!;
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated && !isUserFetching) {
            navigate("/dang-nhap")
        }
    }, [isUserFetching]);
    if (isUserFetching) {
        return <section className={"min-w-screen min-h-screen flex flex-col justify-center items-center"}>
            <CircularProgress/>
        </section>
    }
    if (isAuthenticated) {
        if (excludeRoles && excludeRoles.includes(role)){
            return <ForbiddenPage/>
        }
        if (includeRoles && !includeRoles.includes(role)){
            return <ForbiddenPage/>
        }
    }
    return <Outlet/>
}
export default AuthSafe