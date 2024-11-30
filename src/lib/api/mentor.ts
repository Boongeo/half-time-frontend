import {SearchParams} from "@/types/params";
import {ApiResponse, SearchResponse} from "@/types/api";
import {Mentor} from "@/types/mentor";

export const mentorApi = {
    getInitialMentors: async (): Promise<ApiResponse<SearchResponse>> => {
        const response = await fetch('/api/mentors', {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) throw new Error('Failed to fetch mentors');
        return response.json();
    },

    searchMentors: async (params: SearchParams): Promise<ApiResponse<SearchResponse>> => {
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

        const response = await fetch(`/api/mentors/search?${searchParams.toString()}`);
        if (!response.ok) throw new Error('Failed to search mentors');
        return response.json();
    },

    getMentor: async (mentorId: number): Promise<ApiResponse<Mentor>> => {
        const response = await fetch(`/api/mentors/${mentorId}`, {
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) throw new Error('Failed to get mentor details');
        return response.json();
    }
}