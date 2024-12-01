import {RewardHistory} from "@/apis/models.d";
import React from "react";
import {cn} from "@/lib/cn.ts";

const RewardHistoryCard: React.FC<{ history: RewardHistory }> = ({history}) => {
    return (
        <div className={cn(`bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-lg
        rounded-2xl p-6 border hover:shadow-2xl transition-shadow
        duration-300 hover:scale-105 transform`, {
            'border-green-500': history.used && history.pointsUsed < 0,
            'border-red-500': !history.used && history.pointsUsed < 0,
        })}>
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-gray-700">
                    {history.content}
                </h2>
                <span
                    className={cn(`text-sm font-semibold px-2 py-1 rounded-lg `, {
                        "bg-green-100 text-green-600": history.used || history.pointsUsed > 0,
                        "bg-red-100 text-red-600": !history.used && history.pointsUsed < 0,
                    })}
                >
                  {(history.used && history.pointsUsed < 0) && "Đã sử dụng"}
                    {(!history.used && history.pointsUsed < 0) && "Chưa sử dụng"}
                    {history.pointsUsed > 0 && "Cộng điểm"}
                 </span>
            </div>
            {/* Details */}
            <div className="space-y-1">
                {(!history.used && history.pointsUsed < 0) && <p className=" text-gray-600">
                    <i className="fas fa-hashtag text-blue-500 mr-2"></i>
                    Mã sử dụng:{" "}
                    <span className="font-semibold text-gray-800">{history.id}</span>
                </p>}
                <p className="flex items-center text-gray-600">
                    <i className="fas fa-calendar-alt text-blue-400 mr-2"></i>
                    Ngày quy đổi:{" "}
                    <span className="ml-1">
                        {history.createdAt}
                    </span>
                </p>
                <p className="flex items-center text-gray-600">
                    <i className="fas fa-coins text-yellow-500 mr-2"></i>
                    Điểm chênh lệnh:{" "}
                    <span className="font-semibold text-gray-800 ml-1">
                         {history.pointsUsed}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RewardHistoryCard;