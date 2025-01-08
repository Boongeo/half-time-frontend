// 0. 공통 상태 타입들
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
export type SessionMethod = 'offline' | 'online';
export type SessionType = 'individual' | 'group';
export type MentoringStatus = 'open' | 'full' | 'completed';
export type ParticipantStatus = 'confirmed' | 'pending' | 'cancelled';

// 1. 멘티 정보
export interface MenteeInfo {
    id: number;
    name: string;
    profileImage: string | null;
    interest: string;
}

// 2. 세션 (멘토가 개설하는 과목/클래스)
export interface Session {
    id: number;
    title: string;
    description: string;
    method: SessionMethod;
    type: SessionType;
    duration: number;
    price: number;
    maxParticipants?: number;
    availableDays: Array<{
        day: string;
        times: string[];
    }>;
    location?: string;
    link?: string;
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
        status: ParticipantStatus;
    }>;
    status: MentoringStatus;
    currentParticipantCount: number;
    maxParticipantCount: number;
}

// 3. 멘토링 신청 (for Mentor)
export interface MenteeApplication {
    id: number;                     // 멘토링 신청 ID
    mentoringId: number;            // 멘토링 ID
    mentee: MenteeInfo;             // 멘티 정보
    message: string;                // 신청 메시지
    status: ApplicationStatus;      // 멘토링 승인 상태
    appliedAt: string;              // 신청 시간
    paymentStatus: PaymentStatus;   // 결제 상태
    cancelReason?: string;          // 취소 사유 (있는 경우)
}

// 4. 멘토링 신청 (for Mentee)
export interface BookingApplication {
    id: number;                     // 멘토링 ID
    sessionId: number;              // 세션 ID
    mentee: MenteeInfo;
    mentorInfo: {
        id: number;
        name: string;
    }
    preferredDate: string;                          // 희망 날짜 (예: "2024-12-25")
    preferredTime: string;                          // 희망 시간 (예: "14:00")
    message: string;                                // 신청 메시지
    status: ApplicationStatus;                      // 멘토링 승인 상태
    appliedAt: string;                              // 신청 시간
    paymentStatus: PaymentStatus;                   // 결제 상태
    cancelReason?: string;                          // 취소 사유 (있는 경우)
}

// 5. 세션 생성 폼 데이터
export interface SessionFormData {
    title: string;
    description: string;
    method: SessionMethod;
    location?: string;
    link?: string;
    duration: string;
    availableDays: Array<{
        day: string;
        times: string[];
    }>;
    price: string;
    type: SessionType;
    maxParticipants?: string;
}
