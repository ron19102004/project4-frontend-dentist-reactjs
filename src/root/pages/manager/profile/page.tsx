import {FC, Fragment, useEffect} from "react";
import {useAuth} from "@/hooks";
import UserCard from "@/root/pages/manager/profile/user.card.tsx";
import {Accountant, Dentist, Role} from "@/apis/models.d";
import AccountantCard from "@/root/pages/manager/profile/accountant.card.tsx";
import DentistCard from "@/root/pages/manager/profile/dentist.card.tsx";

const ProfileManagerPage: FC = () => {
    const {userCurrent, infoUserMore} = useAuth()!
    useEffect(() => {
    }, []);
    const InfoMoreCard:FC = () => {
        if (userCurrent){
            switch (userCurrent.role){
                case Role.ACCOUNTANT:{
                   return <AccountantCard accountant={infoUserMore as Accountant}/>
                }
                case Role.DENTIST:{
                   return <DentistCard dentist={infoUserMore as Dentist}/>
                }
            }
        }
        return <Fragment/>
    }
    return (
        <div className="bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <UserCard user={userCurrent!}/>
            <InfoMoreCard/>
        </div>
    )
}
export default ProfileManagerPage;