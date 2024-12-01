import {RewardPoint} from "@/apis/models.d";
import React from "react";

interface IRewardPointCard {
    rewardPoint: RewardPoint,
    useRewardHandler: () => void
}

const RewardPointCard: React.FC<IRewardPointCard> = ({rewardPoint, useRewardHandler}) => {
    return (
        <div className=" shadow rounded p-6
        hover:shadow-xl transition-shadow duration-300  border hover:border-indigo-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-700">Điểm Thưởng</h2>
                <span className="text-sm text-gray-500 italic">
                    <button onClick={useRewardHandler} className={"underline hover:text-blue-600"}>
                        Sử dụng
                    </button>
                </span>
            </div>
            {/* Details */}
            <div className="space-y-3">
                <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-3"></i>
                    <p className="text-lg text-gray-800 font-semibold">
                        Tổng điểm: <span className="text-blue-600">{rewardPoint.point}</span>
                    </p>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-minus-circle text-red-400 mr-3"></i>
                    <p className="text-lg text-gray-800 font-semibold">
                        Điểm đã sử dụng: <span className="text-red-600">{rewardPoint.pointsUsed}</span>
                    </p>
                </div>
                <div className="flex items-center">
                    <i className="fas fa-calendar-alt text-blue-500 mr-3"></i>
                    <p className="text-lg text-gray-800">
                        Cập nhật lần cuối:{" "}
                        <span className="text-gray-600">
                      {new Date(rewardPoint.lastUpdatedAt).toLocaleString("vi-VN")}
                    </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default RewardPointCard