import { useState, useEffect } from "react";
import {Session, MenteeApplication, BookingApplication} from "@/types/core/mentoring";
import { BookingService } from "@/lib/services/bookingService";
import { mockSessions } from "@/lib/mocks/sessions";

export const useMentoring = () => {
    const [selectedMentoringId, setSelectedMentoringId] = useState<number>(0);
    const [selectedMentoringData, setSelectedMentoringData] = useState<Session | null>(null);
    const [selectedMentoringDate, setSelectedMentoringDate] = useState<string | null>(null);
    const [selectedMentoringTime, setSelectedMentoringTime] = useState<string | null>(null);
    const [bookingMessage, setBookingMessage] = useState<string | null>(null);
    const [totalMentoringData, setTotalMentoringData] = useState<Session[] | null>(null);
    const [menteeApplications, setMenteeApplications] = useState<BookingApplication[] | null>(null);
    const [selectedStatus, setSelectedStatus] = useState('pending');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const bookingService = new BookingService();

    const selectMentoring = (id: number, data: Session) => {
        setSelectedMentoringId(id);
        setSelectedMentoringData(data);
    };

    const clearSelection = () => {
        setSelectedMentoringId(0);
        setSelectedMentoringData(null);
        setSelectedMentoringDate(null);
        setSelectedMentoringTime(null);
        setBookingMessage(null);
    };

    interface AvailableDate {
        date: string; // "YYYY-MM-DD" 형태
        times: string[]; // 가능한 시간 배열
    }

    // 변환 함수
    function getAvailableDates(sessionId: number): AvailableDate[] {
        const session = mockSessions.find((s) => s.id === sessionId);
        if (!session) return [];

        const today = new Date();
        const dates = [];

        for (let i = 0; i < 30; i++) { // 30일간의 날짜 계산
            const date = new Date(today); // 오늘 날짜를 복사하여 새로운 객체를 만듬
            date.setDate(today.getDate() + i); // 복사된 날짜를 1일씩 증가시킴

            const dayName = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
            const availability = session.availableDays.find((time) => time.day === dayName);

            if (availability) {
                dates.push({
                    date: date.toISOString().split("T")[0],
                    times: availability.times,
                });
            }
        }

        return dates;
    }


    const fetchMentoringData = async () => {
        try {
            const mentoringResponse = await bookingService.getMentoringData();
            if (mentoringResponse.success) {
                setTotalMentoringData(mentoringResponse.data);
            } else {
                console.error("Failed to fetch mentoring data");
            }

            const bookingResponse = await bookingService.getBookingData();
            if (bookingResponse.success) {
                setMenteeApplications(bookingResponse.data);
            } else {
                console.error("Failed to fetch booking data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filteredApplications = menteeApplications?.filter(
        (application) => application.status === selectedStatus
    ) || [];

    // 상태 탭 클릭 시 상태 변경
    const handleStatusTabClick = (status: MenteeApplication["status"]) => {
        setSelectedStatus(status);
    };

    useEffect(() => {
        fetchMentoringData();
    }, []);

    return {
        applications: filteredApplications,  // 필터링된 신청서 목록
        selectedMentoringId,
        selectedMentoringData,
        selectedMentoringDate,
        selectedMentoringTime,
        selectedStatus,
        bookingMessage,
        totalMentoringData,
        menteeApplications,
        isModalOpen,
        setIsModalOpen, // 추가
        setSelectedMentoringDate,
        setSelectedMentoringTime,
        setBookingMessage,
        selectMentoring,
        clearSelection,
        getAvailableDates,
        handleStatusTabClick,
    };
};
