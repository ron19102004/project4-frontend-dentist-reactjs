import {FC, Fragment, useEffect, useState} from "react";
import {useAuth, useBoolean} from "@/hooks";
import useUser from "@/hooks/useUser.hook.tsx";
import {MyBookingData, RewardHistory, RewardPoint,} from "@/apis/models.d";
import toast from "react-hot-toast";
import RewardPointCard from "@/root/pages/user/profile/reward-point.card.tsx";
import UserProfileCard from "@/root/pages/user/profile/user-profile.card.tsx";
import {LoopUtil} from "@/components/utils";
import RewardHistoryCard from "@/root/pages/user/profile/reward-history.card.tsx";
import UseRewardDialog from "@/root/pages/user/profile/use-reward-dialog.tsx";
import {cn} from "@/lib/cn.ts";
import useAppointmentUser from "@/hooks/useAppointmentUser.hook.tsx";
import AppointmentCard from "@/root/pages/user/appointment/appointment.card.tsx";
import MyBookingDialog from "@/root/pages/user/appointment/appointment-details-dialog.tsx";

enum Tab {
    REWARD_HISTORY = "REWARD_HISTORY",
    MY_BOOKING = "MY_BOOKING",
}

const MyProfile: FC = () => {
    const {userCurrent, accessToken} = useAuth()!
    const [rewardPoint, setRewardPoint] = useState<RewardPoint | null>(null)
    const [rewardHistories, setRewardHistories] = useState<RewardHistory[]>([])
    const [allMyBooking, setAllMyBooking] = useState<MyBookingData[]>([])
    const {getMyRewardHistories} = useUser(accessToken)
    const {value: openUseReward, setValue: setOpenUseReward} = useBoolean()
    const [tabCurrent, setTabCurrent] = useState<Tab>(Tab.REWARD_HISTORY)
    const {getAllMyBooking} = useAppointmentUser(accessToken)
    const {value: openBookingDetails, setValue: setOpenBookingDetails} = useBoolean()
    const [myBookingDataCurrent, setMyBookingDataCurrent] = useState<MyBookingData | null>(null)

    const init = async () => {
        await getMyRewardHistories((data) => {
            setRewardHistories(data.rewardHistories)
            setRewardPoint(data.rewardPoint)
        }, (message) => {
            toast.error(message)
        })
        const allMB = await getAllMyBooking()
        setAllMyBooking(allMB)
    }
    useEffect(() => {
        init().then()
    }, []);

    return (
        <Fragment>
            <section className={"p-6 flex gap-6 flex-col md:flex-row"}>
                <div className={"space-y-6 md:max-w-96"}>
                    {userCurrent && <UserProfileCard user={userCurrent}/>}
                    {rewardPoint && <RewardPointCard rewardPoint={rewardPoint}
                                                     useRewardHandler={() => {
                                                         setOpenUseReward(true)
                                                     }}/>}
                </div>
                <div
                    className="p-6 flex-1 bg-white rounded shadow-md hover:shadow-lg
                transition-shadow duration-300 border hover:border-indigo-500">
                    <div className="flex border-b border-gray-300 mb-4 gap-2 transition-all">
                        <button
                            className={cn(`py-2 px-4 md:text-lg rounded-t transition-all`, {
                                "font-semibold text-blue-700 bg-blue-100": tabCurrent === Tab.REWARD_HISTORY,
                                "hover:bg-gray-100": tabCurrent !== Tab.REWARD_HISTORY
                            })}
                            onClick={async () => {
                                setTabCurrent(Tab.REWARD_HISTORY)
                                await init()
                            }}
                        >
                            Lịch sử đổi điểm
                        </button>
                        <button
                            className={cn(`py-2 px-4 md:text-lg rounded-t transition-all`, {
                                "font-semibold text-blue-700 bg-blue-100": tabCurrent === Tab.MY_BOOKING,
                                "hover:bg-gray-100": tabCurrent !== Tab.MY_BOOKING
                            })}
                            onClick={async () => {
                                setTabCurrent(Tab.MY_BOOKING)
                                await init()
                            }}
                        >
                            Hồ sơ của tôi
                        </button>
                    </div>
                    {tabCurrent === Tab.REWARD_HISTORY &&
                        <div className={"grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6"}>
                            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                            <LoopUtil data={rewardHistories} render={(item, _) => {
                                return <RewardHistoryCard history={item}/>
                            }}/>
                        </div>}
                    {tabCurrent === Tab.MY_BOOKING &&
                        <div className={"grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6"}>
                            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                            <LoopUtil data={allMyBooking} render={(item, _) => {
                                return <AppointmentCard myBookingData={item} onClick={async (booking) => {
                                    setMyBookingDataCurrent(booking)
                                    setOpenBookingDetails(true)
                                }}/>
                            }}/>
                        </div>}
                </div>
            </section>
            <UseRewardDialog isOpen={openUseReward} setOpen={setOpenUseReward}/>
            {myBookingDataCurrent && <MyBookingDialog setOpen={setOpenBookingDetails}
                                                      isOpen={openBookingDetails}
                                                      myBookingData={myBookingDataCurrent}
            />}
        </Fragment>
    )
}
export default MyProfile