'use client';

import { useState } from "react";
import Tabs from "@/components/common/Tabs/Tabs";
import ReviewCard from "@/components/review/ReviewCard";
import { Mentor } from "@/types/mentor";
import { Mail, MessageCircle, CircleDollarSign, Pickaxe, BriefcaseBusiness} from "lucide-react";
import { mockReviews } from "@/lib/mocks/reviews";


const InfoTab = ({ mentor }: { mentor: Mentor }) => (
    <div className="flex flex-col mt-8 gap-5">
        <div className="w-full">
            <div className="w-full flex flex-row items-center gap-4">
                <div
                    className="px-4 py-2 bg-gray-100 rounded-xl flex gap-2 justify-center items-center hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                    <BriefcaseBusiness className="w-6 h-6 text-gray-800"/>
                    <p className="text-lg font-semibold text-gray-800">경력</p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="text-lg font-semibold text-gray-800">{mentor.experience}년</p>
                </div>
            </div>
        </div>


        <div className="w-full">
            <div className="w-full flex flex-row items-center gap-4">
                <div
                    className="px-4 py-2 bg-gray-100 rounded-xl flex gap-2 justify-center items-center hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                    <Pickaxe className="w-6 h-6 text-gray-800"/>
                    <p className="text-lg font-semibold text-gray-800">기술 스택</p>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex gap-1">
                        {mentor.techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-themeColor text-sm rounded-full text-white"
                            >
                        {tech}
                    </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full">
            <div className="w-full flex flex-row items-center gap-4">
                <div
                    className="px-4 py-2 bg-gray-100 rounded-xl flex gap-2 justify-center items-center hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                    <CircleDollarSign className="w-6 h-6 text-gray-800"/>
                    <p className="text-lg font-semibold text-gray-800">시간당 비용</p>
                </div>
                <div className="flex flex-row gap-4">
                    <p className="text-lg font-semibold text-gray-800">{mentor.hourlyRate.toLocaleString()}원</p>
                </div>
            </div>
        </div>

    </div>
);

// 리뷰 탭 컴포넌트
const ReviewsTab = ({reviews, rating}: { reviews: number; rating: number }) => (
    <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-2">
            <div
                className="w-24 h-24 bg-gray-100 rounded-full border-none shadow-md flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-gray-800">평점</p>
                <p className="text-lg font-semibold text-gray-800">{rating} / 5</p>
            </div>

            <div
                className="w-24 h-24 ml-4 bg-gray-100 rounded-full border-none shadow-md flex flex-col justify-center items-center">
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

    return (
        <div className="container mx-auto p-12">
            {/* 프로필 섹션 */}
            <div className="flex gap-7 items-center">
                <img
                    src={mentor.profileImage}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div className="flex-1">
                    <div className="flex flex-row items-center gap-2">
                        <h1 className="text-2xl text-gray-600 font-bold">{mentor.name}</h1>
                        <p className="text-gray-500">{mentor.role} @ {mentor.company}</p>
                    </div>
                    <p className="mt-3 text-lg text-gray-800 font-semibold break-words">
                        {mentor.intro}
                    </p>
                </div>

                {/* 이메일/메시지 보내기 버튼 */}
                <div className="flex gap-4">
                    <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100">
                        <Mail size={20} color="#333"/>
                    </button>
                    <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-100">
                        <MessageCircle size={20} color="#333"/>
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
                    <InfoTab mentor={mentor}/>
                ) : (
                    <ReviewsTab reviews={mentor.reviewCount} rating={mentor.rating}/>
                )}
            </div>
        </div>
    );

}
