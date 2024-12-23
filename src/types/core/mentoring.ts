export interface TimeSchedule {
    day: string;
    times: string[];
}

export interface Mentoring {
    id: number;
    sessionId: number;
    date: string;
    time: string;
    participants: Array<{
        menteeId: number;
        status: 'confirmed' | 'pending' | 'cancelled';
    }>;
    status: 'open' | 'full' | 'completed';
    currentParticipantCount: number;
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

export interface Session {
    id: number;
    title: string;
    description: string;
    method: 'offline' | 'online';
    location?: string;
    link?: string;
    availableTime: Array<{
        day: string;
        times: string[];
        duration: number;
    }>;
    price: number;
    type: SessionType;
    maxParticipants?: number;
}

export interface SessionFormData {
    title: string;
    description: string;
    method: 'offline' | 'online';
    location?: string;
    link?: string;
    availableTime: Array<{
        day: string;
        times: string[];
        duration: number;
    }>;
    price: string;
    type: SessionType;
    maxParticipants?: string;
}