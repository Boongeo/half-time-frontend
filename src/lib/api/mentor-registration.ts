import {ApiResponse, MentorRegistrationResponse, RegistrationListResponse} from "@/types/api";
import {MentorRegistration, RegistrationStatus} from "@/types/core/mentor";

export const mentorRegistrationApi = {
    // 멘토 등록
    register: async (formData: FormData): Promise<ApiResponse<{ id: number }>> => {
        const response = await fetch('/api/mentor-registration', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) throw new Error("Failed to register");
        return response.json();
    },

    // 등록 상태 확인
    checkStatus: async (): Promise<ApiResponse<MentorRegistrationResponse>> => {
        const response = await fetch('/api/mentor-registration/status', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) throw new Error("Failed to check mentor registration");
        return response.json();
    },

    // 관리자: 멘토 등록 신청 목록 조회
    getRegistrations: async (params?: {
        status?: RegistrationStatus;
        page?: number;
        limit?: number;
    }): Promise<ApiResponse<RegistrationListResponse>> => {
        const searchParams = new URLSearchParams();
        if (params?.status) searchParams.append('status', params.status);
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());

        const response = await fetch(`/api/mentor-registration?${searchParams}`, {
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

    // 관리자: 멘토 등록 승인
    approve: async (registrationId: number): Promise<ApiResponse<void>> => {
        const response = await fetch(`/api/mentor-registration/${registrationId}/approve`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error("Failed to approve");
        return response.json();
    },

    // 관리자: 멘토 등록 거절
    reject: async (registrationId: number, reason: string): Promise<ApiResponse<void>> => {
        const response = await fetch(`/api/mentor-registration/${registrationId}/reject`, {
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

    // 관리자: 등록 신청 상세 정보 조회
    getDetails: async (registrationId: number): Promise<ApiResponse<MentorRegistration>> => {
        const response = await fetch(`/api/admin/mentor-registrations/${registrationId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            next: {
                revalidate: 300 // 5분 캐시
            }
        });
        if (!response.ok) throw new Error('상세 정보 조회에 실패했습니다');
        return response.json();
    }
}