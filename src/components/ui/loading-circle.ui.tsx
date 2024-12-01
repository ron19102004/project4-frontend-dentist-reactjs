import React from "react";

const LoadingCircle: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen md:min-h-96">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    );
};

export default LoadingCircle;