import React from "react";

export default function Loading(){
    return (

        <div className="min-h-screen  flex items-center justify-center bg-secondary">
            <div className="flex flex-col relative bottom-10 items-center">
                <div
                    className="w-20 h-20 rounded-full border-4 border-gray-700 border-t-4 border-t-gray-100 animate-spin"></div>
                <p className="mt-4 text-xl relative left-1.5 font-semibold text-gray-100">Loading...</p>
            </div>
        </div>
    )
}