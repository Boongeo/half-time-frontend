'use client'

import type { RegistrationStatus } from "@/types/core/mentor";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mentorRegistrationApi } from "@/lib/api/mentor-registration";
import { mentorStatusConfig } from "@/config/status";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";

export default function MentorStatusPage() {
    const [status, setStatus] = useState<RegistrationStatus | null>("pending");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await mentorRegistrationApi.checkStatus();
                if (response.success) {
                    setStatus(response.data.status);
                }
            } catch (error) {
                console.error('Failed to check status', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkStatus();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!status) return null;

    const currentStatus = mentorStatusConfig[status];
    const StatusIcon = currentStatus.icon;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">멘토 신청 현황</h1>

            <Card className={`${currentStatus.bgColor} border ${currentStatus.borderColor} w-full mb-6`}>
                <div className="p-6 h-full flex items-center">
                    <div className="flex items-start">
                        <div className={`rounded-full p-2 ${currentStatus.bgColor}`}>
                            <StatusIcon className={`h-6 w-6 ${currentStatus.iconColor}`} />
                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {currentStatus.title}
                            </h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {currentStatus.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="space-y-6 pt-4">
                {status === 'approved' && (
                    <div className="text-center text-gray-600">
                        <p>대시보드에서 멘토링을 시작할 수 있습니다</p>
                    </div>
                )}

                {currentStatus.action && (
                    <div className="flex justify-center">
                        <Button
                            onClick={() => router.push(currentStatus.action!.href)}
                            variant={status === 'approved' ? 'primary' : 'secondary'}
                        >
                            {currentStatus.action.text}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}