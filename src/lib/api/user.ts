import {ApiResponse} from "@/types/auth";
import {useAuthStore} from "@/store/auth";
import {User} from "@/types/user";

export const userApi = {
    // 사용자 정보 등록
    register: async (formData: FormData) => {
        const response = await fetch("/api/user/register", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to submit profile.");
        return response.json();
    },

    // 현재 사용자 정보 조회
    getMe: async (): Promise<ApiResponse<User>> => {
        const { accessToken } = useAuthStore.getState();
        const response = await fetch('/api/user/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        return response.json();
    },

    // 사용자 프로필 업데이트
    updateProfile: async (formData: FormData): Promise<ApiResponse<User>> => {
        const { accessToken } = useAuthStore.getState();
        const response = await fetch('/api/user/me', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
    },
}