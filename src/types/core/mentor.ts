import {TECH_CATEGORIES} from "@/config/category";
import {FilterKey, FilterValues} from "@/types/shared/category";
import {ApiResponse, SearchResponse} from "@/types/api";

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

export interface InitialMentorData {
    initialData: ApiResponse<SearchResponse>;
}

export interface MentorRegistrationForm {
    // 계정 정보
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;

    // 전문 정보
    company: string;
    experience: number;
    techStack: string[];
    interest: string;
    intro: string;

    // 멘토링 정보
    hourlyRate: number;
    mentoringType: 'online' | 'offline' | 'both';
    preferredRegion?: string;

    // 인증 정보
    careerProof: File | null;
    portfolioUrl?: string;
    githubUrl?: string;

    // 멘토링 가능 시간
    availableTime: {
        day: string;
        times: string[];
    }[];
}

export interface MentorRegistrationStore {
    form: Partial<MentorRegistrationForm>;
    currentStep: number;
    isLoading: boolean;
    selectedCategory: string;

    // Actions
    setField: <K extends keyof MentorRegistrationForm>(
        field: K,
        value: MentorRegistrationForm[K]
    ) => void;
    setCurrentStep: (step: number) => void;
    setLoading: (isLoading: boolean) => void;
    setSelectedCategory: (category: string) => void;
    resetForm: () => void;
    validateCurrentStep: () => { isValid: boolean; message: string };
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';