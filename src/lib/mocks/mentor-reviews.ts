import {Review, ReviewStats} from "@/types/core/review";

export const mockStats: ReviewStats = {
    averageRating: 4.8,
    totalReviews: 127,
    responseRate: 95,
    unrespondedReviews: 3,
    monthlyReviews: 24,
    reviewGrowth: 12,
    recommendRate: 98
};

export const mockReviews: Review[] = [
    {
        id: 1,
        sessionId: 1,
        mentoringId: 1,
        createdAt: "2024-12-20T09:00:00Z",
        mentee: {
            id: 101,
            name: "김시후",
            profileImage: "/api/placeholder/32/32"
        },
        rating: 5,
        positives: "실제 프로젝트를 기반으로 한 실습 위주의 멘토링이 매우 도움이 되었습니다. 특히 타입스크립트의 고급 기능들을 실제로 어떻게 활용하는지 자세히 설명해주셔서 좋았어요.",
        improvements: "시간이 좀 더 있었으면 좋겠어요. 2시간이 너무 짧게 느껴졌습니다.",
        reply: "소중한 피드백 감사합니다. 다음 기수에는 3시간 과정으로 준비해보도록 하겠습니다. 시후님의 열정적인 참여 덕분에 저도 즐거운 멘토링이었습니다!",
        isReported: false
    },
    {
        id: 2,
        sessionId: 1,
        mentoringId: 1,
        createdAt: "2024-12-19T15:30:00Z",
        mentee: {
            id: 102,
            name: "박지민",
            profileImage: null
        },
        rating: 5,
        positives: "현직자의 관점에서 실제 기술 면접에서 나올 수 있는 질문들을 예상하고 준비할 수 있어서 매우 유익했습니다. 특히 시스템 디자인 관련 조언이 많은 도움이 되었어요.",
        improvements: "전반적으로 만족스러웠습니다. 굳이 꼽자면 사전에 준비해야 할 것들에 대한 가이드가 미리 있었으면 좋았을 것 같아요.",
        reply: null,
        isReported: false
    },
    {
        id: 3,
        sessionId: 2,
        mentoringId: 2,
        createdAt: "2024-12-18T11:00:00Z",
        mentee: {
            id: 103,
            name: "이하준",
            profileImage: "/api/placeholder/32/32"
        },
        rating: 4,
        positives: "실제 서비스에서 발생할 수 있는 다양한 케이스들을 기반으로 설명해주셔서 매우 실용적이었습니다. 특히 캐싱 전략과 DB 샤딩 관련 내용이 인상적이었어요.",
        improvements: "실습 환경이 좀 더 체계적으로 준비되어 있었으면 좋겠습니다. 간혹 환경 설정에 시간을 많이 쏟는 경우가 있었어요.",
        reply: "피드백 감사합니다. 다음 멘토링에서는 Docker 기반의 실습 환경을 미리 준비해서 보다 원활한 진행이 되도록 하겠습니다.",
        isReported: false
    },
    {
        id: 4,
        sessionId: 2,
        mentoringId: 2,
        createdAt: "2024-12-15T13:00:00Z",
        mentee: {
            id: 106,
            name: "anonymous",
            profileImage: null
        },
        rating: 2,
        positives: "기본적인 최적화 기법들에 대해 배울 수 있었습니다.",
        improvements: "설명이 너무 어려웠고 실제 적용하기 힘든 내용들이 많았습니다. 초보자의 눈높이에 맞춰주셨으면 합니다.",
        reply: null,
        isReported: true
    },
    {
        id: 5,
        sessionId: 3,
        mentoringId: 2,
        createdAt: "2024-12-14T10:00:00Z",
        mentee: {
            id: 107,
            name: "김도윤",
            profileImage: "/api/placeholder/32/32"
        },
        rating: 5,
        positives: "CI/CD 파이프라인 구축부터 컨테이너 오케스트레이션까지 실무에서 바로 적용할 수 있는 내용들이라 좋았습니다. 특히 비용 최적화 팁들이 유용했어요.",
        improvements: "전반적으로 만족스러웠지만, AWS 프리티어로 실습이 어려운 부분들이 있어 아쉬웠습니다.",
        reply: "말씀해주신 것처럼 비용 문제가 있네요. 다음에는 LocalStack을 활용한 실습 환경을 구성해보도록 하겠습니다. 적극적으로 참여해주셔서 감사합니다!",
        isReported: false
    }
];