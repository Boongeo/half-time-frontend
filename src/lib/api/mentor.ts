import {MentorSearchParams} from "@/types/shared/params";
import {ApiResponse, SearchResponse} from "@/types/api";
import {Mentor} from "@/types/core/mentor";

export const mentorApi = {
    // 초기 멘토 목록 조회 (SSR)
    getInitialMentors: async (): Promise<ApiResponse<SearchResponse>> => {
        const response = await fetch('/api/mentors', {
            method: 'GET',
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) throw new Error('Failed to fetch mentors');
        return response.json();
    },

    // 멘토 검색 API
    searchMentors: async (params: MentorSearchParams): Promise<ApiResponse<SearchResponse>> => {
        const searchParams = new URLSearchParams();

        if (params.search) {
            searchParams.append('search', params.search);
        }

        if (params.techStack?.length) {
            params.techStack.forEach(tech => {
                searchParams.append('techStack', tech);
            });
        }

        if (params.experience?.length) {
            params.experience.forEach(experience => {
                searchParams.append('experience', experience);
            });
        }

        if (params.rating?.length) {
            params.rating.forEach(rating => {
                searchParams.append('rating', rating);
            });
        }

        if (params.priceMin !== undefined) {
            searchParams.append('priceMin', params.priceMin.toString());
        }
        if (params.priceMax !== undefined) {
            searchParams.append('priceMax', params.priceMax.toString());
        }

        if (params.page !== undefined) {
            searchParams.append('page', params.page.toString());
        }
        if (params.limit !== undefined) {
            searchParams.append('limit', params.limit.toString());
        }

        const response = await fetch(`/api/mentors/search?${searchParams.toString()}`, {
            method: 'GET'
        });
        if (!response.ok) throw new Error('Failed to search mentors');
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