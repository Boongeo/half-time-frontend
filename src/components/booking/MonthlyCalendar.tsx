'use client';

import { useState, forwardRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

interface MonthlyCalendarProps {
    availableDates: string[];
    onDateClick: (date: string) => void;
    selectedDate: string | null;
}

export const MonthlyCalendar = forwardRef<HTMLDivElement, MonthlyCalendarProps>(({
                                                                                     availableDates,
                                                                                     onDateClick,
                                                                                     selectedDate,
                                                                                 }, ref) => {
    const [currentMonth, setCurrentMonth] = useState(() => new Date());
    const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 월 변경 핸들러
    const handleMonthChange = (direction: 'prev' | 'next') => {
        const newMonth = addMonths(currentMonth, direction === 'prev' ? -1 : 1);
        setCurrentMonth(newMonth);
    };

    // 한 달의 날짜 배열 생성
    const generateMonthDates = (month: Date) => {
        const startOfMonthDate = startOfMonth(month);
        const endOfMonthDate = endOfMonth(month);

        // 주의 시작과 끝을 계산
        const startOfWeekDate = startOfWeek(startOfMonthDate, { weekStartsOn: 0 });
        const endOfWeekDate = endOfWeek(endOfMonthDate, { weekStartsOn: 0 });

        const dates = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeekDate });

        return dates;
    };

    const monthDates = generateMonthDates(currentMonth);

    return (
        <div ref={ref} className="p-8 border-[2px] rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => handleMonthChange('prev')}
                    className="flex justify-center items-center w-6 h-6 bg-themeColor text-white rounded-full"
                >
                    <ChevronLeft />
                </button>
                <span className="text-lg text-gray-800 font-semibold">
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <button
                    onClick={() => handleMonthChange('next')}
                    className="flex justify-center items-center w-6 h-6 bg-themeColor text-white rounded-full"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-gray-500 font-semibold">
                {weekDays.map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>

            {/* 날짜 출력 */}
            <div className="grid grid-cols-7 gap-2">
                {monthDates.map((date, index) => {
                    const dateString = format(date, 'yyyy-MM-dd');
                    const isToday = format(new Date(), 'yyyy-MM-dd') === dateString;
                    const isAvailable = availableDates.includes(dateString);
                    const isDisabled = !isAvailable;

                    return (
                        <div
                            key={index}
                            className={`text-center p-2 rounded-md cursor-pointer
                                ${isToday ? 'bg-gray-300 text-white' : ''}
                                ${isAvailable ? 'text-gray-800 font-bold' : 'text-gray-400'}
                                ${isDisabled ? 'cursor-not-allowed' : ''}
                                ${selectedDate === dateString ? 'font-bold bg-black text-white' : ''}
                            `}
                            onClick={() => !isDisabled && onDateClick(dateString)}
                        >
                            {format(date, 'd')}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

MonthlyCalendar.displayName = 'MonthlyCalendar';
