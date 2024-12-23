export interface Mentoring {
    id: string;
    subject: string;
    language: string;
    location: string;
    method: "offline" | "online";
    bookings: {
        date: string;
        timeSlots: {
            time: string;
            students: string[];
        }[];
    }[];
}

export interface TimeSchedule {
    day: string;
    times: string[];
}

export interface Session {
    id: number;
    title: string;
    description: string;
    availableTime: Array<{
        day: string;
        times: string[];
        duration: number;
    }>;
    price: number;
}

interface SessionFormData {
    title: string;
    description: string;
    availableTime: Array<{
        day: string;
        times: string[];
        duration: number;
    }>;
    price: string;
}

export interface MenteeApplication {
    id: number;                     // 멘토링 ID
    sessionId: number;              // 세션 ID
    mentee: {                       // 멘티 정보
        id: number;
        name: string;
        profileImage: string;
        interest: string;
    };
    status: 'pending' | 'approved' | 'rejected';    // 멘토링 승인 상태
    preferredDate: string;                          // 희망 날짜 (예: "2024-12-25")
    preferredTime: string;                          // 희망 시간 (예: "14:00")
    message: string;                                // 신청 메시지
    appliedAt: string;                              // 신청 시간
    paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';  // 결제 상태
    cancelReason?: string;                                      // 취소 사유 (있는 경우)
}

export type SessionType = 'individual' | 'group';

export interface ExtendedSessionFormData extends SessionFormData {
    type: SessionType;
    maxParticipants: string;
}

export interface ExtendedSession extends Session {
    type: SessionType;
    maxParticipants: number;
}