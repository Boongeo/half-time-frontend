import { useState } from "react";

interface MentoringTimeSettingsProps {
    availableTime: Array<{
        day: string;
        times: string[];
    }>;
    onChange: (times: Array<{ day: string; times: string[] }>) => void;
}

export default function MentoringTimeSettings({ availableTime, onChange }: MentoringTimeSettingsProps) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const timeSlots = Array.from({ length: 23 }, (_, i) => ({
        start: `${String(i).padStart(2, '0')}:00`,
        end: `${String(i + 1).padStart(2, '0')}:00`
    }));

    const handleDayClick = (day: string) => {
        setSelectedDay(selectedDay === day ? null : day);
    };

    const handleTimeSlotClick = (start: string) => {
        if (!selectedDay) return;

        const currentAvailableTime = [...(availableTime || [])];
        const existingSchedule = currentAvailableTime.find(schedule => schedule?.day === selectedDay);

        if (!existingSchedule) {
            currentAvailableTime.push({
                day: selectedDay,
                times: [start]
            });
        } else {
            if (existingSchedule.times.includes(start)) {
                existingSchedule.times = existingSchedule.times.filter(t => t !== start);
            } else {
                existingSchedule.times.push(start);
                existingSchedule.times.sort();
            }
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

    return (
        <div className="w-full space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">{selectedDay}요일 시간 선택</label>
                        <p className="text-sm text-gray-500">멘토링 가능한 시간을 선택해주세요.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map(({start, end}) => (
                            <button
                                key={start}
                                onClick={() => handleTimeSlotClick(start)}
                                className={`
                                    px-3 py-2 rounded-lg text-sm
                                    ${isTimeSlotSelected(start)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                                `}
                            >
                                {start} ~ {end}
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
                            .map(({day, times}) => (
                                <div key={day} className="flex">
                                    <div className="shrink-0 w-14 h-14 rounded-full text-gray-600 bg-gray-100 flex items-center justify-center font-medium">
                                        {day}
                                    </div>
                                    <div className="flex-1 ml-4 flex items-center min-w-0 bg-gray-50 rounded-lg p-4">
                                        <p className="truncate text-gray-600 text-sm font-light">
                                            {times.sort().map(time => {
                                                const timeIndex = timeSlots.findIndex(slot => slot.start === time);
                                                return `${time}~${timeSlots[timeIndex].end}`;
                                            }).join(', ')}
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