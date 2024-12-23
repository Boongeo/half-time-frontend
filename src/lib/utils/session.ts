import { SessionType, TimeSchedule } from "@/types/core/mentoring";

export const getSessionTypeLabel = (type: SessionType, maxParticipants: number) => {
    return type === 'individual' ? '1:1 멘토링' : `그룹 멘토링 (최대 ${maxParticipants}명)`;
};

export const formatScheduleDisplay = (availableTime: TimeSchedule[]) => {
    if (!availableTime.length) return '시간 미설정';
    return availableTime
        .map(schedule => `${schedule.day}요일 (${schedule.times.length}타임)`)
        .join(', ');
};