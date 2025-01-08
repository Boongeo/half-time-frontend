'use client'

import { MentorReviewSection } from "@/components/mentor-review/MentorReviewSection";
import { mockStats } from "@/lib/mocks/mentor-reviews";

export default function MentorReviewPage() {
    return (
        <div className="flex flex-col h-full pb-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700">멘토링 리뷰 관리</h1>
                    <p className="text-gray-500">멘티들의 리뷰를 확인하고 관리하세요</p>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
                <MentorReviewSection
                    stats={mockStats}
                />
            </div>
        </div>
    );
}