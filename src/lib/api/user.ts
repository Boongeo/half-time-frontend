import {ApiResponse} from "@/types/api";
import {useAuthStore} from "@/store/auth";
import {User} from "@/types/core/user";
import {getBaseUrl} from "@/lib/utils/api";

const baseUrl = getBaseUrl();

export const userApi = {
    register: async (formData: FormData) => {
        const url = new URL("/api/user/register", baseUrl);
        const response = await fetch(url.toString(), {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to submit profile.");
        return response.json();
    },

    getMe: async (): Promise<ApiResponse<User>> => {
        const url = new URL('/api/user/me', baseUrl);
        const { accessToken } = useAuthStore.getState();
        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        return response.json();
    },

    updateProfile: async (formData: FormData): Promise<ApiResponse<User>> => {
        const url = new URL('/api/user/me', baseUrl);
        const { accessToken } = useAuthStore.getState();
        const response = await fetch(url.toString(), {
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