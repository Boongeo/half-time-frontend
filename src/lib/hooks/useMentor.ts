import {useMentorExploreStore} from "@/store/explore";
import {useCallback, useEffect, useMemo, useState} from "react";
import {InitialMentorData, Mentor} from "@/types/core/mentor";
import {MentorService} from "@/lib/services/mentorService";
import {debounce} from "lodash";

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

    const fetchMentors = useCallback(async (pageNum: number) => {
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
                page: pageNum,
                limit
            });

            if (response.success) {
                if (pageNum === 1) {
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
    }, [searchTerm, filters, priceRange]);

    const debouncedFetch = useMemo(
        () => debounce((pageNum: number) => fetchMentors(pageNum), 300),
        [fetchMentors]
    );

    useEffect(() => {
        setPage(1);
        debouncedFetch(1);

        return () => debouncedFetch.cancel();
    }, [searchTerm, filters, priceRange, debouncedFetch]);

    const loadMore = useCallback(() => {
        if (!isLoading && mentors.length < totalMentors) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMentors(nextPage);
        }
    }, [isLoading, mentors.length, totalMentors, page, fetchMentors])

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