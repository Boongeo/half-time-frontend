import { Mentoring } from '@/types/core/mentoring';

export const mockMentorings: Mentoring[] = [
    {
        id: 1,
        sessionId: 1,
        date: "2024-12-18T09:00:00Z",
        time: "09:00",
        participants: [
            {
                menteeId: 101,
                status: 'confirmed'
            }
        ],
        status: 'completed',
        currentParticipantCount: 1
    },
    {
        id: 2,
        sessionId: 2,
        date: "2024-12-19T15:30:00Z",
        time: "15:30",
        participants: [
            {
                menteeId: 102,
                status: 'confirmed'
            }
        ],
        status: 'completed',
        currentParticipantCount: 1
    }
];
