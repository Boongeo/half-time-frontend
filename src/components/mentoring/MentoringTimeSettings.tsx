import { useState } from "react";
import {Input} from "@/components/common/Input";

interface MentoringTimeSettingsProps {
    availableTime: Array<{
        day: string;
        times: string[];
        duration: number;
    }>;
    onChange: (times: Array<{ day: string; times: string[]; duration: number }>) => void;
}

export default function MentoringTimeSettings({ availableTime, onChange }: MentoringTimeSettingsProps) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [sessionDuration, setSessionDuration] = useState("60");
    const [durationError, setDurationError] = useState<string>("");
    const days = ['월', '화', '수', '목', '금', '토', '일'];

    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        return `${String(i).padStart(2, '0')}:00`;
    });

    const handleDayClick = (day: string) => {
        setSelectedDay(selectedDay === day ? null : day);
    };

    // 시간이 겹치는지 확인하는 함수
    const checkTimeOverlap = (daySchedule: typeof availableTime[0], newStart: string, duration: number) => {
        const newStartMinutes = timeToMinutes(newStart);
        const newEndMinutes = newStartMinutes + duration;

        return daySchedule.times.some(existingStart => {
            const existingStartMinutes = timeToMinutes(existingStart);
            const existingEndMinutes = existingStartMinutes + daySchedule.duration;

            // 새로운 시간대가 기존 시간대와 겹치는지 확인
            return (
                (newStartMinutes >= existingStartMinutes && newStartMinutes < existingEndMinutes) ||
                (newEndMinutes > existingStartMinutes && newEndMinutes <= existingEndMinutes) ||
                (newStartMinutes <= existingStartMinutes && newEndMinutes >= existingEndMinutes)
            );
        });
    };

    // 시간을 분으로 변환하는 헬퍼 함수
    const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const [timeError, setTimeError] = useState<string>("");

    const handleTimeSlotClick = (start: string) => {
        if (!selectedDay) return;
        setTimeError("");

        const currentAvailableTime = [...(availableTime || [])];
        const existingSchedule = currentAvailableTime.find(schedule => schedule?.day === selectedDay);
        const duration = parseInt(sessionDuration);

        if (!existingSchedule) {
            currentAvailableTime.push({
                day: selectedDay,
                times: [start],
                duration: duration
            });
        } else {
            if (existingSchedule.times.includes(start)) {
                existingSchedule.times = existingSchedule.times.filter(t => t !== start);
            } else {
                // 시간 중복 체크
                if (checkTimeOverlap(existingSchedule, start, duration)) {
                    setTimeError(`선택한 시간(${start})에 이미 다른 세션이 예약되어 있습니다.`);
                    return;
                }
                existingSchedule.times.push(start);
                existingSchedule.times.sort();
            }
            existingSchedule.duration = duration;
        }

        const filteredSchedule = currentAvailableTime.filter(schedule =>
            schedule && schedule.times.length > 0
        );

        onChange(filteredSchedule);
    };

    const isTimeSlotSelected = (start: string) => {
        if (!selectedDay) return false;
        const daySchedule = availableTime?.find(schedule => schedule.day === selectedDay);
        return daySchedule?.times.includes(start) || false;
    };

    const calculateEndTime = (startTime: string, durationMinutes: number) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + durationMinutes;
        const endHours = Math.floor(totalMinutes / 60);
        const endMinutes = totalMinutes % 60;
        return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    };

    return (
        <div className="w-full space-y-4">
            {/* 세션 시간 선택 */}
            <div className="w-full border rounded-lg p-6 bg-white">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">세션 시간</label>
                    <p className="text-sm text-gray-500">멘토링 세션 진행 시간을 선택해주세요.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={sessionDuration}
                        onChange={(e) => {
                            const value = e.target.value;
                            const duration = parseInt(value);

                            if (duration < 30 && value !== "") {
                                setDurationError("세션 시간은 30분 이상이어야 합니다");
                            } else {
                                setDurationError("");
                            }

                            setSessionDuration(value);
                        }}
                        min="30"
                        step="10"
                        className="w-24"
                        placeholder="60"
                    />
                    <span className="text-gray-600">분</span>
                </div>
                {durationError && (
                    <p className="mt-1 text-sm text-red-500">{durationError}</p>
                )}
            </div>

            {/* 요일 선택 섹션 */}
            <div className="w-full border rounded-lg p-6 bg-white">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">요일 선택</label>
                    <p className="text-sm text-gray-500">멘토링 가능한 요일을 선택해주세요.</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => handleDayClick(day)}
                            className={`
                                w-11 h-11 rounded-full flex items-center justify-center
                                transition-colors
                                ${selectedDay === day
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                            `}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* 시간 선택 그리드 */}
            {selectedDay && (
                <div className="w-full border rounded-lg p-6 bg-white">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">{selectedDay}요일 시작 시간 선택</label>
                        <p className="text-sm text-gray-500">멘토링 시작 시간을 선택해주세요. ({sessionDuration}분 세션)</p>
                        {timeError && (
                            <p className="mt-2 text-sm text-red-500">{timeError}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => handleTimeSlotClick(time)}
                                className={`
                                    px-3 py-2 rounded-lg text-sm
                                    ${isTimeSlotSelected(time)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                                `}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 선택된 시간 요약 섹션 */}
            <div className="border rounded-lg p-6 bg-white">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">선택된 멘토링 시간</label>
                    <p className="text-sm text-gray-500">선택하신 멘토링 가능 시간 목록입니다.</p>
                </div>
                <div className="space-y-3">
                    {!availableTime || availableTime.length === 0 ? (
                        <p className="text-sm text-gray-500">아직 선택된 시간이 없습니다.</p>
                    ) : (
                        availableTime
                            .sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day))
                            .map(({day, times, duration}) => (
                                <div key={day} className="flex">
                                    <div className="shrink-0 w-14 h-14 rounded-full text-gray-600 bg-gray-100 flex items-center justify-center font-medium">
                                        {day}
                                    </div>
                                    <div className="flex-1 ml-4 flex items-center min-w-0 bg-gray-50 rounded-lg p-4">
                                        <p className="truncate text-gray-600 text-sm font-light">
                                            {times.sort().map(time =>
                                                `${time}~${calculateEndTime(time, duration)}`
                                            ).join(', ')}
                                        </p>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
}