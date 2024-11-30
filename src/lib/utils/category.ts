import {FilterKey, FilterOption, TechCategories, TechOption} from "@/types/shared/category";
import {experienceOptions, ratingOptions, TECH_CATEGORIES} from "@/config/category";
import {MentorInterest, MentorLevel} from "@/types/core/mentor";

export const getAllTechOptions = (categories: TechCategories): TechOption[] => {
    return Object.values(categories).flat();
};

export const getCategoryOptions = () => Object.keys(TECH_CATEGORIES).map(category => ({
    value: category.toLowerCase(),
    label: category
}));

export const optionsMap: Record<FilterKey, FilterOption[]> = {
    techStack: getAllTechOptions(TECH_CATEGORIES),
    experience: experienceOptions,
    rating: ratingOptions,
};

export const getTechDisplayName = (value: string): string => {
    const tech = Object.values(TECH_CATEGORIES)
        .flat()
        .find(tech => tech.value === value);

    return tech?.label || value;
};

export const calculateDeveloperLevel = (experience: number): MentorLevel => {
    if (experience >= 8) return 'Lead';
    if (experience >= 5) return 'Senior';
    if (experience >= 3) return 'Mid';
    return 'Junior';
};

export const formatDeveloperTitle = (experience: number, interest: MentorInterest): string => {
    const level = calculateDeveloperLevel(experience);
    return `${level} ${interest} Developer`;
};