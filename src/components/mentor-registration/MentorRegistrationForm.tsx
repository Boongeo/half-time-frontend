'use client'

import ProfessionalSection from "@/components/mentor-registration/sections/ProfessionalSection";
import MentoringSection from "@/components/mentor-registration/sections/MentoringSection";
import VerificationSection from "@/components/mentor-registration/sections/VerificationSection";
import {Button} from "@/components/common/Button";
import {useMentorRegistrationStore} from "@/store/mentor-registration";
import {useState} from "react";
import ProgressSteps from "@/components/mentor-registration/ProgressSteps";

const STEPS = [
    { id: 1, title: '전문 분야', component: ProfessionalSection },
    { id: 2, title: '멘토링 정보', component: MentoringSection },
    { id: 3, title: '인증 정보', component: VerificationSection }
] as const;

export default function MentorRegistrationForm() {
    const { currentStep, isLoading, setCurrentStep, validateCurrentStep } = useMentorRegistrationStore();
    const [error, setError] = useState<string | null>(null);
    const CurrentStepComponent = STEPS.find(step => step.id === currentStep)?.component || ProfessionalSection;

    const handleNext = async () => {
        const validation = validateCurrentStep();

        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        setError(null);
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg">
            {/* 진행 단계 표시 */}
            <div className="p-4 border-b border-gray-200">
                <ProgressSteps steps={STEPS} currentStep={currentStep} />
            </div>

            {/* 현재 섹션 컴포넌트 */}
            <div className="p-8">
                <CurrentStepComponent/>
            </div>

            {/* 에러 메시지 */}
            {error && (
                <div className="px-8 py-4 bg-red-50 border-t border-red-100">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* 이전/다음 버튼 */}
            <div className="px-8 py-6 bg-gray-50 rounded-b-lg flex justify-between">
                {currentStep > 1 ? (
                    <Button
                        onClick={handlePrev}
                        variant="secondary"
                        disabled={isLoading}
                    >
                        이전
                    </Button>
                ) : <div/>}

                <Button
                    onClick={currentStep === STEPS.length ? undefined : handleNext}
                    type={currentStep === STEPS.length ? 'submit' : 'button'}
                    variant="primary"
                    loading={isLoading}
                >
                    {currentStep === STEPS.length ? '등록 신청' : '다음'}
                </Button>
            </div>
        </div>
    );
}