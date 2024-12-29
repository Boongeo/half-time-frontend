import {MenteeApplication, SessionType, TimeSchedule} from "@/types/core/mentoring";

interface TimeSlotGroup {
    date: string;
    time: string;
    applications: MenteeApplication[];
}

export const getSessionTypeLabel = (type: SessionType, maxParticipants: number) => {
    return type === 'individual' ? '1:1 멘토링' : `그룹 멘토링 (최대 ${maxParticipants}명)`;
};

export const formatScheduleDisplay = (availableTime: TimeSchedule[]) => {
    if (!availableTime.length) return '시간 미설정';
    return availableTime
        .map(schedule => `${schedule.day}요일 (${schedule.times.length}타임)`)
        .join(', ');
};

// 신청을 날짜/시간별로 그룹화
export const groupApplicationsByTimeSlot = (applications: MenteeApplication[]): TimeSlotGroup[] => {
    const groups: { [key: string]: TimeSlotGroup } = {};

    applications.forEach(app => {
        const key = `${app.preferredDate}-${app.preferredTime}`;
        if (!groups[key]) {
            groups[key] = {
                date: app.preferredDate,
                time: app.preferredTime,
                applications: []
            };
        }
        groups[key].applications.push(app);
    });

    // 날짜순, 시간순으로 정렬
    return Object.values(groups).sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    });
};

// 시간대별 그룹 수 계산
export const getGroupCount = (applications: MenteeApplication[]): number => {
    return Object.keys(
        applications.reduce((groups: { [key: string]: MenteeApplication[] }, app) => {
            const key = `${app.preferredDate}-${app.preferredTime}`;
            groups[key] = [...(groups[key] || []), app];
            return groups;
        }, {})
    ).length;
};

// 세션 타임 포맷 함수
export const formatSessionTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const endTime = new Date(2024, 0, 1, hours, minutes + duration);
    return `${time}~${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
};