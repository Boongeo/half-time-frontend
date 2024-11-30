'use client';

import { useState } from "react";
import Tabs from "@/components/common/Tabs/Tabs";
import ReviewCard from "@/components/review/ReviewCard";
import { Mentor } from "@/types/core/mentor";
import { Mail, MessageCircle } from "lucide-react";
import { mockReviews } from "@/lib/mocks/reviews";
import {formatDeveloperTitle} from "@/lib/utils/category";


const InfoTab = ({ mentor }: { mentor: Mentor }) => (
    <div className="flex flex-col gap-6">
        <div className="p-6 mb-3 bg-gray-50 rounded-lg shadow flex flex-col">
            <p className="text-lg font-medium text-gray-500">소개</p>
            <p className="text-base font-normal text-gray-700">{mentor.intro}</p>
        </div>
        <div className="p-6 mb-3 bg-gray-50 rounded-lg shadow flex flex-col">
            <p className="text-lg font-medium text-gray-500">경력</p>
            <p className="text-lg font-semibold text-gray-800">{mentor.experience}년</p>
        </div>

        <div className="p-6 mb-3 bg-gray-50 rounded-lg shadow flex flex-col">
            <p className="text-lg font-medium text-gray-500">기술 스택</p>
            <div className="flex gap-2">
                {mentor.techStack.map((tech, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-themeColor text-s rounded-full text-white"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>

        <div className="p-6 mb-3 bg-gray-50 rounded-lg shadow flex flex-col">
            <p className="text-lg font-medium text-gray-500">시간당 비용</p>
            <p className="text-lg font-semibold text-gray-800">
                {mentor.hourlyRate.toLocaleString()}원
            </p>
        </div>
    </div>
);

// 리뷰 탭 컴포넌트
const ReviewsTab = ({ reviews, rating }: { reviews: number; rating: number }) => (
    <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-2">
            <div className="w-24 h-24 bg-gray-100 rounded-full border-none shadow-md flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-gray-800">평점</p>
                <p className="text-lg font-semibold text-gray-800">{rating} / 5</p>
            </div>

            <div className="w-24 h-24 ml-4 bg-gray-100 rounded-full border-none shadow-md flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-gray-800">리뷰 수</p>
                <p className="text-lg font-semibold text-gray-800">{reviews}개</p>
            </div>
        </div>

        {mockReviews.map((review) => (
            <ReviewCard
                key={review.id}
                userId={review.userId}
                id={review.id}
                rating={review.rating}
                reviewer={review.reviewer}
                date={review.date}
                content={review.content}
                categories={review.categories}
            />
        ))}
    </div>
);

export default function MentorDetailClient({ mentor }: { mentor: Mentor }) {
    const tabs = [
        { label: "Overview", value: "info" },
        { label: "Reviews", value: "reviews" },
    ];
    const [selectedTab, setSelectedTab] = useState("info");
    const developerTitle = formatDeveloperTitle(mentor.experience, mentor.interest);

    return (
        <div className="container mx-auto p-12">
            {/* 프로필 섹션 */}
            <div className="flex gap-6 items-center">
                <img
                    src={mentor.profileImage}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{mentor.name}</h1>
                    <p className="text-gray-500">{developerTitle} @ {mentor.company}</p>
                </div>

                {/* 이메일/메시지 보내기 버튼 */}
                <div className="flex gap-4">
                    <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100">
                        <Mail size={20} color="#333" />
                    </button>
                    <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100">
                        <MessageCircle size={20} color="#333" />
                    </button>
                </div>
            </div>

            {/* 탭 섹션 */}
            <div className="mt-8">
                <Tabs
                    tabs={tabs}
                    selectedTab={selectedTab}
                    onTabSelect={(value) => setSelectedTab(value)}
                />
            </div>

            {/* 탭 컨텐츠 */}
            <div className="mt-4">
                {selectedTab === "info" ? (
                    <InfoTab mentor={mentor} />
                ) : (
                    <ReviewsTab reviews={mentor.reviewCount} rating={mentor.rating} />
                )}
            </div>
        </div>
    );

}
