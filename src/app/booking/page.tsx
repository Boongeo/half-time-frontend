'use client';

import { useMentoring } from "@/lib/hooks/useMentoring";
import Tabs from "@/components/common/Tabs/Tabs";
import BookingCard from "@/components/booking/BookingCard";
import { MenteeApplication } from "@/types/core/mentoring";

const BookingPage: React.FC = () => {
    const { applications, selectedStatus, handleStatusTabClick } = useMentoring();

    const tabs = [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Canceled", value: "canceled" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-600">Mentorings</h1>
            <p className="mt-[4px] text-gray-500">내가 신청한 멘토링을 확인하세요</p>
            <div className="mt-8">
                <Tabs
                    tabs={tabs}
                    selectedTab={selectedStatus}
                    onTabSelect={(value: MenteeApplication["status"]) => handleStatusTabClick(value)}
                />
            </div>
            <div className="mt-8">
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <BookingCard
                            key={application.id}
                            application={application}
                        />
                    ))
                ) : (
                    <p className="text-gray-600">해당 상태의 신청이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default BookingPage;