'use client'

import ProfessionalSection from "@/components/mentor-registration/sections/ProfessionalSection";
import MentoringSection from "@/components/mentor-registration/sections/MentoringSection";
import VerificationSection from "@/components/mentor-registration/sections/VerificationSection";
import {Button} from "@/components/common/Button";
import {useMentorRegistrationStore} from "@/store/mentor-registration";
import {useState} from "react";
import ProgressSteps from "@/components/mentor-registration/ProgressSteps";
import {useRouter} from "next/navigation";
import {Modal} from "@/components/common/Modal";

const STEPS = [
    { id: 1, title: '전문 분야', component: ProfessionalSection },
    { id: 2, title: '멘토링 정보', component: MentoringSection },
    { id: 3, title: '인증 정보', component: VerificationSection }
] as const;

export default function MentorRegistrationForm() {
    const router = useRouter();
    const { currentStep, isLoading, setCurrentStep, validateCurrentStep, submitRegistration } = useMentorRegistrationStore();
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
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

    const handleSubmit = async () => {
        setError(null);
        for (let step = 1; step <= STEPS.length; step++) {
            setCurrentStep(step);
            const validation = validateCurrentStep();
            if (!validation.isValid) {
                setError(validation.message);
                return;
            }

        }
        await submitRegistration();
        setShowSuccessModal(true);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        router.push('mentoring/dashboard');
    }

    return (
        <>
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
                        onClick={currentStep === STEPS.length ? handleSubmit : handleNext}
                        type={currentStep === STEPS.length ? 'submit' : 'button'}
                        variant="primary"
                        loading={isLoading}
                    >
                        {currentStep === STEPS.length ? '등록 신청' : '다음'}
                    </Button>
                </div>
            </div>

            {/* 등록 성공 모달 */}
            <Modal
                isOpen={showSuccessModal}
                onClose={handleModalClose}
                title="멘토 등록 신청 완료"
                description="멘토 등록 신청이 완료되었습니다. 관리자 검토 후 승인될 예정입니다."
            >
                <div className="mt-6 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 mb-4 flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <Button
                        onClick={handleModalClose}
                        variant="primary"
                        className="w-full mt-4"
                    >
                        확인
                    </Button>
                </div>
            </Modal>
        </>
    );
}