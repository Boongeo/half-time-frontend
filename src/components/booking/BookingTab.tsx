import React, { useState, useEffect } from "react";
import { Calendar, Clock, MessageCircle } from "lucide-react";
import { useMentoring } from "@/lib/hooks/useMentoring";
import { Modal } from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { MonthlyCalendar } from "@/components/booking/MonthlyCalendar";

interface AvailableDate {
    date: string; // "YYYY-MM-DD" 형태
    times: string[]; // 가능한 시간 배열
}

export default function BookingTab() {
    const {
        selectMentoring,
        totalMentoringData,
        isModalOpen,
        setIsModalOpen,
        getAvailableDates,
        selectedMentoringId,
        selectedMentoringTime,
        setSelectedMentoringTime,
    } = useMentoring();

    const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]); // 올바른 타입 지정
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedMentoringId) {
            const dates = getAvailableDates(selectedMentoringId); // 선택된 Session ID에 따라 가능한 날짜를 가져옴
            setAvailableDates(dates);
        }
    }, [selectedMentoringId]);

    const handleDateClick = (date: string) => {
        const selected = availableDates.find((d) => d.date === date);
        if (selected) {
            setSelectedDate(date);
            setAvailableTimes(selected.times); // `times`로 업데이트
        }
    };

    const handleSubmit = async () => {
        if (!selectedDate || !selectedMentoringId || !selectedMentoringTime || !message) {
            console.error("모든 필드를 입력하세요.");
            return;
        }

        const requestData = {
            mentoringId: selectedMentoringId,
            date: selectedDate,
            time: selectedMentoringTime,
            message: message,
        };

        try {
            const response = await fetch("/api/mentoring/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("신청에 실패했습니다.");
            }

            // const result = await response.json();
            alert("멘토링 신청이 완료되었습니다.");
            setIsModalOpen(false);
        } catch (error) {
            alert("멘토링 신청 중 문제가 발생했습니다.");
        }
    };


    return (
        <div>
            <h4 className="mb-4 text-lg font-semibold text-gray-800">멘토링</h4>

            {/* 멘토링 과목 카드 목록 */}
            <div className="flex flex-col gap-4">
                {Array.isArray(totalMentoringData) &&
                    totalMentoringData.map((mentoring) => (
                        <div
                            key={mentoring.id}
                            className="p-4 mb-4 border rounded-lg bg-white shadow-sm hover:shadow-md cursor-pointer"
                            onClick={() => {
                                selectMentoring(mentoring.id, mentoring); // 선택된 멘토링 데이터 업데이트
                                setIsModalOpen(true); // 모달 열기
                            }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-medium text-gray-800">{mentoring.title}</h3>
                                <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                  {mentoring.type === "group" ? "그룹" : "개인"}
                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{mentoring.description}</p>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    {mentoring.availableTime.map((day) => (
                                        <span key={day.day}>{day.day}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{mentoring.availableTime[0]?.times.join(", ")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>{`가격: ${mentoring.price}원`}</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="멘토링 신청"
                description="멘토링 일정을 선택하고 메시지를 입력하세요."
            >
                <div>
                    {/* 달력 컴포넌트 */}
                    <div className="mb-4">
                        <h5 className="mb-2 text-gray-600">일정 선택</h5>
                        <div className="border rounded p-4">
                            <MonthlyCalendar
                                availableDates={availableDates.map((d) => d.date)} // ["YYYY-MM-DD"]
                                onDateClick={handleDateClick}
                                selectedDate={selectedDate}
                            />
                        </div>
                        {selectedDate && (
                            <div className="mt-4">
                                <h6 className="mb-2 text-gray-600">가능한 시간</h6>
                                <div className="flex flex-wrap gap-2">
                                    {availableTimes.map((time) => (
                                        <Button
                                            key={time}
                                            variant="secondary"
                                            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                                            onClick={() => setSelectedMentoringTime(time)}
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 메시지 입력 */}
                    <div className="mb-4">
                        <h5 className="mb-2 text-gray-600">메시지</h5>
                        <textarea
                            className="w-full h-24 border rounded p-2 text-sm text-gray-600"
                            placeholder="멘토에게 보낼 메시지를 입력하세요."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    {/* 신청 버튼 */}
                    <Button
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => {
                            handleSubmit();
                            setIsModalOpen(false);
                        }}
                    >
                        신청하기
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
