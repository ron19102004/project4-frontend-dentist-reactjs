import {FC, Fragment, useEffect, useState} from "react";
import HeadUtil from "../../../../../components/utils/head.util.tsx";
import {useAuth, useBoolean} from "@/hooks";
import {Reward} from "@/apis/models.d";
import {LoopUtil} from "@/components/utils";
import useReward from "@/hooks/useReward.hook.tsx";
import toast from "react-hot-toast";
import dateFormat from "@/components/utils/date-format.ts";
import CreateRewardDialog from "@/root/pages/manager/accountant/reward/create.tsx";
import {cn} from "@/lib/cn.ts";
import RewardDetailsDialog from "@/root/pages/manager/accountant/reward/reward-details.tsx";

const AccountantRewardPage: FC = () => {
    const {accessToken} = useAuth()!
    const [pageNumber, setPageNumber] = useState<number>(1);
    const {value: isDeleted, setValue: setIsDeleted} = useBoolean()
    const {getAllForAccountant, changeOpen, remove} = useReward(accessToken)
    const [rewards, setRewards] = useState<Reward[]>([])
    const {value: isOpenCreateDialog, setValue: setIsOpenCreate} = useBoolean()
    const {value: isOpenDetailDialog, setValue: setIsOpenDetailDialog} = useBoolean()
    const [rewardDetails, setRewardDetails] = useState<Reward | null>(null)
    const [checkBoxStatus, setCheckBoxStatus] = useState({})

    const initialize = async (pageCurrent: number, isDel: boolean) => {
        await getAllForAccountant(pageCurrent, isDel, (data) => {
            setRewards(data)
            const cbs = data.reduce((acc, value) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                acc[value.id] = false;
                return acc;
            }, {});
            setCheckBoxStatus(cbs)
        }, (error) => {
            toast.error(error)
        })
    }
    useEffect(() => {
        initialize(pageNumber, isDeleted).then()
    }, [])
    const handlePageChange = async (type: "plus" | "minus") => {
        if (pageNumber > 0 && rewards.length === 10) {
            let pageNew = pageNumber;
            if (type === "plus") {
                pageNew += 1
                setPageNumber(pageNew);
            } else if (type === "minus") {
                pageNew -= 1
                setPageNumber(pageNew);
            }
            await initialize(pageNew, isDeleted)
        }
    };
    const changeStatusCheckBoxHandler = (rewardId: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const cbsNew = {...checkBoxStatus, [rewardId]: !checkBoxStatus[rewardId]}
        setCheckBoxStatus(cbsNew)
    }
    const changeOpenStatusHandler = async (status: "ON" | "OFF") => {
        const listRewardId: number[] = []
        Object.entries(checkBoxStatus).forEach((value) => {
            if (value[1] === true) {
                listRewardId.push(parseInt(value[0]))
            }
        })
        if (listRewardId.length === 0) {
            toast.error("Hãy tích vào trường muốn thay đổi")
            return;
        }
        await changeOpen({isOpen: status, listRewardId: listRewardId}, async () => {
            toast.success("Thay đổi thành công")
            await initialize(pageNumber, isDeleted)
        }, (error) => {
            toast.error(error)
        })
    }
    const delRewardHandler = async (id: number) => {
        const isDel = confirm("Bạn có chắc chắn muốn xóa hay không?")
        if (isDel) {
            await remove(id,
                async () => {
                    toast.success("Xóa thành công")
                    await initialize(pageNumber, isDeleted)
                },
                (error) => {
                    toast.error(error)
                })
        }
    }
    return <Fragment>
        <HeadUtil
            title={"Quản lý hóa đơn"}
            author={"Ronial"}
            urlImage={""}
            urlPageCurrent={""}
        />
        <section className={"max-w-screen px-4 pt-2"}>
            <div className="flex items-center justify-between py-4 text-white">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between md:space-x-4 w-full gap-2">
                    <div className={"flex flex-row gap-2 w-full"}>
                        <button
                            onClick={() => {
                                setIsOpenCreate(true)
                            }}
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            Thêm phần thưởng
                        </button>
                        <button
                            onClick={async () => {
                                setPageNumber(1)
                                await initialize(1, isDeleted)
                                toast.success("Đã tải lại")
                            }}
                            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 4v6h4M20 20v-6h-4M8 20h8M16 4h-8"/>
                            </svg>
                            Tải lại
                        </button>
                    </div>
                    <div className={"flex justify-center gap-2 items-end w-full md:w-auto"}>
                        <div className="flex flex-col items-start space-y-2 w-full md:w-auto">
                            <label className="text-sm font-medium text-gray-700">
                                Bộ lọc trạng thái hóa đơn
                            </label>
                            <select
                                onChange={async (e) => {
                                    const value = parseInt(e.target.value)
                                    if (value === 0) {
                                        setIsDeleted(false)
                                        await initialize(pageNumber, false)
                                    } else {
                                        setIsDeleted(true)
                                        await initialize(pageNumber, true)
                                    }
                                }}
                                className="block w-full md:w-auto px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                            >
                                <LoopUtil
                                    data={["Chưa xóa", "Đã xóa"]}
                                    render={(status, index) => (
                                        <option
                                            value={index}
                                            className="text-gray-700 bg-gray-50 hover:bg-gray-100"
                                        >
                                            {status}
                                        </option>
                                    )}
                                />
                            </select>
                        </div>
                        {!isDeleted && <div className="flex flex-col  items-start space-y-2 w-full ">
                            <label className="text-sm font-medium text-gray-700">
                                Thay đổi trạng thái
                            </label>
                            <div className={"w-full grid gap-2 grid-cols-2"}>
                                <button
                                    onClick={async () => {
                                        await changeOpenStatusHandler("ON")
                                    }}
                                    className="w-full rounded-md bg-blue-600 p-2
                                        border border-transparent text-center text-sm
                                        text-white transition-all"
                                    type="button">
                                    ON
                                </button>
                                <button
                                    onClick={async () => {
                                        await changeOpenStatusHandler("OFF")
                                    }}
                                    className="w-full rounded-md bg-red-600 p-2
                                        border border-transparent text-center text-sm
                                        text-white transition-all"
                                    type="button">
                                    OFF
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr className={"bg-gray-700 text-white"}>
                        <th className="border border-gray-200 px-4 py-2 text-left"></th>
                        <th className="border border-gray-200 px-4 py-2 text-left">ID phần thưởng</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Điểm thưởng</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Nội dung</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Trạng thái</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Thời gian tạo</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Hình ảnh</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <LoopUtil
                        data={rewards}
                        render={reward => {
                            return <tr className="hover:bg-gray-50 shadow">
                                <td className="border border-gray-200 px-4 py-2">
                                    {!isDeleted && <div className={"flex flex-col justify-center items-center"}>
                                        <input
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
                                            checked={checkBoxStatus[reward.id]}
                                            onChange={() => {
                                                changeStatusCheckBoxHandler(reward.id)
                                            }}
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 border-gray-300
                                            rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                    </div>}
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-center">
                                    <span className={"font-semibold text-center"}>{reward.id}</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-center">
                                    <span className={"font-semibold"}>{reward.points}</span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <p className={"text-ellipsis line-clamp-2"}>{reward.content}</p>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 text-center">
                                    <span className={cn("font-semibold px-4 py-2 rounded", {
                                        "bg-red-200 text-red-700": !reward.isOpened,
                                        "bg-green-200 text-green-700": reward.isOpened
                                    })}>
                                        {reward.isOpened ? "ON" : "OFF"}
                                    </span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <span className={"font-semibold"}>
                                        {dateFormat(reward.createdAt)}
                                    </span>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <div>
                                        <img
                                            src={(reward.poster && reward.poster.length > 0) ? reward.poster : "https://via.placeholder.com/50"}
                                            alt="Poster"
                                            className="w-12 h-12 object-cover rounded-md"/>
                                    </div>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 md:grid  md:grid-cols-2 md:gap-2 space-y-2 md:space-y-0">
                                    {!isDeleted && <>
                                        <button
                                            onClick={() => {
                                                setRewardDetails(reward)
                                                setIsOpenDetailDialog(true)
                                            }}
                                            className="rounded-md bg-gray-600 hover:bg-gray-700 py-2 px-4 border border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                            type="button">
                                            Chi tiết
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await delRewardHandler(reward.id)
                                            }}
                                            className="rounded-md bg-red-600 hover:bg-gray-700 py-2 px-4 border border-transparent text-center
                                        text-sm text-white transition-all shadow-md hover:shadow-lg"
                                            type="button">
                                            Xóa
                                        </button>
                                    </>}
                                </td>
                            </tr>
                        }}
                    />
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                    onClick={async () => {
                        await handlePageChange('minus')
                    }}
                    className="flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-600 font-medium rounded-md hover:bg-gray-200 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                    </svg>
                    Trang trước
                </button>
                <span className="text-sm font-semibold text-gray-700">
                        Trang {pageNumber}
                    </span>
                <button
                    onClick={async () => {
                        await handlePageChange('plus')
                    }}
                    className="flex items-center px-2 py-1 text-sm bg-gray-100 text-gray-600 font-medium rounded-md hover:bg-gray-200 transition"
                >
                    Trang sau
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                    </svg>
                </button>
            </div>
        </section>
        {rewardDetails &&
            <RewardDetailsDialog isOpen={isOpenDetailDialog} setOpen={setIsOpenDetailDialog} reward={rewardDetails}/>}
        <CreateRewardDialog isOpen={isOpenCreateDialog} setOpen={setIsOpenCreate}/>
    </Fragment>
}
export default AccountantRewardPage
