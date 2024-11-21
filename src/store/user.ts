import {UserState} from "@/types/auth";
import {create} from "zustand";
import {userApi} from "@/lib/api/user";

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    fetchUser: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await userApi.getMe();

            if (response.success) {
                set({ user: response.data, isLoading: false });
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    updateProfile: async (data) => {
        try {
            set({ isLoading: true, error: null });
            const response = await userApi.updateProfile(data);

            if (response.success) {
                set({
                    user: response.data,
                    isLoading: false
                });
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    uploadProfileImage: async (file) => {
        try {
            set({ isLoading: true, error: null });
            const formData = new FormData();
            formData.append('image', file);

            const response = await userApi.uploadProfileImage(formData);

            if (response.success) {
                set(state => ({
                    user: state.user ? {
                        ...state.user,
                        profileImage: response.data.imageUrl
                    } : null,
                    isLoading: false
                }));
            }
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    setUser: (user) => set({ user }),
    reset: () => set({ user: null, error: null, isLoading: false })
}));