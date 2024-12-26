import {Mentoring, Session} from "@/types/core/mentoring";

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    unrespondedReviews: number;
    monthlyReviews: number;
    reviewGrowth: number;
    recommendRate: number;
}

export interface Mentee {
    name: string;
    profileImage: string | null;
}

export interface Review {
    id: number;
    sessionId: number;          // 세션 ID
    mentoringId: number;        // 멘토링 ID 추가
    mentee: {
        id: number;             // menteeId 추가
        name: string;
        profileImage: string | null;
    };
    rating: number;
    positives: string;
    improvements: string;
    reply: string | null;
    isReported: boolean;
    createdAt: string;         // 리뷰 작성 시간
}

export interface ReviewWithDetails extends Review {
    session: Session;
    mentoring: Mentoring;
}