import {MentorSearchParams} from "@/types/shared/params";
import {ApiResponse, SearchResponse} from "@/types/api";
import {Mentor} from "@/types/core/mentor";

export const mentorApi = {
    // 멘토 검색 API
    searchMentors: async (params: MentorSearchParams = {}): Promise<ApiResponse<SearchResponse>> => {
        const searchParams = new URLSearchParams();

        const appendParam = (
            key: string,
            value: string | number | string[] | undefined | null
        ) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(v => searchParams.append(key, v));
                } else {
                    searchParams.append(key, value.toString());
                }
            }
        };

        appendParam('search', params.search);
        appendParam('techStack', params.techStack);
        appendParam('experience', params.experience);
        appendParam('rating', params.rating);
        appendParam('priceMin', params.priceMin);
        appendParam('priceMax', params.priceMax);
        appendParam('page', params.page ?? 1);
        appendParam('limit', params.limit ?? 20);

        const response = await fetch(`/api/mentors/search?${searchParams.toString()}`, {
            method: 'GET'
        });

        if (!response.ok) throw new Error('Failed to fetch mentors');
        return response.json();
    },

    // 멘토 상세 정보 조회 API
    getMentor: async (mentorId: number): Promise<ApiResponse<Mentor>> => {
        const response = await fetch(`/api/mentors/${mentorId}`, {
            method: 'GET',
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) throw new Error('Failed to get mentor details');
        return response.json();
    }
}