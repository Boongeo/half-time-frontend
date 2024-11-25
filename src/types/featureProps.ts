import {LucideIcon} from "lucide-react";
import {PasswordValidation} from "@/types/auth";
import {Mentor} from "@/lib/mocks/mentors";
import {FilterKey, FilterOption, FilterValues} from "@/types/category";

/** Auth Props */
export interface SocialLoginButtonProps {
    provider: string;
    icon: LucideIcon | string;
    children: React.ReactNode;
}

export interface PasswordRequirementsProps {
    validation: PasswordValidation;
}

export interface PasswordMatchProps {
    isMatching: boolean;
    show: boolean;
}

/** Explore Props */
export interface MentorCardProps {
    mentor: Mentor;
}

export interface SearchSectionProps {
    value: string;
    onChange: (value: string) => void;
}

export interface FilterSectionProps {
    filters: FilterValues;
    onFilterChange: (field: FilterKey, value: string[]) => void;
}

export interface CheckboxGroupProps {
    label: string;
    options: FilterOption[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    maxHeight?: string;
    gridLayout?: boolean;
}
