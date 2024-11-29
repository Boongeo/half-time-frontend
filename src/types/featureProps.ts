import {LucideIcon} from "lucide-react";
import {PasswordValidation} from "@/types/auth";
import {FilterKey, FilterOption, FilterValues} from "@/types/category";
import {Mentor} from "@/types/mentor";

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
    onClick?: (value: number) => void;
}

export interface SearchSectionProps {
    value: string;
    onChange: (value: string) => void;
}

interface FilterSectionProps {
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

export interface UseMentorFilterProps {
    mentors: Mentor[];
    initialFilters?: FilterValues;
}

export interface MentorFilterState {
    searchTerm: string;
    filters: FilterValues;
    priceRange: [number, number];
    setSearchTerm: (term: string) => void;
    setFilter: (key: FilterKey, values: string[]) => void;
    setPriceRange: (range: [number, number]) => void;
    clearFilters: () => void;
}

export interface ExtendedFilterSectionProps extends FilterSectionProps {
    priceRange: [number, number];
    onPriceRangeChange: (range: [number, number]) => void;
    onClearAll: () => void;
}