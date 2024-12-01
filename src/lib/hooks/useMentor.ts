import {useMentorExploreStore} from "@/store/explore";
import {useCallback, useEffect, useMemo, useState} from "react";
import {InitialMentorData, Mentor} from "@/types/core/mentor";
import {debounce} from "lodash";
import {MentorService} from "@/lib/services/mentorService";

const mentorService = new MentorService();

export function useMentor({ initialData }: InitialMentorData) {
    const {
        searchTerm,
        filters,
        priceRange,
        setSearchTerm,
        setFilter,
        setPriceRange,
        clearFilters
    } = useMentorExploreStore();

    const [mentors, setMentors] = useState<Mentor[]>(initialData.data.mentors);
    const [totalMentors, setTotalMentors] = useState(initialData.data.total);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 20;

    const fetchMentors = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await mentorService.searchMentors({
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
            setError(error instanceof Error ? error.message : '멘토 목록을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, filters, priceRange, page]);

    const debouncedFetch = useMemo(() => debounce(fetchMentors, 300), [fetchMentors])

    useEffect(() => {
        setPage(1);
        debouncedFetch();

        return () => debouncedFetch.cancel();
    }, [searchTerm, filters, priceRange, debouncedFetch]);

    useEffect(() => {
        if (page > 1) fetchMentors();
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