import {FilterKey, FilterOption} from "@/types/commonProps";

export const techStackOptions: FilterOption[] = [
    { value: 'react', label: 'React' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'nestjs', label: 'NestJS' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'spring', label: 'Spring' },
    { value: 'unity', label: 'Unity' },
];

export const experienceOptions: FilterOption[] = [
    { value: '0-3', label: '0-3년' },
    { value: '3-5', label: '3-5년' },
    { value: '5-10', label: '5-10년' },
    { value: '10+', label: '10년 이상' },
];

export const ratingOptions: FilterOption[] = [
    { value: '4+', label: '4.0 이상' },
    { value: '3+', label: '3.0 이상' },
    { value: 'all', label: '전체' },
];

export const optionsMap: Record<FilterKey, FilterOption[]> = {
    techStack: techStackOptions,
    experience: experienceOptions,
    rating: ratingOptions,
};