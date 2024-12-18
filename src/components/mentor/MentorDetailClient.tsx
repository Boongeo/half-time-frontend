'use client';

import { useState } from "react";
import Tabs from "@/components/common/Tabs/Tabs";
import { Mentor } from "@/types/core/mentor";
import MentorProfile from "@/components/mentor/MentorProfile";
import MentorInfoTab from "@/components/mentor/MentorInfoTab";
import BookingTab from "@/components/booking/BookingTab";
import ReviewTab from "@/components/review/ReviewTab";

export default function MentorDetailClient({ mentor }: { mentor: Mentor }) {
    const tabs = [
        { label: "Overview", value: "info" },
        { label: "Reviews", value: "reviews" },
    ];

    const [selectedTab, setSelectedTab] = useState("info");

    return (
        <div className="container mx-auto p-12">
            {/* 프로필 섹션 */}
            <MentorProfile mentor={mentor} />
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
                    <div className="flex flex-col px-4 gap-6">
                        <MentorInfoTab mentor={mentor}/>

                        <BookingTab />
                    </div>
                    ) : (
                    <ReviewTab reviews={mentor.reviewCount} rating={mentor.rating}/>
                )}
            </div>
        </div>
    );

}
