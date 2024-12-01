'use client';

import { useState, useEffect, forwardRef } from 'react';
import {useRouter} from 'next/navigation';
import { CalendarProps } from 'react-calendar';
import { CalendarValue } from '@/types/react-calendar';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { mockBookings } from '@/lib/mocks/bookings';
import { Booking, BookingsForDate } from '@/types/booking';

export const MyCalendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
    const [date, setDate] = useState<CalendarValue>(new Date());
    const today = new Date().toDateString(); // 오늘 날짜
    const [appointments, setAppointments] = useState<BookingsForDate | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 클릭된 날짜 저장
    const router = useRouter();

    // 컴포넌트가 마운트되었을 때 오늘 날짜의 예약 정보를 자동으로 불러오기
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    // 날짜 변경 시 예약 정보 필터링
    const filterAppointments = (selectedDate: Date) => {
        // UTC 기준으로 날짜를 YYYY-MM-DD 형식으로 변환
        const dateStr = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))
            .toISOString().split('T')[0];
        const foundAppointments = mockBookings.find((booking) => booking.date === dateStr);
        setAppointments(foundAppointments || { date: dateStr, bookings: [] }); // 해당 날짜의 예약 정보 필터링
    };


    // 날짜 변경 시 실행되는 함수
    const onChange = (newDate: Date | Date[]) => {
        if (newDate && !(Array.isArray(newDate))) {
            setDate(newDate);
            filterAppointments(newDate); // 예약 정보 필터링
        }
    };

    // 날짜를 클릭했을 때, 클릭된 날짜와 예약 목록이 정확하게 연결되도록 수정
    const handleDateClick = (date: Date) => {
        // 클릭된 날짜의 시간을 UTC로 초기화 (00:00:00)
        const clickedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

        setSelectedDate(clickedDate);
        onChange(clickedDate); // 날짜를 클릭하면 해당 날짜의 예약 정보 필터링
    };

    // 이전/다음 주로 이동하기 위한 핸들러
    const navigateWeek = (direction: 'prev' | 'next') => {
        const currentDate = new Date(date as Date);
        const currentDay = currentDate.getDay();
        const offset = direction === 'prev' ? -7 : 7;
        currentDate.setDate(currentDate.getDate() - currentDay + offset); // 주의 첫 날짜로 이동
        setDate(currentDate);
    };

    // 주간 뷰에서 표시할 날짜들을 계산
    const getWeekDates = (currentDate: Date) => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // 주의 시작일 (일요일)

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
    };

    const weekDates = getWeekDates(new Date(date as Date));

    // 주의 시작일과 끝일을 구하는 함수
    const getWeekRange = (currentDate: Date) => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // 주의 시작일 (일요일)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // 주의 끝일 (토요일)

        return {
            start: startOfWeek.toLocaleDateString(),
            end: endOfWeek.toLocaleDateString(),
        };
    };

    const weekRange = getWeekRange(new Date(date as Date));


    return (
        <div ref={ref} className="p-8 mr-12 mt-12 border-[2px] rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigateWeek('prev')}
                    className="flex justify-center items-center w-6 h-6 bg-black text-white rounded-full"
                >
                    <ChevronLeft/>
                </button>
                <span className="text-lg font-semibold">
                    {weekRange.start} - {weekRange.end}
                </span>
                <button
                    onClick={() => navigateWeek('next')}
                    className="flex justify-center items-center w-6 h-6 bg-black text-white rounded-full"
                >
                    <ChevronRight/>
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {weekDates.map((date, index) => {
                    const isSelected = date.toDateString() === selectedDate?.toDateString();
                    const isToday = date.toDateString() === today;

                    return (
                        <div
                            key={index}
                            className={`text-center cursor-pointer 
                                ${isSelected ? 'font-bold' : ''} 
                                ${isToday ? 'bg-gray-300 text-white rounded-md ' : ''}
                            `}
                            onClick={() => handleDateClick(date)} // 클릭 시 handleDateClick 호출
                        >
                            <div>{date.getDate()}</div>
                            {/* 날짜만 출력 */}
                            <div className="text-sm text-gray-500">
                                {date.toLocaleString('en-US', {weekday: 'short'})}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4">
                {selectedDate ? (  // 날짜를 선택했는지 확인
                    appointments && appointments.bookings && appointments.bookings.length > 0 ? (  // 예약이 있는지 확인
                        <ul className="list-disc space-y-2">
                            {appointments.bookings.map((booking: Booking, index: number) => (
                                <li key={index}
                                    onClick={() => router.push(`/booking/${booking.id}`)}
                                    className="flex justify-between items-center bg-blue-50 rounded-md px-1 py-4 cursor-pointer">
                                    <div className="flex flex-row items-center">
                                        <Calendar className="w-8 h-6 text-themeColor ml-2 mr-4"/>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-md text-gray-600 font-semibold">{booking.subject}</span>
                                            <span className="mt-1 text-sm text-gray-500">Mentor: {booking.mentor}</span>
                                            <span className="text-sm text-gray-500">Time: {booking.time}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <p className="text-md text-gray-600 font-semibold">No bookings for this day</p>
                            <p onClick={() => router.push(`/explore`)} className="mt-2 text-md text-green-800 font-bold underline cursor-pointer">
                                Explore more
                            </p>
                        </div>
                    )
                ) : (
                    <p>Select a date to see the bookings.</p>
                )}
            </div>


        </div>
    );
});

MyCalendar.displayName = 'MyCalendar';
