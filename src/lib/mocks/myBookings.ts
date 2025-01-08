import { myBookingApplication } from "@/types/core/mentoring";

export const myMenteeApplications: myBookingApplication[] = [
    {
        id: 1,
        sessionId: 1,
        mentee: {
            id: 10, // 본인의 멘티 ID
            name: "나멘티",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        mentoInfo: {
            id: 1,
            name: "이메토"
        },
        sessionTitle: "React와 함께하는 프론트엔드 개발",
        sessionDescription: "React와 상태 관리를 중심으로 학습합니다.",
        status: "approved", // 승인된 상태
        preferredDate: "2024-12-25",
        preferredTime: "14:00",
        message: "React와 TypeScript 학습 방법에 대해 조언을 구하고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid' // 결제 완료
    },
    {
        id: 2,
        sessionId: 2,
        mentee: {
            id: 10,
            name: "나멘티",
            profileImage: "",
            interest: "백엔드 개발자",
        },
        mentoInfo: {
            id: 1,
            name: "이메토"
        },
        sessionTitle: "Spring Boot로 배우는 백엔드 개발",
        sessionDescription: "Spring Boot를 활용한 백엔드 개발의 A to Z를 배워봅시다.",
        status: "pending", // 대기 상태
        preferredDate: "2024-12-26",
        preferredTime: "13:00",
        message: "Spring Boot의 JPA 사용 방법을 배우고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'paid' // 결제 완료
    },
    {
        id: 3,
        sessionId: 3,
        mentee: {
            id: 10,
            name: "나멘티",
            profileImage: "",
            interest: "풀스택 개발자",
        },
        mentoInfo: {
            id: 1,
            name: "이메토"
        },
        sessionTitle: "Node.js로 RESTful API 설계하기",
        sessionDescription: "Node.js 기반으로 API 설계 방법과 실무 적용을 학습합니다.",
        status: "rejected", // 거절된 상태
        preferredDate: "2025-01-01",
        preferredTime: "19:00",
        message: "Node.js에서 RESTful API 설계 방법을 배우고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'refunded' // 결제 취소/환불
    },
    {
        id: 4,
        sessionId: 1,
        mentee: {
            id: 10,
            name: "나멘티",
            profileImage: "",
            interest: "프론트엔드 개발자",
        },
        mentoInfo: {
            id: 1,
            name: "이메토"
        },
        sessionTitle: "React와 함께하는 프론트엔드 개발",
        sessionDescription: "React와 상태 관리를 중심으로 학습합니다.",
        status: "pending", // 대기 상태
        preferredDate: "2024-12-30",
        preferredTime: "16:00",
        message: "React의 상태 관리 도구에 대한 멘토링을 받고 싶습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'pending' // 결제 대기
    },
    {
        id: 5,
        sessionId: 2,
        mentee: {
            id: 10,
            name: "나멘티",
            profileImage: "",
            interest: "백엔드 개발자",
        },
        mentoInfo: {
            id: 1,
            name: "이메토"
        },
        sessionTitle: "Spring Boot로 배우는 백엔드 개발",
        sessionDescription: "Spring Boot를 활용한 백엔드 개발의 A to Z를 배워봅시다.",
        status: "canceled", // 사용자가 취소한 상태
        preferredDate: "2024-12-27",
        preferredTime: "15:00",
        message: "Spring Boot에서의 보안 설정 방법을 배우고 싶었습니다.",
        appliedAt: new Date().toISOString(),
        paymentStatus: 'refunded' // 결제 취소/환불
    }
];
