export type FilterKey = 'techStack' | 'experience' | 'rating';

export type FilterOption = {
    value: string;
    label: string;
};

export interface FilterValues {
    techStack: string[];
    experience: string[];
    rating: string[];
}

export type TechOption = {
    value: string;
    label: string;
};

export type TechCategories = {
    [key: string]: TechOption[];
};