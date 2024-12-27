import { Session, Mentoring, MenteeApplication } from "@/types/core/mentoring";

export const mockSessions: Session[] = [
    {
        id: 1,
        title: "React와 TypeScript로 배우는 실전 웹 개발",
        description: "React와 TypeScript를 활용한 웹 개발의 기초부터 실전까지 다룹니다. 실무에서 자주 사용되는 패턴과 구조를 익히고 실제 프로젝트에 적용하는 방법을 배웁니다.",
        method: "online",
        link: "https://zoom.us/j/123456789",
        type: "group",
        maxParticipants: 3,
        duration: 120,
        availableDays: [
            {
                day: "월",
                times: ["10:00", "14:00", "20:00"]
            },
            {
                day: "수",
                times: ["14:00", "20:00"]
            }
        ],
        price: 50000,
        createdAt: "2024-12-20T00:00:00Z",
        updatedAt: "2024-12-20T00:00:00Z"
    },
    {
        id: 2,
        title: "백엔드 개발자 이직 준비 A to Z",
        description: "백엔드 개발자 이직을 위한 전략적 접근법을 다룹니다. 기술 면접 준비부터 시스템 디자인, 이력서 작성까지 모든 과정을 다룹니다.",
        method: "offline",
        location: "서울 강남구 테헤란로 123",
        type: "individual",
        duration: 90,
        availableDays: [
            {
                day: "화",
                times: ["19:00", "20:30"]
            },
            {
                day: "목",
                times: ["19:00", "20:30"]
            }
        ],
        price: 100000,
        createdAt: "2024-12-21T00:00:00Z",
        updatedAt: "2024-12-21T00:00:00Z"
    }
];

export const mockMentorings: Mentoring[] = [
    {
        id: 1,
        sessionId: 1,
        date: "2024-12-25",
        time: "14:00",
        participants: [
            {
                menteeId: 101,
                status: "confirmed"
            },
            {
                menteeId: 102,
                status: "confirmed"
            },
            {
                menteeId: 103,
                status: "pending"
            }
        ],
        status: "open",
        currentParticipantCount: 2,
        maxParticipantCount: 3
    },
    {
        id: 2,
        sessionId: 1,
        date: "2024-12-25",
        time: "20:00",
        participants: [
            {
                menteeId: 104,
                status: "confirmed"
            },
            {
                menteeId: 105,
                status: "pending"
            }
        ],
        status: "open",
        currentParticipantCount: 1,
        maxParticipantCount: 3
    },
    {
        id: 3,
        sessionId: 2,
        date: "2024-12-26",
        time: "19:00",
        participants: [
            {
                menteeId: 106,
                status: "confirmed"
            }
        ],
        status: "full",
        currentParticipantCount: 1,
        maxParticipantCount: 1
    },
    {
        id: 4,
        sessionId: 2,
        date: "2024-12-31",
        time: "20:30",
        participants: [
            {
                menteeId: 107,
                status: "pending"
            }
        ],
        status: "full",
        currentParticipantCount: 1,
        maxParticipantCount: 1
    }
];

export const mockMenteeApplications: MenteeApplication[] = [
    {
        id: 1,
        mentoringId: 1,
        mentee: {
            id: 101,
            name: "김시후",
            profileImage: null,
            interest: "프론트엔드 개발"
        },
        message: "React와 TypeScript 실무 활용법을 배우고 싶습니다.",
        status: "approved",
        appliedAt: "2024-12-20T10:00:00Z",
        paymentStatus: "paid"
    },
    {
        id: 2,
        mentoringId: 1,
        mentee: {
            id: 102,
            name: "이하준",
            profileImage: null,
            interest: "웹 개발"
        },
        message: "실무에서 자주 사용되는 React 패턴을 학습하고 싶습니다.",
        status: "approved",
        appliedAt: "2024-12-20T11:00:00Z",
        paymentStatus: "paid"
    },
    {
        id: 3,
        mentoringId: 1,
        mentee: {
            id: 103,
            name: "박서연",
            profileImage: null,
            interest: "프론트엔드 개발"
        },
        message: "TypeScript 고급 기능 활용법을 배우고 싶습니다.",
        status: "approved",
        appliedAt: "2024-12-20T12:00:00Z",
        paymentStatus: "pending"
    },
    {
        id: 4,
        mentoringId: 2,
        mentee: {
            id: 104,
            name: "최준우",
            profileImage: null,
            interest: "React"
        },
        message: "저녁 시간대 수업을 듣고 싶습니다.",
        status: "pending",
        appliedAt: "2024-12-20T14:00:00Z",
        paymentStatus: "paid"
    },
    {
        id: 5,
        mentoringId: 2,
        mentee: {
            id: 105,
            name: "정도현",
            profileImage: null,
            interest: "웹 개발"
        },
        message: "TypeScript 기초부터 배우고 싶습니다.",
        status: "pending",
        appliedAt: "2024-12-20T15:00:00Z",
        paymentStatus: "pending"
    },
    {
        id: 6,
        mentoringId: 3,
        mentee: {
            id: 106,
            name: "강지원",
            profileImage: null,
            interest: "백엔드 개발"
        },
        message: "이직을 위한 기술 면접 준비를 하고 있습니다.",
        status: "approved",
        appliedAt: "2024-12-21T10:00:00Z",
        paymentStatus: "paid"
    },
    {
        id: 7,
        mentoringId: 4,
        mentee: {
            id: 107,
            name: "전병준",
            profileImage: null,
            interest: "백엔드 개발"
        },
        message: "아 멘토링 로직 개빡세다;;",
        status: "pending",
        appliedAt: "2024-12-21T10:00:00Z",
        paymentStatus: "pending"
    }
];