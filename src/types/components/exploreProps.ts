import {Mentor} from "@/types/core/mentor";
import {FilterKey, FilterOption, FilterValues} from "@/types/shared/category";

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

export interface ExtendedFilterSectionProps extends FilterSectionProps {
    priceRange: [number, number];
    onPriceRangeChange: (range: [number, number]) => void;
    onClearAll: () => void;
}