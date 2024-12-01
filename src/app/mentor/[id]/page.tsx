'use client';

import { useEffect, useState } from "react";
import { mockMentors } from "@/lib/mocks/mentors";
import MentorDetailClient from "@/components/mentor/MentorDetailClient";
import { MyCalendar } from "@/components/common/Calendar";
import { notFound } from "next/navigation";

export default function MentorDetailPage({ params }: { params: { id: string } }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1100);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const mentorId = parseInt(params.id, 10);
    const mentor = mockMentors.find((mentor) => mentor.id === mentorId);

    // 조건문을 훅보다 아래로 위치시킴
    if (!mentor) {
        return notFound(); // 404 페이지 렌더링
    }


    return (
        <div className="flex w-full">
            {/* Mentors Details 컴포넌트 (6:4 비율의 6부분) */}
            <div className="flex-[7] min-w-[400px]">
                <MentorDetailClient mentor={mentor}/>
            </div>

            {/* 화면 너비가 충분하지 않으면 Calendar를 렌더링하지 않음 (4부분) */}
            {!isMobile && (
                <div className="flex-[3] min-w-[350px]">
                    <MyCalendar/>
                </div>
            )}
        </div>


    );
}
