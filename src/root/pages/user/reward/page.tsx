import {useEffect, useState} from "react";
import {Reward} from "@/apis/models";
import {LoopUtil} from "@/components/utils";
import useReward from "@/hooks/useReward.hook.tsx";
import RewardCard from "@/root/pages/user/reward/reward.card.tsx";

const RewardPage: React.FC = () => {
    const {getAll} = useReward()
    const [rewards, setRewards] = useState<Reward[]>([])
    const init = async () => {
        const data = await getAll()
        setRewards(data)
    }
    useEffect(() => {
        init().then()
    }, [])
    return (
        <section className="bg-gradient-to-b from-blue-200 to-white">
            <div className="bg-blue-800 text-white text-center py-8">
                <h1 className="text-4xl font-extrabold tracking-wider uppercase">
                    Ưu đãi
                </h1>
                <p className="text-lg mt-2 ">
                    Khám phá các ưu đãi hấp dẫn của phòng khám
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                <LoopUtil
                    data={rewards}
                    render={(reward) => <RewardCard reward={reward} onClick={async () => {
                    }}/>}
                />
            </div>
        </section>
    );
};

export default RewardPage;