import {Reward} from "@/apis/models.d";
import React from "react";

interface IRewardCard{
    reward: Reward,
    onClick: (reward: Reward) => Promise<void>
}
const RewardCard: React.FC<IRewardCard> = ({ reward,onClick }) => {
    return (
        <div
            onClick={async ()=>{
                await onClick(reward)
            }}
            className={`cursor-pointer bg-white shadow rounded-lg p-4 border
            hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:scale-105`}
        >
            <div>
                {/* Header */}
                <div className="pb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{reward.content}</h2>
                </div>

                {/* Poster Image */}
                {reward.poster && (
                    <div className="mb-4">
                        <img
                            src={reward.poster}
                            alt="Poster"
                            className="min-w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                )}
            </div>
            {/* Details */}
            <div className="flex flex-col items-start">
                <p className="text-sm text-gray-600">
                    <i className="fas fa-hashtag text-blue-500 mr-2"></i>
                    Mã quy đổi:{" "}
                    <span className="font-semibold text-gray-800">{reward.id}</span>
                </p>
                <p className="text-sm text-gray-600">
                    <i className="fas fa-coins text-yellow-500 mr-2"></i>
                    Số điểm quy đổi:{" "}
                    <span className="font-semibold text-gray-800">{reward.points}</span>
                </p>
            </div>
        </div>
    );
};

export default RewardCard;