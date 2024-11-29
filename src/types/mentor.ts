import {TECH_CATEGORIES} from "@/config/category";

export interface Mentor {
    id: string;
    name: string;
    profileImage: string;
    interest: string;
    company: string;
    experience: number;
    techStack: string[];
    hourlyRate: number;
    rating: number;
    reviewCount: number;
    intro: string;
}

export type DeveloperLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead';
export type DeveloperInterest = keyof typeof TECH_CATEGORIES;