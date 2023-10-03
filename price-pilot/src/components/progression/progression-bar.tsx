import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

interface ProgressionBarProps {
    currentStep: number;
    maxStep: number;
}

const ProgressionBar = ({
    currentStep,
    maxStep
}: ProgressionBarProps) => {
    const stepPoints = [...Array(maxStep)];


    return ( 
        <>
            <span className="font-semibold">Etape {currentStep} / {maxStep}</span>
            <div className="flex justify-between items-center w-full h-4 bg-white rounded-full relative
            border-2 border-double border-blue-500 px-1">
                <div 
                    className='h-2 bg-green-500 rounded-full transition-all duration-300 absolute t-0 l-0 z-0' 
                    style={{width: `${(currentStep / maxStep) * 100}%`}} 
                />
                {stepPoints.map((u, i) => (
                    <div
                        key={i} 
                        className={cn(
                            "rounded-full w-2 h-2 z-50 bg-white",
                            currentStep >= (i+1) && "bg-slate-800",
                        )}
                    />
                ))}
            </div>
        </>
    );
}
 
export default ProgressionBar;