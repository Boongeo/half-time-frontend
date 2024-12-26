import {useMemo} from "react";
import {mockReviews} from "../mocks/mentor-reviews";
import {mockSessions} from "@/lib/mocks/sessions";
import {mockMentorings} from "@/lib/mocks/mentorings";

export function useReview() {
    return useMemo(() => {
        return mockReviews.map(review => {
            const session = mockSessions.find(s => s.id === review.sessionId);
            const mentoring = mockMentorings.find(m => m.id === review.mentoringId);

            if (!session) {
                throw new Error(`Session not found for review ${review.id}`);
            }
            if (!mentoring) {
                throw new Error(`Mentoring not found for review ${review.id}`);
            }

            return {
                ...review,
                session,
                mentoring
            };
        });
    }, []);
}