import { ExtendedSession, MenteeApplication } from "@/types/core/mentoring";

export const mockSessions: ExtendedSession[] = [
    {
        id: 1,
        title: "React와 TypeScript로 실전 웹 개발 배우기",
        description: "React와 TypeScript를 활용한 웹 개발의 기초부터 실전까지 배워봅시다. 실무에서 자주 사용되는 패턴과 구조에 대해 알아봅니다.",
        availableTime: [
            {
                day: "월",
                times: ["10:00", "14:00", "16:00"],
                duration: 90
            },
            {
                day: "수",
                times: ["14:00", "16:00"],
                duration: 90
            }
        ],
        price: 50000,
        type: 'group',
        maxParticipants: 4
    },
    {
        id: 2,
        title: "Spring Boot로 배우는 백엔드 개발",
        description: "Spring Boot를 활용한 백엔드 개발의 A to Z를 배워봅시다. JPA, Security 등 실무에 필요한 내용을 다룹니다.",
        availableTime: [
            {
                day: "화",
                times: ["13:00", "15:00"],
                duration: 120
            },
            {
                day: "목",
                times: ["13:00", "15:00", "17:00"],
                duration: 120
            }
        ],
        price: 60000,
        type: 'group',
        maxParticipants: 4
    },
    {
        id: 3,
        title: "Node.js 백엔드 심화 멘토링",
        description: "Node.js와 Express를 활용한 서버 개발, 데이터베이스 설계, 성능 최적화 등을 다룹니다.",
        availableTime: [
            {
                day: "수",
                times: ["19:00", "20:00"],
                duration: 60
            },
            {
                day: "금",
                times: ["19:00", "20:00"],
                duration: 60
            }
        ],
        price: 55000,
        type: 'individual',
        maxParticipants: 1
    }
];

export const mockMenteeApplications: MenteeApplication[] = [
    {
        id: 1,
        sessionId: 1,
        mentee: {
            id: 1,
            name: "김멘티",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        status: "approved",
        preferredDate: "2024-12-25",
        preferredTime: "14:00",
        message: "React와 TypeScript 학습 방법에 대해 조언을 구하고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    },
    {
        id: 2,
        sessionId: 1,
        mentee: {
            id: 2,
            name: "이멘티",
            profileImage: "",
            interest: "백엔드 개발자",
        },
        status: "approved",
        preferredDate: "2024-12-25",
        preferredTime: "14:00",
        message: "Spring Boot 기반 서버 아키텍처 설계에 대해 논의하고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    },
    {
        id: 3,
        sessionId: 1,
        mentee: {
            id: 3,
            name: "박멘티",
            profileImage: "",
            interest: "iOS 개발자",
        },
        status: "pending",
        preferredDate: "2024-12-25",
        preferredTime: "14:00",
        message: "Swift 및 iOS 아키텍처 패턴에 대해 배우고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'pending'
    }
];