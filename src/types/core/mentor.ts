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

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface MentorRegistration {
    id: number;
    userId: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    status: RegistrationStatus;
    company: string;
    experience: number;
    techStack: string[];
    interest: string;
    intro: string;
    hourlyRate: number;
    mentoringType: 'online' | 'offline' | 'both';
    preferredRegion?: string;
    careerProofUrl: string;
    portfolioUrl?: string;
    githubUrl?: string;
    rejectReason?: string;
    createdAt: string;
    updatedAt: string;
}

export interface MentorRegistrationForm {
    company: string;
    experience: number;
    techStack: string[];
    interest: string;
    intro: string;
    hourlyRate: number;
    mentoringType: 'online' | 'offline' | 'both';
    preferredRegion?: string;
    careerProof: File | null;
    portfolioUrl?: string;
    githubUrl?: string;
}

export interface MentorRegistrationStore {
    form: Partial<MentorRegistrationForm>;
    currentStep: number;
    isLoading: boolean;
    selectedCategory: string;
    registrationStatus: RegistrationStatus | null;

    // Actions
    setField: <K extends keyof MentorRegistrationForm>(
        field: K,
        value: MentorRegistrationForm[K]
    ) => void;
    setCurrentStep: (step: number) => void;
    setLoading: (isLoading: boolean) => void;
    setSelectedCategory: (category: string) => void;
    setRegistrationStatus: (status: RegistrationStatus | null) => void;
    resetForm: () => void;
    validateCurrentStep: () => { isValid: boolean; message: string };
    submitRegistration: () => Promise<void>;
}