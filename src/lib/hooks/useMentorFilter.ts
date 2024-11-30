import {UseMentorFilterProps} from "@/types/featureProps";
import {useMemo} from "react";
import {useMentorExploreStore} from "@/store/mentor-explore";

export function useMentorFilter({ mentors }: UseMentorFilterProps) {
    const {
        searchTerm,
        filters,
        priceRange,
        setSearchTerm,
        setFilter: handleFilterChange,
        setPriceRange,
        clearFilters: handleClearFilters
    } = useMentorExploreStore();

    const filteredMentors = useMemo(() => {
        return mentors.filter(mentor => {
            if (searchTerm) {
                const searchRegex = new RegExp(searchTerm, 'i');
                const searchTargets = [
                    mentor.name,
                    mentor.company,
                    mentor.interest,
                    ...mentor.techStack
                ];
                if (!searchTargets.some(target => searchRegex.test(target))) {
                    return false;
                }
            }

            if (filters.techStack.length > 0) {
                if (!mentor.techStack.some(tech => filters.techStack.includes(tech))) {
                    return false;
                }
            }

            if (filters.experience.length > 0) {
                const matchesExperience = filters.experience.some(exp => {
                    const [min, max] = exp.split('-').map(Number);
                    return mentor.experience >= min &&
                        (max ? mentor.experience <= max : true);
                })
                if (!matchesExperience) {
                    return false;
                }
            }

            if (filters.rating.length > 0) {
                const matchesRating = filters.rating.some(rating => {
                    const minRating = parseFloat(rating);
                    return mentor.rating >= minRating;
                });
                if (!matchesRating) {
                    return false;
                }
            }

            if (mentor.hourlyRate < priceRange[0] || mentor.hourlyRate > priceRange[1]) {
                return false;
            }

            return true;
        });
    }, [mentors, searchTerm, filters, priceRange]);

    return {
        filteredMentors,
        searchTerm,
        filters,
        priceRange,
        setSearchTerm,
        handleFilterChange,
        setPriceRange,
        handleClearFilters
    };
}