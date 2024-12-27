import {MenteeApplication, Mentoring} from "@/types/core/mentoring";
import _ from "lodash";

interface TimeSlotGroup {
    date: string;
    time: string;
    mentoring: Mentoring;
    applications: MenteeApplication[];
}

export const groupApplicationsByMentoring = (
    applications: MenteeApplication[],
    mentorings: Map<number, Mentoring>
): TimeSlotGroup[] => {
    const applicationsByMentoring = _.groupBy(applications, 'mentoringId');

    const groups = Object.entries(applicationsByMentoring)
        .map(([mentoringId, mentorApps]) => {
            const mentoring = mentorings.get(Number(mentoringId));
            if (!mentoring) return null;

            return {
                date: mentoring.date,
                time: mentoring.time,
                mentoring,
                applications: mentorApps
            };
        })
        .filter((group): group is TimeSlotGroup => group !== null);

    return _.sortBy(groups, ['date', 'time']);
};

// 시간대별 그룹 수 계산
export const getGroupCount = (mentorings: Mentoring[]): number => {
    return new Set(mentorings.map(m => `${m.date}-${m.time}`)).size;
};

// 시간 포맷 함수
export const formatMentoringTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startDate = new Date(2024, 0, 1, hours, minutes);
    const endDate = new Date(startDate.getTime() + duration * 60000);

    return `${time}~${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
};

// 날짜 포맷 함수
export const formatMentoringDate = (date: string): string => {
    return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    });
};

// 멘토링 상태에 따른 뱃지 스타일 반환
export const getMentoringStatusStyle = (status: Mentoring['status']) => {
    switch (status) {
        case 'open':
            return 'bg-green-50 text-green-600';
        case 'full':
            return 'bg-yellow-50 text-yellow-600';
        case 'completed':
            return 'bg-gray-50 text-gray-600';
        default:
            return 'bg-gray-50 text-gray-600';
    }
};

// 결제 상태에 따른 뱃지 스타일 반환
export const getPaymentStatusStyle = (status: MenteeApplication['paymentStatus']) => {
    switch (status) {
        case 'paid':
            return 'bg-green-50 text-green-600';
        case 'pending':
            return 'bg-yellow-50 text-yellow-600';
        case 'refunded':
            return 'bg-gray-50 text-gray-600';
        case 'failed':
            return 'bg-red-50 text-red-600';
        default:
            return 'bg-gray-50 text-gray-600';
    }
};