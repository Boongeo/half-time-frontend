import { Session, MenteeApplication } from "@/types/core/mentoring";

export const mockSessions: Session[] = [
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
        maxParticipants: 4,
        method: 'online',
        link: 'https://us04web.zoom.us/j/12345678901'
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
        maxParticipants: 6,
        method: 'offline',
        location: '서울시 강남구 테헤란로 123 왕굼 스터디카페 2층'
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
        maxParticipants: 1,
        method: 'online',
        link: 'https://us04web.zoom.us/j/98765432109'
    }
];

export const mockMenteeApplications: MenteeApplication[] = [
    // 그룹 세션 1 (12/25 14:00)
    {
        id: 1,
        sessionId: 1,
        mentee: {
            id: 1,
            name: "김멘티",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        status: "pending",
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
        status: "pending",
        preferredDate: "2024-12-25",
        preferredTime: "14:00",
        message: "프론트엔드 개발자로 전향하고 싶어서 상담받고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    },
    // 그룹 세션 2 (12/27 16:00)
    {
        id: 3,
        sessionId: 1,
        mentee: {
            id: 3,
            name: "박멘티",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        status: "pending",
        preferredDate: "2024-12-30",
        preferredTime: "16:00",
        message: "실무에서 자주 사용되는 React 패턴들을 배우고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    },
    {
        id: 4,
        sessionId: 1,
        mentee: {
            id: 4,
            name: "최멘티",
            profileImage: "",
            interest: "풀스택 개발자",
        },
        status: "pending",
        preferredDate: "2024-12-30",
        preferredTime: "16:00",
        message: "타입스크립트 고급 기능 활용법을 배우고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    },
    {
        id: 5,
        sessionId: 1,
        mentee: {
            id: 5,
            name: "정멘티",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        status: "pending",
        preferredDate: "2024-12-30",
        preferredTime: "16:00",
        message: "실제 프로젝트에서의 상태관리 전략에 대해 논의하고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'pending'
    },
    {
        id: 8,
        sessionId: 1,
        mentee: {
            id: 9,
            name: "이혜린",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        status: "pending",
        preferredDate: "2024-12-30",
        preferredTime: "16:00",
        message: "실제 프로젝트에서의 상태관리 전략에 대해 논의하고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'pending'
    },

    {
        id: 11,
        sessionId: 2,
        mentee: {
            id: 13,
            name: "박유주",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        status: "pending",
        preferredDate: "2024-12-26",
        preferredTime: "14:00",
        message: "아 백엔드 어려워요~",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    },

    // 1:1 세션 신청들
    {
        id: 6,
        sessionId: 3,
        mentee: {
            id: 6,
            name: "한멘티",
            profileImage: "",
            interest: "백엔드 개발자",
        },
        status: "pending",
        preferredDate: "2024-12-27",
        preferredTime: "19:00",
        message: "Node.js 성능 최적화와 모니터링 방법에 대해 배우고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    },
    {
        id: 7,
        sessionId: 3,
        mentee: {
            id: 7,
            name: "송멘티",
            profileImage: "",
            interest: "백엔드 개발자",
        },
        status: "pending",
        preferredDate: "2025-01-01",
        preferredTime: "19:00",
        message: "대용량 트래픽 처리를 위한 서버 아키텍처 설계 방법을 상담받고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'pending'
    },
    {
        id: 9,
        sessionId: 3,
        mentee: {
            id: 8,
            name: "전병준",
            profileImage: "",
            interest: "백엔드 개발자",
        },
        status: "pending",
        preferredDate: "2025-01-01",
        preferredTime: "20:00",
        message: "와우 너무 기대돼용~",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid'
    }
];