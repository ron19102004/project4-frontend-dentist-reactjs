import {FC, useEffect, useState} from "react";
import {useAuth} from "@/hooks";
import useReward from "@/hooks/useReward.hook.tsx";
import toast from "react-hot-toast";
import Dialog from "@mui/material/Dialog";
import {Reward} from "@/apis/models";
import useUser from "@/hooks/useUser.hook.tsx";
import {LoopUtil} from "@/components/utils";
import RewardCard from "@/root/pages/user/reward/reward.card.tsx";

interface IUseRewardDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const UseRewardDialog: FC<IUseRewardDialogProps> = ({isOpen, setOpen}) => {
    const {accessToken} = useAuth()!
    const {getAll} = useReward()
    const {useReward: useRewardPost} = useUser(accessToken)
    const [rewards, setRewards] = useState<Reward[]>([])
    const init = async () => {
        const data = await getAll()
        setRewards(data)
    }
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        init().then()
    }, [isOpen]);
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <div className="w-full max-w-4xl mx-auto p-8">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                    <LoopUtil data={rewards} render={(item, _) => {
                        return <RewardCard reward={item} onClick={async (reward) => {
                            const useConfirm = confirm("Bạn có chắc sử dụng mã quy đổi: " + reward.id)
                            if (useConfirm) {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                await useRewardPost(reward.id, async () => {
                                    toast.success("Quy đổi thành công")
                                    setOpen(false)
                                }, (message) => {
                                    toast.error(message)
                                })
                            }
                        }}/>
                    }}/>
                </section>
            </div>
        </Dialog>
    );
}
export default UseRewardDialog