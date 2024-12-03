import {FilterOption, TechCategories, ReviewCategories} from "@/types/shared/category";

export const TECH_CATEGORIES: TechCategories = {
    "FrontEnd": [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "nextjs", label: "Next.js" },
        { value: "typescript", label: "TypeScript" },
        { value: "javascript", label: "JavaScript" },
        { value: "zustand", label: "Zustand" },
        { value: "threejs", label: "Three.js" },
    ],
    "BackEnd": [
        { value: "nodejs", label: "Node.js" },
        { value: "spring", label: "Spring" },
        { value: "django", label: "Django" },
        { value: "nestjs", label: "NestJS" },
    ],
    "Mobile": [
        { value: "flutter", label: "Flutter" },
        { value: "reactnative", label: "React Native" },
        { value: "ios", label: "iOS" },
        { value: "android", label: "Android" },
    ],
    "DevOps": [
        { value: "aws", label: "AWS" },
        { value: "docker", label: "Docker" },
        { value: "kubernetes", label: "Kubernetes" },
        { value: "jenkins", label: "Jenkins" },
    ],
    "Database": [
        { value: "mysql", label: "MySQL" },
        { value: "postgresql", label: "PostgreSQL" },
        { value: "mongodb", label: "MongoDB" },
        { value: "redis", label: "Redis" },
    ]
} as const;

export const experienceOptions: FilterOption[] = [
    { value: '0-3', label: '0-3년' },
    { value: '4-7', label: '4-7년' },
    { value: '8-14', label: '8-14년' },
    { value: '15-50', label: '15년 이상' },
];

export const ratingOptions: FilterOption[] = [
    { value: '4+', label: '4.0 이상' },
    { value: '3+', label: '3.0 이상' },
    { value: 'all', label: '전체' },
];

export const category: ReviewCategories[] = [
    { value: "technically-competent", label: "Technically competent" },
    { value: "very-motivational", label: "Very motivational" },
    { value: "amazing-communicator", label: "Amazing communicator" },
    { value: "amazing-problem-solver", label: "Amazing problem solver" },
    { value: "empathetic-listener", label: "Empathetic listener" },
    { value: "encouraging-mentor", label: "Encouraging mentor" },
];
