import {ApiResponse, MentorRegistrationResponse, RegistrationListResponse} from "@/types/api";
import {MentorRegistration, RegistrationStatus} from "@/types/core/mentor";
import {getBaseUrl} from "@/lib/utils/api";

const baseUrl = getBaseUrl();

export const mentorRegistrationApi = {
    register: async (formData: FormData): Promise<ApiResponse<{ id: number }>> => {
        const url = new URL('/api/mentor-registration', baseUrl);
        const response = await fetch(url.toString(), {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) throw new Error("Failed to register");
        return response.json();
    },

    checkStatus: async (): Promise<ApiResponse<MentorRegistrationResponse>> => {
        const url = new URL('/api/mentor-registration/status', baseUrl);
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) throw new Error("Failed to check mentor registration");
        return response.json();
    },

    getRegistrations: async (params?: {
        status?: RegistrationStatus;
        page?: number;
        limit?: number;
    }): Promise<ApiResponse<RegistrationListResponse>> => {
        const url = new URL('/api/mentor-registration', baseUrl);
        if (params?.status) url.searchParams.append('status', params.status);
        if (params?.page) url.searchParams.append('page', params.page.toString());
        if (params?.limit) url.searchParams.append('limit', params.limit.toString());

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            next: {
                tags: ['mentor-registrations']
            }
        });
        if (!response.ok) throw new Error("Failed to get mentor list");
        return response.json();
    },

    approve: async (registrationId: number): Promise<ApiResponse<void>> => {
        const url = new URL(`/api/mentor-registration/${registrationId}/approve`, baseUrl);
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error("Failed to approve");
        return response.json();
    },

    reject: async (registrationId: number, reason: string): Promise<ApiResponse<void>> => {
        const url = new URL(`/api/mentor-registration/${registrationId}/reject`, baseUrl);
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reason })
        });
        if (!response.ok) throw new Error('거절 처리에 실패했습니다');
        return response.json();
    },

    getDetails: async (registrationId: number): Promise<ApiResponse<MentorRegistration>> => {
        const url = new URL(`/api/admin/mentor-registrations/${registrationId}`, baseUrl);
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            next: {
                revalidate: 300
            }
        });
        if (!response.ok) throw new Error('상세 정보 조회에 실패했습니다');
        return response.json();
    }
}