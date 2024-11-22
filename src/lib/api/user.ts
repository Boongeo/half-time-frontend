import {ApiResponse, User} from "@/types/auth";
import {useAuthStore} from "@/store/auth";

export const userApi = {
    // 사용자 정보 등록
    register: async (formData: FormData) => {
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
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
    updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
        const { accessToken } = useAuthStore.getState();
        const response = await fetch('/api/user/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
    },

    // 프로필 이미지 업로드
    uploadProfileImage: async (formData: FormData): Promise<ApiResponse<{imageUrl: string}>> => {
        const { accessToken } = useAuthStore.getState();
        const response = await fetch('/api/user/me/image', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        });

        if (!response.ok) throw new Error('Failed to upload image');
        return response.json();
    }
}