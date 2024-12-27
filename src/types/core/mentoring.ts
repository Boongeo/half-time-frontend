// 1. 세션 (멘토가 개설하는 과목/클래스)
export interface Session {
    id: number;
    title: string;
    description: string;
    method: 'offline' | 'online';
    location?: string;
    link?: string;
    type: 'individual' | 'group';
    maxParticipants?: number;
    duration: number;
    availableDays: Array<{
        day: string;
        times: string[];
    }>;
    price: number;
    createdAt: string;
    updatedAt: string;
}

// 2. 멘토링 (실제 진행되는 수업)
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
    maxParticipantCount: number;
}


// 3. 멘토링 신청
export interface MenteeApplication {
    id: number;                     // 멘토링 신청 ID
    mentoringId: number;            // 멘토링 ID
    mentee: {                       // 멘티 정보
        id: number;
        name: string;
        profileImage: string | null;
        interest: string;
    };
    message: string;                                // 신청 메시지
    status: 'pending' | 'approved' | 'rejected';    // 멘토링 승인 상태
    appliedAt: string;                              // 신청 시간
    paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';  // 결제 상태
    cancelReason?: string;                                      // 취소 사유 (있는 경우)
}

// 4. 세션 폼 데이터
export interface SessionFormData {
    title: string;
    description: string;
    method: 'offline' | 'online';
    location?: string;
    link?: string;
    duration: string;
    availableDays: Array<{
        day: string;
        times: string[];
    }>;
    price: string;
    type: 'individual' | 'group';
    maxParticipants?: string;
}

export interface TimeSchedule {
    day: string;
    times: string[];
}
