import {ProgressStepsProps} from "@/types/components/mentorProps";
import React from "react";

export default function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
    const getProgressWidth = () => {
        if (currentStep <= 1) return '0%';
        if (currentStep >= steps.length) return 'calc(100% - 4rem)';

        const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;
        return `calc(${percentage}% - 2rem)`;
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <div className="relative">
                {/* Background Bar */}
                <div className="absolute top-[27%] left-[2rem] right-[2rem] h-1 bg-gray-200 -translate-y-1/2"/>

                {/* Progress Bar */}
                <div
                    className="absolute top-[27%] left-[2rem] h-1 bg-blue-500 -translate-y-1/2 transition-all duration-300"
                    style={{
                        width: getProgressWidth()
                    }}
                />

                {/* Steps */}
                <div className="flex justify-between relative">
                    {steps.map((step, index) => {
                        const isCompleted = currentStep > index + 1;
                        const isCurrent = currentStep === index + 1;

                        return (
                            <div key={step.id} className="flex flex-col items-center">
                                <div
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                        transition-all duration-300
                                        ${isCompleted
                                        ? 'bg-blue-500 text-white'
                                        : isCurrent
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }
                                    `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <span
                                    className={`
                                    mt-2 text-sm font-medium
                                    ${isCurrent ? 'text-blue-600' : 'text-gray-500'}
                                  `}
                                >
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}