import { useMentorExploreStore } from "@/store/explore";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mentor } from "@/types/core/mentor";
import { mentorApi } from "@/lib/api/mentor";
import { debounce, DebouncedFunc } from 'lodash';
import {UseMentorSearchProps} from "@/types/components/featureProps";

export function useMentorSearch({ initialMentors = [] }: UseMentorSearchProps) {
    const {
        searchTerm,
        filters,
        priceRange,
        setSearchTerm,
        setFilter,
        setPriceRange,
        clearFilters
    } = useMentorExploreStore();

    const [mentors, setMentors] = useState<Mentor[]>(initialMentors);
    const [totalMentors, setTotalMentors] = useState(initialMentors.length);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 20;

    const fetchMentors = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await mentorApi.searchMentors({
                search: searchTerm,
                techStack: filters.techStack,
                experience: filters.experience,
                rating: filters.rating,
                priceMin: priceRange[0],
                priceMax: priceRange[1],
                page,
                limit
            });

            if (response.success) {
                if (page === 1) {
                    setMentors(response.data.mentors);
                } else {
                    setMentors(prev => [...prev, ...response.data.mentors]);
                }
                setTotalMentors(response.data.total);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : '멘토 검색에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, filters, priceRange, page]);

    const debouncedFetch = useRef<DebouncedFunc<typeof fetchMentors>>(
        debounce(fetchMentors, 300)
    ).current;

    useEffect(() => {
        setPage(1);
        debouncedFetch();

        // 클린업 함수
        return () => {
            debouncedFetch.cancel();
        };
    }, [searchTerm, filters, priceRange]);

    useEffect(() => {
        if (page > 1) {
            fetchMentors();
        }
    }, [page, fetchMentors]);

    const loadMore = useCallback(() => {
        if (!isLoading && mentors.length < totalMentors) {
            setPage(prev => prev + 1);
        }
    }, [isLoading, mentors.length, totalMentors])

    return {
        mentors,
        totalMentors,
        isLoading,
        error,
        searchTerm,
        filters,
        priceRange,
        setSearchTerm,
        setFilter,
        setPriceRange,
        clearFilters,
        loadMore,
        hasMore: mentors.length < totalMentors
    };
}