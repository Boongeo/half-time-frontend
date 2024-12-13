import React from "react";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { MonthlyCalendar } from "@/components/booking/MonthlyCalendar";
import { useBooking } from "@/lib/hooks/useBooking";
import { Globe, MapPin, Laptop, NotebookPen } from "lucide-react";

const BookingTab: React.FC = () => {
    const {
        selectedMentoring,
        selectedDate,
        selectedMentoringData,
        bookedTimeSlot,
        bookingStatus,
        totalMentoringData,
        availableDates,
        handleSubjectClick,
        handleDateClick,
        handleTimeSlotClick,
        setBookingStatus,
        bookMentoring,
    } = useBooking();

    const handleBookClick = async () => {
        if (!selectedMentoring || !selectedDate || !bookedTimeSlot) {
            alert("모든 예약 정보를 선택해주세요.");
            return;
        }

        setBookingStatus("loading");

        // 예약 처리 호출
        await bookMentoring();

        if (bookingStatus === "success") {
            alert("예약이 완료되었습니다!");
        } else if (bookingStatus === "error") {
            alert("예약에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            <div className="w-full flex flex-row items-center gap-4">
                <div
                    className="px-4 py-2 mb-4 bg-gray-100 rounded-xl flex gap-2 justify-center items-center hover:bg-gray-300 transition-all duration-300 cursor-pointer">
                    <NotebookPen className="w-6 h-6 text-gray-800" />
                    <p className="text-lg font-semibold text-gray-800">멘토링</p>
                </div>
                <div className="mb-4">
                    <Select
                        value={selectedMentoring || ''}
                        onChange={(e) => handleSubjectClick(e.target.value)}
                        options={
                            Array.isArray(totalMentoringData)
                                ? totalMentoringData.map((mentoring) => ({
                                    label: mentoring.subject,
                                    value: mentoring.id,
                                }))
                                : []
                        }
                        placeholder="멘토링 선택"
                    />

                </div>
            </div>

            {selectedMentoring && (
                <div className="p-4 border rounded mt-4">
                    <div className="flex flex-row gap-4">
                        <MonthlyCalendar
                            availableDates={availableDates}
                            onDateClick={handleDateClick}
                            selectedDate={selectedDate}
                        />
                        {selectedDate && (
                            <div className="mt-4">
                                <div>
                                    <h2 className="w-fit px-4 py-1 rounded-full font-semibold bg-themeColor text-white-100 text-lg mb-4">
                                        {selectedMentoringData?.subject}
                                    </h2>
                                    <div className="flex flex-col gap-2 mb-8">
                                        <div
                                            className="flex items-center gap-2 bg-gray-200 text-gray-900 w-fit p-2 rounded-md">
                                            <Globe className="text-gray-900" />
                                            <h2 className="text-gray-900">
                                                {selectedMentoringData?.language}
                                            </h2>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 bg-gray-200 text-gray-900 w-fit p-2 rounded-md">
                                            <MapPin className="text-gray-900" />
                                            <h2 className="text-gray-900">
                                                {selectedMentoringData?.location}
                                            </h2>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 bg-gray-200 text-gray-900 w-fit p-2 rounded-md">
                                            <Laptop className="text-gray-900" />
                                            <h2 className="text-gray-900">
                                                {selectedMentoringData?.method}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-gray-700 font-semibold mt-4 ">
                                    {selectedDate} 예약 가능 시간
                                </h4>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {selectedMentoringData?.bookings
                                        .find((booking) => booking.date === selectedDate)
                                        ?.timeSlots.map((timeSlot) => (
                                            <button
                                                key={timeSlot.time}
                                                onClick={() => handleTimeSlotClick(timeSlot.time)}
                                                className={`p-2 border rounded ${
                                                    bookedTimeSlot === timeSlot.time
                                                        ? 'bg-themeColor text-white'
                                                        : 'bg-white text-gray-700'
                                                } cursor-pointer transition-colors duration-200`}
                                            >
                                                {timeSlot.time} <br /> ({timeSlot.students.length}명)
                                            </button>
                                        ))}
                                    {bookedTimeSlot && (
                                        <div className="w-full flex items-end justify-end">
                                            <Button onClick={handleBookClick} disabled={bookingStatus === "loading"}>
                                                {bookingStatus === "loading" ? "예약 중..." : "예약하기"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingTab;
