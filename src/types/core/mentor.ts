import {TECH_CATEGORIES} from "@/config/category";
import {FilterKey, FilterValues} from "@/types/shared/category";

export interface Mentor {
    id: number;
    name: string;
    email: string;
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

export type MentorLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead';
export type MentorInterest = keyof typeof TECH_CATEGORIES;

export interface MentorExploreState {
    searchTerm: string;
    filters: FilterValues;
    priceRange: [number, number];
    setSearchTerm: (term: string) => void;
    setFilter: (key: FilterKey, values: string[]) => void;
    setPriceRange: (range: [number, number]) => void;
    clearFilters: () => void;
}