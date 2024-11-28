import {FilterKey, FilterOption, TechCategories, TechOption} from "@/types/category";
import {experienceOptions, ratingOptions, TECH_CATEGORIES} from "@/config/category";

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