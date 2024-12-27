export interface Mentee {
    name: string;
    profileImage: string | null;
}

export interface Review {
    id: number;
    mentoringId: number;
    mentee: {
        id: number;
        name: string;
        profileImage: string | null;
    };
    rating: number;
    content: string;
    tags: string[];
    reply: string | null;
    status: 'published' | 'hidden' | 'reported';
    createdAt: string;
    updatedAt: string;
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    topTags: Array<{
        tag: string;
        count: number;
    }>;
    monthlyStats: Array<{
        month: string;
        rating: number;
        reviewCount: number;
    }>;
}

export interface ReviewWithMentoring {
    id: number;
    mentoringId: number;
    mentee: {
        id: number;
        name: string;
        profileImage: string | null;
    };
    rating: number;
    content: string;
    tags: string[];
    reply: string | null;
    status: 'published' | 'hidden' | 'reported';
    createdAt: string;
    updatedAt: string;
    mentoring: {
        date: string;
        time: string;
        type: 'individual' | 'group';
        method: 'online' | 'offline';
        title: string;
    };
}