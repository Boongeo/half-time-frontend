import { Review, ReviewStats } from "@/types/core/review";

export const mockStats: ReviewStats = {
    averageRating: 4.8,
    totalReviews: 127,
    responseRate: 95,
    topTags: [
        { tag: "친절해요", count: 45 },
        { tag: "실무 경험 공유", count: 38 },
        { tag: "설명이 자세해요", count: 35 },
        { tag: "시간 약속을 잘 지켜요", count: 28 }
    ],
    monthlyStats: [
        { month: "2024-12", rating: 4.8, reviewCount: 24 },
        { month: "2024-11", rating: 4.7, reviewCount: 22 }
    ]
};

export const mockReviews: Review[] = [
    {
        id: 1,
        mentoringId: 1,
        mentee: {
            id: 101,
            name: "김시후",
            profileImage: null
        },
        rating: 5,
        content: "실제 프로젝트를 기반으로 한 실습 위주의 멘토링이 매우 도움이 되었습니다. 특히 타입스크립트의 고급 기능들을 실제로 어떻게 활용하는지 자세히 설명해주셔서 좋았어요. 시간이 좀 더 있었으면 좋겠어요.",
        tags: ["실무 경험 공유", "설명이 자세해요", "친절해요"],
        reply: "소중한 피드백 감사합니다. 다음 기수에는 3시간 과정으로 준비해보도록 하겠습니다. 시후님의 열정적인 참여 덕분에 저도 즐거운 멘토링이었습니다!",
        status: "published",
        createdAt: "2024-12-20T09:00:00Z",
        updatedAt: "2024-12-20T09:00:00Z"
    },
    {
        id: 2,
        mentoringId: 1,
        mentee: {
            id: 102,
            name: "이하준",
            profileImage: null
        },
        rating: 4,
        content: "현직자의 관점에서 실제 기술 면접에서 나올 수 있는 질문들을 예상하고 준비할 수 있어서 매우 유익했습니다. 특히 시스템 디자인 관련 조언이 정말 도움이 되었습니다. 다만 사전에 준비해야 할 내용들에 대한 안내가 미리 있었으면 더 좋았을 것 같아요.",
        tags: ["실무 경험 공유", "면접 준비", "시간 약속을 잘 지켜요"],
        reply: null,
        status: "published",
        createdAt: "2024-12-19T15:30:00Z",
        updatedAt: "2024-12-19T15:30:00Z"
    },
    {
        id: 3,
        mentoringId: 1,
        mentee: {
            id: 103,
            name: "박서연",
            profileImage: null
        },
        rating: 2,
        content: "기본적인 내용만 다루고 실제 적용하기는 어려운 내용들이었습니다. 초보자의 눈높이에 맞춰 설명해주셨으면 합니다.",
        tags: ["아쉬워요"],
        reply: "죄송합니다. 다음에는 수강생분들의 레벨을 미리 파악하고 그에 맞춰 진행하도록 하겠습니다.",
        status: "reported",
        createdAt: "2024-12-18T11:00:00Z",
        updatedAt: "2024-12-18T11:00:00Z"
    },
    {
        id: 5,
        mentoringId: 4,
        mentee: {
            id: 107,
            name: "전병준",
            profileImage: null
        },
        rating: 5,
        content: "1:1로 진행되어서 정말 깊이있게 질문하고 배울 수 있었습니다. 특히 제가 실제로 겪고 있던 기술적인 문제들에 대해 상세히 조언해주셔서 많은 도움이 되었어요. 멘토님의 실무 경험을 바탕으로 한 조언들이 매우 인상적이었습니다.",
        tags: ["맞춤형 피드백", "친절해요", "설명이 자세해요"],
        reply: "뱅준님의 열정적인 참여 덕분에 저도 즐거운 멘토링이었습니다. 앞으로도 궁금한 점이 있으시다면 언제든 연락주세요!",
        status: "published",
        createdAt: "2024-12-17T14:00:00Z",
        updatedAt: "2024-12-17T14:00:00Z"
    },
    {
        id: 6,
        mentoringId: 3,
        mentee: {
            id: 106,
            name: "강지원",
            profileImage: null
        },
        rating: 4,
        content: "수업 재밌었어유~ 이직 할 때 완전 도움 될듯!!",
        tags: ["맞춤형 피드백", "친절해요", "꼼꼼한 피드백"],
        reply: null,
        status: "published",
        createdAt: "2024-12-16T16:00:00Z",
        updatedAt: "2024-12-16T16:00:00Z"
    }
];