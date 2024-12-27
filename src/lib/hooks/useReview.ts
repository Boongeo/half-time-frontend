import {useMemo} from "react";
import {mockReviews} from "../mocks/mentor-reviews";
import {mockSessions, mockMentorings} from "@/lib/mocks/sessions";

export function useReview() {
    return useMemo(() => {
        return mockReviews.map(review => {
            const mentoring = mockMentorings.find(m => m.id === review.mentoringId);
            if (!mentoring) {
                throw new Error(`Mentoring not found for review ${review.id}`);
            }

            const session = mockSessions.find(s => s.id === mentoring.sessionId);
            if (!session) {
                throw new Error(`Session not found for mentoring ${mentoring.id}`);
            }

            return {
                ...review,
                mentoring: {
                    date: mentoring.date,
                    time: mentoring.time,
                    type: session.type,
                    method: session.method,
                    title: session.title
                }
            };
        });
    }, []);
}