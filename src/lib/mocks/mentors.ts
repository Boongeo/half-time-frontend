import {Mentor} from "@/types/mentor";

export const mockMentors: Mentor[] = [
    {
        id: "1",
        name: "박유주",
        role: "Frontend Developer",
        email: "test@example.com",
        company: "Google",
        profileImage: "/images/Mock.jpg",
        techStack: ["react", "typescript", "nextjs"],
        experience: 5,
        rating: 4.9,
        reviewCount: 36,
        hourlyRate: 50000,
        intro: "10년차 프론트엔드 개발자입니다. 주로 React와 TypeScript를 사용하여 대규모 웹 애플리케이션을 개발하고 있습니다."
    },
    {
        id: "2",
        name: "이혜린",
        role: "Senior Frontend Developer",
        email: "test@example.com",
        company: "Naver",
        profileImage: "/images/Mock.jpg",
        techStack: ["react", "typescript", "nextjs", "nodejs"],
        experience: 17,
        rating: 4.8,
        reviewCount: 28,
        hourlyRate: 60000,
        intro: "안녕 친구들아? 나 내일 저녁은 감자탕 먹을거임. 할 말이 많아서 소개글이 길어지면 어떻게 되나 볼까여"
    },
    {
        id: "3",
        name: "전병준",
        role: "Backend Developer",
        email: "test@example.com",
        company: "Kakao",
        profileImage: "/images/Mock.jpg",
        techStack: ["react", "nodejs", "mongodb"],
        experience: 3,
        rating: 4.7,
        reviewCount: 15,
        hourlyRate: 45000,
        intro: "풀스택 개발 경험을 바탕으로 실무에서 필요한 기술들을 알려드립니다."
    },
    {
        id: "4",
        name: "빌게이츠",
        role: "Senior Backend Developer",
        company: "Microsoft",
        profileImage: "/images/Mock.jpg",
        techStack: ["nodejs", "mongodb", "mysql"],
        experience: 32,
        rating: 5.0,
        reviewCount: 115,
        hourlyRate: 85000,
        intro: "나 ㄹㅇ 빌게이츠임"
    }
]
